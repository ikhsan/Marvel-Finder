'use strict';

var React = require('react-native');
var {
  AlertIOS,
  NativeModules
} = React;
var M = NativeModules.Messenger;

function showCharacter(character) {

  // AlertIOS.alert(
  //   character.name,
  //   "You clicked " + character.name + "!!!",
  //   [
  //     { text: 'Awesome', onPress: () => console.log("pressed awesome") }
  //   ]
  // );

  M.showTitle(
    character.name,
    "You clicked " + character.name + "!!!",
    M.WARNING
  );
}

module.exports = showCharacter;
