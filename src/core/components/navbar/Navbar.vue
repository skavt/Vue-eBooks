<template>
  <b-navbar type="dark" variant="dark">
    <b-navbar-brand>{{ SITE_TITLE }}</b-navbar-brand>
    <b-navbar-nav v-if="currentUser" class="ml-auto">
      <b-nav-item-dropdown v-if="isSmallScreen" right no-caret>
        <template slot="button-content">
          <i class="fas fa-bars"/>
        </template>
        <b-dropdown-item href="#">
          <span class="d-flex align-items-center">
            <b-img :src="avatarUrl" class="img-fluid rounded-circle mr-2" width="25px" height="25px"/>
            {{ username }}
          </span>
        </b-dropdown-item>
        <hr/>
        <b-dropdown-item v-if="!hideAuth" @click="onLogoutClick" href="#">
          <div class="d-flex justify-content-between align-items-center">
            {{ $t('Logout') }}
            <i class="fas fa-sign-out-alt"/>
          </div>
        </b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item-dropdown v-else right no-caret>
        <template slot="button-content">
          <span class="d-flex align-items-center">
            <b-img :src="avatarUrl" class="img-fluid rounded-circle mr-2" width="25px" height="25px"/>
            {{ username }}
            <i class="fas fa-caret-down ml-2"/>
          </span>
        </template>
        <b-dropdown-item :active="this.$route.name === 'profile'" :to="toUserUrl">{{ $t('Profile') }}</b-dropdown-item>
        <b-dropdown-item v-if="!hideAuth" @click="onLogoutClick" href="#">
          <span class="d-flex justify-content-between align-items-center">
            {{ $t('Logout') }}
            <i class="fas fa-sign-out-alt"/>
          </span>
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
  import authService from "../../services/authService";
  import {mapState} from 'vuex';
  import {SITE_TITLE} from "../../siteInfoConstants";

  export default {
    name: "Navbar",
    props: {
      username: {
        type: String,
        default: ''
      },
      avatarUrl: {
        type: String,
        default: '/assets/avatar.svg'
      },
      toUserUrl: {
        type: String,
        default: 'dashboard'
      }
    },
    data() {
      return {
        windowWidth: window.innerWidth,
        SITE_TITLE: SITE_TITLE,
      }
    },
    computed: {
      ...mapState(['hideAuth', 'currentUser']),
      isSmallScreen() {
        return this.windowWidth <= 480
      },
    },
    methods: {
      onLogoutClick() {
        authService.logout()
      },
    },
    mounted() {
      window.addEventListener('resize', () => {
        this.windowWidth = window.innerWidth
      })
    },
  }
</script>

<style lang="scss" scoped>

  .navbar {
    padding: 15px;

    > .navbar-nav {
      > .nav-item {
        > .nav-link {
          color: white;
          font-size: 14px;
        }

        > .nav-link:hover {
          color: grey;
          font-size: 14px;
        }
      }
    }
  }

</style>