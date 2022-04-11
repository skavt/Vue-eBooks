import BaseModel from "../../../core/components/input-widget/BaseModel";
import i18n from "../../../i18n";

export default class ResetPasswordFormModel extends BaseModel {
	password = null
	repeat_password = null
	token = ''
	email = ''

	rules = {
		password: [
			{rule: 'required'},
			{rule: 'min', length: 6}
		],
		repeat_password: [
			{rule: 'required'},
			{rule: 'confirmed', target: 'password'},
		],
	}

	attributeLabels = {
		password: i18n.t('Password'),
		repeat_password: i18n.t('Repeat Password'),
	}

	constructor(data = {}) {
		super()
		Object.assign(this, {...data})
	}
}
