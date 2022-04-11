import Vue from 'vue'
import VueI18n from 'vue-i18n';
import i18nMessages from './i18n.messages';

Vue.use(VueI18n);
Vue.config.productionTip = false;

let keys = Object.keys(i18nMessages);
let messages = {};

keys.forEach((key) => {
	messages[key] = {...i18nMessages[key]}
});

const i18n = new VueI18n({
	locale: process.env.CURRENT_LANGUAGE,
	messages: messages
});

export default i18n;
