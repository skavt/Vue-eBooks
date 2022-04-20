<template>
  <ValidationObserver v-if="!loading" v-slot="{ handleSubmit }">
    <b-form @keydown.enter.prevent="handleSubmit(onSubmit)">
      <input-widget :model="model" attribute="email" :autofocus="true" :disabled="disabledEmail" :label="false"/>
      <input-widget
          v-if="isRegister" :model="model" :placeholder="$t('First Name')" attribute="first_name" :label="false">
      </input-widget>
      <input-widget
          v-if="isRegister" :model="model" :placeholder="$t('Last Name')" attribute="last_name" :label="false">
      </input-widget>
      <input-widget v-if="showPassword" :model="model" attribute="password" type="password" :label="false"/>
      <input-widget
          v-if="showRepeatPassword" :model="model" :placeholder="$t('Repeat Password')" attribute="repeat_password"
          type="password" :label="false">
      </input-widget>
      <div class="d-flex align-items-center justify-content-between">
        <b-button class="mr-2 float-left" variant="outline-light" @click="handleSubmit(onSubmit)">
          {{ getButtonName }}
        </b-button>
        <div>
          <router-link v-if="isLogin" :to="{name: 'register'}" class="auth-link float-right">
            {{ $t('Sign Up') }}
          </router-link>
          <router-link v-else :to="{name: getLinkPath}" class="auth-link">
            <i class="fas fa-angle-double-left"/>
            {{ $t('Back to login') }}
          </router-link>
        </div>
      </div>
      <router-link v-if="isLogin" :to="{name: getLinkPath}" class="auth-link text-info float-left mt-2">
        {{ $t('Forgot your password?') }}
      </router-link>
    </b-form>
  </ValidationObserver>
</template>

<script>
  import InputWidget from "../../../core/components/input-widget/InputWidget";
  import i18n from "../../../i18n";

  export default {
    name: "AuthForm",
    components: {InputWidget},
    props: {
      model: Object,
      loading: Boolean,
      formType: String,
      showPassword: {
        type: Boolean,
        default: true,
      },
      showRepeatPassword: {
        type: Boolean,
        default: false,
      },
      disabledEmail: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      getButtonName() {
        return this.isLogin ? i18n.t('Login') : this.isRegister ? i18n.t('Register') : i18n.t('Submit');
      },
      getLinkPath() {
        return this.isLogin ? 'reset-password-request' : 'login';
      },
      isLogin() {
        return this.formType === 'login';
      },
      isRequestPass() {
        return this.formType === 'requestPass';
      },
      isResetPass() {
        return this.formType === 'resetPass';
      },
      isRegister() {
        return this.formType === 'register';
      },
    },
    methods: {
      onSubmit() {
        if (this.isLogin) {
          this.$emit('on-login-click');
        } else if (this.isRequestPass) {
          this.$emit('on-request-pass-click');
        } else if (this.isResetPass) {
          this.$emit('on-reset-pass-click');
        } else if (this.isRegister) {
          this.$emit('on-register-click');
        }
      },
    },
  }
</script>

<style scoped>

</style>