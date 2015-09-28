'use strict';

var React = require('react-native');
var {
  ToastAndroid
} = React;

function showCharacter(character) {
  ToastAndroid.show(
    "You clicked " + character.name + "!",
    ToastAndroid.SHORT
  );
}

module.exports = showCharacter;
