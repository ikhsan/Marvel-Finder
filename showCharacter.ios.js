'use strict';

var React = require('react-native');
var {
  AlertIOS,
  NativeModules
} = React;
var M = NativeModules.Messenger;

function showCharacter(character) {
  var name = character.name;
  var message = "You clicked " + character.name + "!!!";

  // alertCharacter(name, message);
  notifyCharacter(name, message);
}

function alertCharacter(name, message) {
  AlertIOS.alert(name, message,
    [
      { text: 'Awesome', onPress: () => console.log("pressed awesome") }
    ]
  );
}

function notifyCharacter(name, message) {
  // MESSAGE, WARNING, ERROR, SUCCESS
  M.showTitle(name, message, M.MESSAGE);
}

module.exports = showCharacter;
