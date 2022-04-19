<template>
  <div id="menu-content-wrapper">
    <navbar v-if="!hideNavBar"/>
    <div id="content" class="d-flex justify-content-between">
      <sidebar v-if="!hideSideBar"/>
      <router-view/>
    </div>
  </div>
</template>

<script>
  import Navbar from "../navbar/Navbar";
  import Sidebar from "../sidebar/Sidebar";
  import {mapState, mapActions} from 'vuex';

  export default {
    name: "DefaultLayout",
    components: {Sidebar, Navbar},
    computed: {
      ...mapState(['hideNavBar', 'hideSideBar']),
    },
    methods: {
      ...mapActions(['getCurrentUser']),
    },
    async mounted() {
      if (!this.hideNavBar) {
        await this.getCurrentUser();
      }
    }
  }
</script>

<style lang="scss">

  #app {
    height: 100%;
    display: flex;
    overflow: hidden;
    margin-top: 0;
  }

  #menu-content-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  #content {
    flex: 1;
    position: relative;
    overflow: hidden;
    display: flex;
  }
</style>