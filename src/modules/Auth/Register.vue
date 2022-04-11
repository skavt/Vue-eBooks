<template>
  <div class="row">
    <div class="col-md-6">
      <div class="auth-left">
        <h4>{{ $t('Create new account') }}</h4>
        <br>
        <view-spinner :show="loading"/>
        <auth-form
            :model="model" :loading="loading" form-type="register" :show-repeat-password="true"
            @on-register-click="onRegisterClick">
        </auth-form>
      </div>
    </div>
    <right-side class="col-md-6 col-center"/>
  </div>
</template>

<script>
  import {createNamespacedHelpers} from "vuex";
  import RightSide from "./components/RightSide";
  import ViewSpinner from "../../core/components/view-spinner/view-spinner";
  import RegisterModel from "./models/RegisterModel";
  import AuthForm from "./components/AuthForm";

  const {mapActions} = createNamespacedHelpers('auth')
  export default {
    name: "Register",
    components: {AuthForm, ViewSpinner, RightSide},
    data() {
      return {
        model: new RegisterModel(),
        loading: false,
      }
    },
    methods: {
      ...mapActions(['register']),
      async onRegisterClick() {
        this.loading = true;
        this.model.resetErrors();
        const {success, body} = await this.register({...this.model.toJSON()});
        this.loading = false;
        if (success) {
          this.$toast(body.message, 'success');
          await this.$router.push({name: 'dashboard'});
        } else if (body.message) {
          this.$toast(body.message, 'danger');
        } else {
          this.model.setMultipleErrors(body);
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .col-right {
    position: relative;
  }
</style>