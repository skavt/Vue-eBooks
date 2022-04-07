import moment from 'moment';

class Formatter {
	static formatNumber(number, decimals, dec_point, thousands_sep) {
		// https://stackoverflow.com/questions/3753483/javascript-thousand-separator-string-format/19840881
		var n = !isFinite(+number) ? 0 : +number,
			prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
			sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
			dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
			toFixedFix = function (n, prec) {
				// Fix for IE parseFloat(0.55).toFixed(0) = 0;
				var k = Math.pow(10, prec);
				return Math.round(n * k) / k;
			},
			s = (prec ? toFixedFix(n, prec) : Math.round(n)).toString().split('.');
		if (s[0].length > 3) {
			s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
		}
		if ((s[1] || '').length < prec) {
			s[1] = s[1] || '';
			s[1] += new Array(prec - s[1].length + 1).join('0');
		}
		return s.join(dec);
	}

	static getParsedNumber(value) {
		value = parseFloat(value);

		let decimal_separator = '.',
			thousand_separator = ',';

		return this.formatNumber(
			value,
			value % 1 === 0 ? 0 : 2,
			decimal_separator,
			thousand_separator
		);
	}

	static asPercentage(value) {
		return this.getParsedNumber(value) + '%';
	}

	static removeUnderscores(value) {
		if (!value) return '';
		return value.replace(/_/g, ' ');
	}

	static removeDashes(value) {
		if (!value) return '';
		return value.replace(/-/g, ' ');
	}

	static toDate(value, format) {
		if (format) {
			return moment(value).format(format);
		} else {
			return moment(value).format('DD-MM-YYYY hh:mm');
		}
	}

	static toDateTime(value, format) {
		if (format) {
			return moment(value).format(format);
		} else {
			return moment(value).format('DD-MM-YYYY hh:mm');
		}
	}

	static getNowAsDate() {
		return moment().format(SYSTEM_DATE_FORMAT);
	}

	static getNowAsTime(resetSeconds = true) {
		if (resetSeconds) {
			return moment().seconds(0).format(SYSTEM_TIME_FORMAT);
		}
		return moment().format(SYSTEM_TIME_FORMAT);
	}

	static toUpperCaseFirst(value) {
		return value ? value.charAt(0).toUpperCase() + value.slice(1) : '';
	}
}

export {
	Formatter
};
export const SYSTEM_DATE_FORMAT = 'YYYY-MM-DD';
export const SYSTEM_TIME_FORMAT = 'HH:mm:ss';
