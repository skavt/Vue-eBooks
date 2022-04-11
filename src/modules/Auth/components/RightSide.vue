<template>
  <div v-if="!isSmallScreen" class="auth-right clearfix">
    <b-img class="auth-img" src="/assets/auth_logo.jpg"/>
  </div>
</template>

<script>
  export default {
    name: "RightSide",
    data() {
      return {
        windowWidth: window.innerWidth,
      }
    },
    computed: {
      isSmallScreen() {
        return this.windowWidth < 768;
      },
    },
    mounted() {
      window.addEventListener('resize', () => {
        this.windowWidth = window.innerWidth;
      })
    }
  }
</script>

<style lang="scss" scoped>

  .auth-img {
    width: 280px;
    border-top-left-radius: 10% 50%;
    border-bottom-left-radius: 10% 50%;
  }

</style>