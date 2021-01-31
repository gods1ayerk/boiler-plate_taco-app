<template>
  <div>
    <b-jumbotron align="center">
      <template #header>TACO App</template>

      <template #lead>Welcome {{user.name}}</template>

      <div></div>
    </b-jumbotron>
  </div>
</template>

<script>
import { authService } from '@/_services';

export default {
  name: 'Home',
  data() {
    return {
      user: null
    }
  },
  created() {
    authService.user.subscribe(x => this.user = x);
  }
}
</script>