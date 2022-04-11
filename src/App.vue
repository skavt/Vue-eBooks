<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    // Uncomment if you need new translation meanings, go to the relevant page and refresh it.
    /*mounted() {
      const i18n = require("./i18n").default;

      const oldValues = i18n.messages.en;
      const newValues = i18n._path._cache;

      let values = {};
      for (let value in newValues) {
        if (!Object.keys(oldValues).includes(value)) {
          values = {...values, [value]: value};
        }
      }
      console.log(JSON.stringify(values))
    }*/
  }
</script>

<style>

  html, body {
    height: 100%;
    margin: 0;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
