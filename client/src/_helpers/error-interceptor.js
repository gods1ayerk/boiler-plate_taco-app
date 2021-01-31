import axios from 'axios';

import { authService } from '@/_services';

export function errorInterceptor() {
  axios.interceptors.response.use(null, (error) => {
    const { response } = error;
    if(!response) {
      // Network error
      console.error(error);
      return;
    }

    if([401, 403].includes(response.status) && authService.userValue) {
      // Auto logout if 401 or 403 response returned from api
      authService.logout();
    }

    const errorMessage = response.data?.message || response.statusText;
    console.error('ERROR:', errorMessage);
  });
}