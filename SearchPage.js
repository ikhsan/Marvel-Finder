'use strict';

var React = require('react-native');
var md5 = require('md5');

var {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Image,
  Component,
  Platform
} = React;
var SearchResults = require('./SearchResults');

// styles
var styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#777777'
  },
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#EC1D23',
    borderColor: '#EC1D23',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#AAAAAA',
    color: '#777777'
  },
  image: {
    width: 217,
    height: 138,
    marginBottom: 30,
  },
});

function urlForFindingCharacter(name) {
  var publickey = "95e3a78573cfa28cea83aa2db7c82774";
  var privatekey = "eafffadcd13b1f03e4fcea8c94be983f336327ca";
  var m = new Date();
  var date =
    m.getUTCFullYear() +
    ("0" + (m.getUTCMonth()+1)).slice(-2) +
    ("0" + m.getUTCDate()).slice(-2) +
    ("0" + m.getUTCHours()).slice(-2) +
    ("0" + m.getUTCMinutes()).slice(-2) +
    ("0" + m.getUTCSeconds()).slice(-2);

  var hash = md5(date+privatekey+publickey);
  return "http://gateway.marvel.com:80/v1/public/characters?apikey=95e3a78573cfa28cea83aa2db7c82774" +
  "&nameStartsWith=" + name +
  "&ts=" + date +
  "&hash=" + hash;
}

var SearchPage = React.createClass({
  getInitialState: function() {
    return {
      searchString: '',
      isLoading: false,
      message: '',
    }
  },
  onSearchChanged: function(event) {
    this.setState({ searchString: event.nativeEvent.text });
  },
  onSearchPressed: function() {
    var searchString = this.state.searchString;
    if (searchString === '') {
      this.setState({ message : 'Name is empty' });
      return;
    }

    var query = urlForFindingCharacter(this.state.searchString);
    this._executeQuery(query);
  },
  _executeQuery: function(q) {
    this.setState({ isLoading: true });

    fetch(q)
      .then(response => response.json())
      .then(json => this._handleResponse(json))
      .catch(error =>
        this.setState({
          isLoading: false,
          message: 'Something bad >> ' + error
      }));

  },
  _handleResponse: function(response) {
    this.setState({ isLoading: false, message: '' });

    var characters = response.data.results;

    if (response.status === 'Ok' && characters.length > 0) {

      if (Platform.OS === 'ios') {
        this.props.navigator.push({
          title: 'Results',
          component: SearchResults,
          passProps: { characters: characters },
        });
      } else {
        this.props.navigator.push({
          title: 'Results',
          name: 'list',
          characters: characters
        });
      }

    } else {
      this.setState({ message: 'Character is not recognised'});
    }
  },

  spinner: function() {
    if (Platform.OS === 'ios') {
      return this.state.isLoading ?
        ( <ActivityIndicatorIOS hidden='true' size='large' /> ) :
        ( <View /> );
    } else {
      return this.state.isLoading ?
        ( <Text>Loading...</Text> ) :
        ( <View /> );
    }
  },

  //
  //

  render: function() {

    var spinner = this.spinner();
    return (
      <View style={styles.container}>

        <Text style={styles.description}>
          Search your favorite Marvel character!
        </Text>

        <Image source={require('image!marvel')} style={styles.image}/>

        <View style={styles.flowRight}>
          <TextInput
            style={styles.searchInput}
            value={this.state.searchString}
            onChange={this.onSearchChanged}
            placeholder='enter character name' />
          <TouchableHighlight
            style={styles.button}
            onPress={this.onSearchPressed} >
            <Text style={styles.buttonText}>Go!</Text>
          </TouchableHighlight>
        </View>

        {spinner}

        <Text style={styles.description}>{this.state.message}</Text>

      </View>
    );
  }
})

module.exports = SearchPage;
