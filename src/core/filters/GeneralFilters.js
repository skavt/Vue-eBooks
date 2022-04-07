import Vue from 'vue';
import moment from 'moment';
import striptags from "striptags";
import {Formatter} from "../services/formatterService";

Vue.filter('toDate', function (value, format) {
	if (!value) return '';
	return Formatter.toDate(value, format)
});

Vue.filter('toDateTime', function (value, format) {
	if (!value) return '';
	return Formatter.toDateTime(value, format)
});

Vue.filter('relativeDate', function (value) {
	if (!value) return '';
	return moment(value).fromNow()
});

Vue.filter('toUnderScoreCase', function (value) {
	if (!value) return '';
	return value.replace(/\s/g, '_');
});

Vue.filter('toLowerCase', function (value) {
	if (!value) return '';
	return value.toLowerCase();
});

Vue.filter('removeUnderscores', function (value) {
	return Formatter.removeUnderscores(value)
});

Vue.filter('asPercentage', function (value, format) {
	return Formatter.asPercentage(value)
});

Vue.filter('toDashedCase', function (value) {
	if (!value) return '';
	return value.replace(/\s/g, '-');
});

Vue.filter('toUpperCaseFirst', function (value) {
	return Formatter.toUpperCaseFirst(value);
});

Vue.filter('toUpperCaseFirstSentence', function (value) {
	if (!value) return ''
	return value.split(/ /g).map(word => `${word.substring(0, 1).toUpperCase()}${word.substring(1)}`).join(" ");
});

Vue.filter('truncate', function (value, length) {
	if (!value) return '';
	if (!length || value.length < length) {
		return value;
	}
	return `${value.substr(0, length)}...`;
});

Vue.filter('randomString', function (value, length = 32) {
	let text = "";
	let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (var i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
});

Vue.filter('striptags', function (value) {
	if (!value) {
		return value;
	}

	const obj = {
		"&nbsp;": " ",
		"&amp;": "&",
		"&quot;": "\"",
		"&lt;": "<",
		"&gt;": ">"
	};
	//striptags() returns empty string if the argument type is number, so value needs to be converted toString
	value = striptags(value.toString());

	Object.keys(obj).forEach((key) => {
		value = value.replace(new RegExp(key, 'g'), obj[key]);
	});

	return value;
});