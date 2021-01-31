import { BehaviorSubject } from 'rxjs';
import axios from 'axios';

import { router } from '@/_helpers';

const baseUrl = `${process.env.VUE_APP_API_URL}`;
const userSubject = new BehaviorSubject(null);

export const authService = {
  login,
  apiAuthenticate,
  logout,
  user: userSubject.asObservable(),
  get userValue() { return userSubject.value; }
}

async function login() {
  // Login with facebook then authenticate with the API to get a JWT auth token
  const { authResponse } = await new Promise(FB.login);
  if (!authResponse) return;

  await apiAuthenticate(authResponse.accessToken);

  // Get return url from query parameters or default to home page
  const returnUrl = router.history.current.query['returnUrl'] || '/';
  router.push(returnUrl);
}

async function apiAuthenticate(accessToken) {
  // Authenticate with api using a facebook access token,
  // on success the api returns user object with a JWT auth token
  const response = await axios.post(`${baseUrl}/facebookLogin`, { accessToken });
  const user = response.data;
  userSubject.next(user);
  startAuthenticateTimer();
  return user;
}

function logout() {
  // Remove app permissions to logout completely because FB.logout() doesn't remove FB cookie
  FB.api('/me/permission', 'delete', null, () => FB.logout());
  stopAuthenticateTimer();
  userSubject.next(null);
  router.push('/login');
}


// Helper Methods

let authenticateTimeout;

function startAuthenticateTimer() {
  // Parse json object from base64 encoded jwt token
  const jwtToken = JSON.parse(atob(userSubject.value.token.split('.')[1]));

  // Set a timeout to re-authenticate with the api one minute before the token expires
  const expires = new Date(jwtToken.exp * 1000);
  const timeout = expires.getTime() - Date.now() - (60 * 1000);
  const { accessToken } = FB.getAuthResponse();
  authenticateTimeout = setTimeout(() => apiAuthenticate(accessToken), timeout);
}

function stopAuthenticateTimer() {
  // Cancel time for re-authenticating with the api
  clearTimeout(authenticateTimeout);
}