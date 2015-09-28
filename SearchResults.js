'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  ListView,
  Text,
  Component
} = React;

var showCharacter = require('./showCharacter');

var styles = StyleSheet.create({
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10
  },
  textContainer: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  name: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#EC1D23'
  },
  charid: {
    fontSize: 20,
    color: '#656565'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  }
});

var SearchResults = React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 });
    return {
      dataSource: ds.cloneWithRows(this.props.characters)
    };
  },
  rowPressed: function(charId) {
    var character = this.props.characters.filter(char => char.id === charId)[0];
    showCharacter(character);
  },
  renderRow: function(rowData, sectionID, rowID) {
    var title = rowData.name;
    var image_url = rowData.thumbnail.path + "." + rowData.thumbnail.extension;
    var charID = rowData.id;

    return (
      <TouchableHighlight
        onPress={() => this.rowPressed(charID)}
        underlayColor='#dddddd'>
        <View>
          <View style={styles.rowContainer}>
            <Image style={styles.thumb} source={{ uri: image_url }} />
            <View style={styles.textContainer}>
              <Text style={styles.name}>{title}</Text>
              <Text style={styles.charid} numberOfLines={1}>{charID}</Text>
            </View>
          </View>
          <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    );
  },
  render: function() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow} />
    );
  },

});

module.exports = SearchResults;
