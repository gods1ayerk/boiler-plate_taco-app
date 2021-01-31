import axios from 'axios';
import { authService } from '@/_services';

export function jwtInterceptor() {
  axios.interceptors.request.use(request => {
    // Add auth header with jwt if user is logged in and request is to the api url
    const user = authService.userValue;
    const isLoggedIn = user?.token;
    const isApiUrl = request.url.startsWith(process.env.VUE_APP_API_URL);

    if(isLoggedIn && isApiUrl) {
      request.headers.common.Authorization = `Bearer ${user.token}`;
    }

    return request;
  });
}