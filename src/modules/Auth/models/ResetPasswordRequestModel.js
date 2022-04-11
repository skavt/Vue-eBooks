import BaseModel from "../../../core/components/input-widget/BaseModel";
import i18n from "../../../i18n";

export default class ResetPasswordRequestModel extends BaseModel {
	email = null

	rules = {
		email: [
			{rule: 'required'},
			{rule: 'email', message: i18n.t('This must be valid email')},
		],
	}

	attributeLabels = {
		email: i18n.t('Email'),
	}

	constructor(data = {}) {
		super()
		Object.assign(this, {...data})
	}
}
