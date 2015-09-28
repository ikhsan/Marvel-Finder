'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,geny
} = React;

var SearchPage = require('./SearchPage');
var SearchResults = require('./SearchResults');

var RouteMapper = function(route, navigator) {
  if (route.name === 'search') {
    return <SearchPage
      onBack={navigator.pop}
      navigator={navigator} />;
  } else if (route.name === 'list') {
    return <SearchResults
      onBack={navigator.pop}
      characters={route.characters}
      navigator={navigator} />;
  }
};

var marvel = React.createClass({
  render: function() {
    return <Navigator
      style={styles.container}
      initialRoute={{
        title: 'Marvel Finder',
        name: 'search'
      }}
      configureScene={ () => Navigator.SceneConfigs.FadeAndroid }
      renderScene={ RouteMapper }
      />;
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

AppRegistry.registerComponent('marvel', () => marvel);
