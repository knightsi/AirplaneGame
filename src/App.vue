<template>
  <div id="app">
    <Game />
  </div>
</template>

<script>
import Game from './Game/airplane.vue';

export default {
  name: 'App',
  components: {
    Game
  }
};
</script>

<style>
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>