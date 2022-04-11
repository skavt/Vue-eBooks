import BaseModel from "../../../core/components/input-widget/BaseModel";
import i18n from "../../../i18n";

export default class LoginModel extends BaseModel {
	email = null
	password = null

	rules = {
		email: [
			{rule: 'required'},
			{rule: 'email'},
		],
		password: 'required',
	}

	attributeLabels = {
		email: i18n.t('Email'),
		password: i18n.t('Password'),
	}

	constructor(data = {}) {
		super()
		Object.assign(this, {...data})
	}
}
