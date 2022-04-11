import Vue from 'vue';
import i18n from "../../i18n";

const ConfirmModal = {
	install(Vue) {
		Vue.prototype.$confirm = function (message, title = i18n.t('Please Confirm')) {
			return new Promise((resolve, reject) => {
				this.$bvModal.msgBoxConfirm(message, {
					title: title,
					okVariant: 'danger',
					okTitle: i18n.t('Yes'),
					cancelTitle: i18n.t('Cancel'),
					footerClass: 'p-2',
					hideHeaderClose: false,
				})
					.then(value => {
						resolve(value)
					})
					.catch(err => {
						reject(err);
					})
			})
		}
	}
};

Vue.use(ConfirmModal);
