import React, {Component} from 'react';

import {Button, StyleSheet, Text, View} from 'react-native';

var googleMapsClient = require('react-native-google-maps-services').createClient({
  key: 'API KEY'
});

export default class Eta extends Component {
  state = {
    someText: 'abc',
    currentPosition: null
  }

  showDuration = (err, response) => {
    if(!err) {
      this.setState({someText: response.json.routes[0].legs[0].duration.text});
    }
  }

  componentDidMount() {
    this.getGeoLocation();
  }

  getDirections = () => {
    currentLocation = this.getGeoLocation();
    console.log(currentLocation);
    googleMapsClient.directions({
      origin: {
        lat: this.state.currentPosition.coords.latitude,
        lng: this.state.currentPosition.coords.longitude
      },
      destination: '1111 6th ave, des moines, ia 50314',
      mode: 'driving'
    }, this.showDuration);
  }
  render() {
    const location = this.state.currentPosition ?
      `${this.state.currentPosition.coords.latitude}, ${this.state.currentPosition.coords.longitude}` :
      'Unknown';

    return <View style={styles.eta}>
      <Text>{location}</Text>
      <Text>{this.state.someText}</Text>
      <Button onPress={this.getDirections} title="Get ETA"/>
    </View>
  }

  getGeoLocation = () => {
    const onSuccess = (pos) => this.setState({currentPosition: pos});
    const onError = () => this.setState({someText: 'Shit went wrong'});
    return navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }
}

const styles = StyleSheet.create({
  eta: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
