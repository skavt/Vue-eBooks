import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthLayout from "../core/components/layout/AuthLayout";
import Login from "../modules/Auth/Login";
import ResetPasswordRequest from "../modules/Auth/ResetPassword/ResetPasswordRequest";
import ResetPasswordForm from "../modules/Auth/ResetPassword/ResetPasswordForm";
import Register from "../modules/Auth/Register";
import authService from "../core/services/authService";
import DefaultLayout from "../core/components/layout/DefaultLayout";
import {store} from "../store";

Vue.use(VueRouter)

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/auth',
			name: 'auth',
			redirect: '/login',
			component: AuthLayout,
			meta: {guest: true},
			children: [
				{
					path: 'login',
					name: 'login',
					component: Login,
				},
				{
					path: 'reset-password-request',
					name: 'reset-password-request',
					component: ResetPasswordRequest,
				},
				{
					path: 'reset-password/:token',
					name: 'reset-password',
					component: ResetPasswordForm,
				},
				{
					path: 'register',
					name: 'register',
					component: Register,
				},
			]
		},
		{
			path: '/',
			name: 'dashboard',
			component: DefaultLayout,
			meta: {requiresAuth: true},
			children: []
		}
	]
})

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requiresAuth) && !store.state.hideAuth) {
		if (!authService.loggedIn()) {
			next({name: 'login'})
		} else {
			next()
		}
	} else if (to.matched.some(record => record.meta.guest) && authService.loggedIn()) {
		next({name: 'dashboard'})
	} else {
		next()
	}
});

export default router;