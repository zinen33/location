'use strict';

const chalk = require('chalk');
function randomColor() {
    var color = "";
    for (var i = 0; i < 3; i++) {
        var sub = Math.floor(Math.random() * 256).toString(16);
        color += (sub.length == 1 ? "0" + sub : sub);
    }
   return "#" + color;
};
/* eslint-disable linebreak-style */
var isHexcolor = require('is-hexcolor');
var getText = function(/** @type {string[]} */ ...Data) {
	var Main = (Data.splice(0,1)).toString();
		for (let i = 0; i < Data.length; i++) Main = Main.replace(RegExp(`%${i + 1}`, 'g'), Data[i]);
	return Main;
};
/**
 * @param {any} obj
 */
function getType(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1);
}

module.exports = {
	Normal: function(/** @type {string} */ Str, /** @type {() => any} */ Data ,/** @type {() => void} */ Callback) {
		if (isHexcolor(global.Fca.Require.FastConfig.MainColor) != true) {
			this.Warning(getText(global.Fca.Require.Language.Index.InvaildMainColor,global.Fca.Require.FastConfig.MainColor),process.exit(0));
		}
			else
console.log(chalk.bold.hex(randomColor()).bold(`${globalThis.Fca.Require.FastConfig.MainName || '〈 FCA 〉'}➜ ` + Str));
		if (getType(Data) == 'Function' || getType(Data) == 'AsyncFunction') {
			return Data()
		}
		if (Data) {
			return Data;
		}
		if (getType(Callback) == 'Function' || getType(Callback) == 'AsyncFunction') {
			Callback();
		}
		else return Callback;
	},
	Warning: function(/** @type {unknown} */ str, /** @type {() => void} */ callback) {
		console.log(chalk.bold.hex(randomColor()).bold('〈 FCA-WARNING 〉➜ ' + str));
		if (getType(callback) == 'Function' || getType(callback) == 'AsyncFunction') {
			callback();
		}
		else return callback;
	},
	Error: function(/** @type {unknown} */ str, /** @type {() => void} */ callback) {
		if (!str) {
			console.log(chalk.bold.hex(randomColor()).bold('〈 FCA-ERROR 〉➜ ' + "Đã xảy ra lỗi, vui lòng liên hệ: facebook.com/RqzaX.VqnThuqn.040"));
		}
		console.log(chalk.magenta.bold('〈 FCA-ERROR 〉➜ ') + chalk.red(str));
		if (getType(callback) == 'Function' || getType(callback) == 'AsyncFunction') {
			callback();
		}
		else return callback;
	},
	Success: function(/** @type {unknown} */ str, /** @type {() => void} */ callback) {
		console.log(chalk.hex('#9900FF').bold(`${global.Fca.Require.FastConfig.MainName || '〈 FCA 〉'}➜ `) + chalk.green(str));
		if (getType(callback) == 'Function' || getType(callback) == 'AsyncFunction') {
			callback();
		}
		else return callback;
	},
	Info: function(/** @type {unknown} */ str, /** @type {() => void} */ callback) {
		console.log(chalk.hex('#9900FF').bold(`${global.Fca.Require.FastConfig.MainName || '〈 FCA 〉'}➜ `) + chalk.blue(str));
		if (getType(callback) == 'Function' || getType(callback) == 'AsyncFunction') {
			callback();
		}
		else return callback;
	}
};