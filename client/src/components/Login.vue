<template>
  <div>
    <b-jumbotron align="center">
      <template #header>TACO App</template>

      <template #lead>Welcome to TACO application built using the MEVN stack</template>

      <div>
        <b-btn variant="primary" @click="login">Login with Facebook</b-btn>
      </div>
    </b-jumbotron>

    <b-card-group deck>
      <b-card title="Express Backend">
        <b-card-text>
          A rock solid Node.js/Express server using Mongoose to organize models and query the database.
        </b-card-text>
      </b-card>

      <b-card title="Vue-CLI">
        <b-card-text>
          Vue-CLI to generate components, services and more. Local dev server and easy compilation.
        </b-card-text>
      </b-card>

      <b-card title="Mongoose JS">
        <b-card-text>
          Mongoose JS to provide a straight-forward, schema-based solution to model your application data.
        </b-card-text>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
import { authService } from '@/_services';

export default {
  name: 'Login',
  methods: {
    login: authService.login
  }
}
</script>