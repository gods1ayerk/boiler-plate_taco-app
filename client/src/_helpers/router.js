import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/components/Home';
import Login from '@/components/Login';
import { authGuard } from '@/_helpers';

Vue.use(Router);

const routes = [
  { path: '/', component: Home, beforeEnter: authGuard },
  { path: '/login', component: Login},

  // Redirect all other paths to home
  { path: '*', redirect: '/' }
];

export const router = new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes
});