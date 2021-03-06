'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.description = exports.api = exports.cmd = undefined;

var _logger = require('../utils/logger');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _strings = require('../../strings');

var _strings2 = _interopRequireDefault(_strings);

var _package = require('../../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _toArray(arr) {
  return Array.isArray(arr) ? arr : Array.from(arr);
}

var description = {
  short: _strings2.default.get('Displays this menu'),
  usage: 'help {command}'
};

var api = {
  help: function help() {
    _logger.log.info('');
    _logger.log.table(getCommands());
    _logger.log.info('');
    _logger.log.info(
      `${_strings2.default.get(
        'Need Help?'
      )} -> https://www.github.com/syrjs/cli`
    );
    _logger.log.info('');
  },
  commandDetail: function commandDetail(commandName) {
    // const commandPath = path.join(__dirname, commandName);
    // const { description } = require(commandPath);
    _logger.log.warn('Not implimented');
  }
};

function cmd(parameters, switches) {
  var _parameters = _toArray(parameters),
    commandName = _parameters[0],
    rest = _parameters.slice(1);

  if (commandName) {
    api.commandDetail(commandName);
  } else {
    api.help();
  }
}

exports.cmd = cmd;
exports.api = api;
exports.description = description;

function getCommands() {
  // get commands from the commands directory
  // then get the description and usage from the js file
  var commands = _fs2.default.readdirSync(__dirname).map(function(name) {
    return { name: name, path: _path2.default.join(__dirname, name) };
  });
  var returnCommands = [];
  commands.forEach(function(commandPath) {
    if (commandPath.path != _path2.default.join(__dirname, 'index.js')) {
      var _require = require(commandPath.path),
        _description = _require.description;

      if (_description && _description.usage) {
        returnCommands.push({
          Command: _description.usage,
          Description: _description.short
        });
      }
    }
  });
  return returnCommands;
}
