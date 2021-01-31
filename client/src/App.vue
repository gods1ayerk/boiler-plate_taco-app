<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#">Taco App</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="/">Home</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item @click="login" v-if="!user">Login</b-nav-item>
          <b-nav-item-dropdown right v-if="user">
            <template #button-content>
              <em>{{user.name}}</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item @click="logout">Log Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <b-container class="pt-4">
      <router-view></router-view>
    </b-container>
  </div>
</template>

<script>
import { authService } from '@/_services';

export default {
  name: 'TacoApp',
  data() {
    return {
      user: null
    }
  },
  created() {
    authService.user.subscribe(x => this.user = x);
  },
  methods: {
    login: authService.login,
    logout: authService.logout
  }
}
</script>
