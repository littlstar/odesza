/**
 * Flexible template engine powered by ES6 template strings.
 *
 * @author Wells Johnston <wells@littlstar.com>
 */

'use strict'

var fs = require('fs');
var vm = require('vm');

var odesza = {};
module.exports = odesza;

/**
 * Renders a template with the given variables.
 *
 * @param {string} template The template to render.
 * @param {object} vars An object of key-value pairs representing the
 * variables to be used in the template.
 * @return {string} The rendered template.
 */

odesza.render = function(template, vars) {
  try {
    return vm.runInNewContext('`' + template + '`', vars);
  } catch (e) {
    throw new Error(e);
  }
}

/**
 * @param {string} path The path to the template file.
 * @param {object} options Options passed in to render the template.
 * @return {string} The rendered template.
 */

odesza.compile = function(path, options) {
  try {
    var template = fs.readFileSync(path).toString();
  } catch (e) {
    throw new Error(e);
  }
  return this.render(template, options);
}

/**
 * Adds support for express.
 *
 * @param {string} path
 * @param {object} options
 * @param {function} fn
 */

odesza.__express = function(path, options, fn) {
  return fn(this.compile(path, options));
}
