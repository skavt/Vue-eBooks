import BaseModel from "../../../core/components/input-widget/BaseModel";
import i18n from "../../../i18n";

export default class RegisterModel extends BaseModel {
	email = null
	first_name = null
	last_name = null
	password = null
	repeat_password = null
	token = null

	rules = {
		first_name: 'required',
		last_name: 'required',
		email: [
			{rule: 'required'},
			{rule: 'email', message: i18n.t('This must be valid email')},
		],
		password: [
			{rule: 'required'},
			{rule: 'min', length: 6},
		],
		repeat_password: [
			{rule: 'required'},
			{rule: 'confirmed', target: 'password'},
		],
	}

	attributeLabels = {
		email: i18n.t('Email'),
		first_name: i18n.t('First Name'),
		last_name: i18n.t('Last Name'),
		password: i18n.t('Password'),
		repeat_password: i18n.t('Repeat Password'),
	}

	constructor(data = {}) {
		super()
		Object.assign(this, {...data})
	}
}
