import Vuex from "vuex";
import Vue from 'vue';
import auth from './modules/auth'
import authService from "../core/services/authService";
import httpService from "../core/services/httpService";

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		menuCollapsed: false,
		menuHidden: false,
		_menuItems: {},
		hideSideBar: true,
		hideNavBar: false,
		hideAuth: false,
		perPage: 50,
		currentUser: null,
	},
	getters: {
		menuItems: state => Object.values(state._menuItems).sort((a, b) => a.weight - b.weight),
	},
	actions: {
		addMenuItem({commit}, {name, menuItem}) {
			commit('addMenuItem', {name, menuItem});
		},
		removeMenuItem({commit}, path) {
			commit('removeMenuItem', path);
		},
		toggleMenuCollapse({commit, state}) {
			commit('toggleMenuCollapse', !state.menuCollapsed);
		},
		toggleMenuHide({commit, state}) {
			commit('toggleMenuHide', !state.menuHidden);
		},
		changePerPage({commit}, payload) {
			commit('changePerPage', payload)
		},
		async getCurrentUser({commit}) {
			const token = authService.getToken();
			const {success, body} = await httpService.get(`/get-current-user?${token}`);
			if (success) {
				commit('updateCurrentUser', body.data);
			} else {
				authService.logout();
			}
		}
	},
	mutations: {
		toggleMenuCollapse: (state, collapsed) => state.menuCollapsed = collapsed,
		toggleMenuHide: (state, hide) => state.menuHidden = hide,
		addMenuItem: (state, {name, menuItem}) => {
			state._menuItems = {
				...state._menuItems,
				[name]: menuItem
			}
		},
		removeMenuItem: (state, name) => {
			Vue.delete(state._menuItems, name);
		},
		changePerPage: (state, payload) => {
			state.perPage = payload;
		},
		updateCurrentUser: (state, payload) => {
			state.currentUser = {...payload};
		}
	},
	modules: {
		auth,
	}
});

export {
	store,
	Vuex,
}