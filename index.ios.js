'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Component,
  NavigatorIOS,
  StatusBarIOS
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

var SearchPage = require('./SearchPage');

var marvel = React.createClass({
  render: function() {
    StatusBarIOS.setStyle('light-content');

    return (
      <NavigatorIOS
        style={styles.container}
        barTintColor="#EC1D23"
        tintColor="#FFFFFF"
        titleTextColor="#FFFFFF"
        initialRoute={{
          title: 'Marvel Finder',
          component: SearchPage,
        }}
      />
    );
  }
});

AppRegistry.registerComponent('marvel', () => marvel);
