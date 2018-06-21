import React, {Component} from 'react';

import {Button, StyleSheet, Text, View } from 'react-native';
import { Picker, Icon } from 'native-base';
import moment from 'moment';

var googleMapsClient = require('react-native-google-maps-services').createClient({
  key: 'API KEY'
});

export default class Eta extends Component {
  state = {
    someText: '',
    currentPosition: null,
    destination: '1111 6th ave, des moines, ia 50314'
  }

  showDuration = (err, response) => {
    if(!err) {
      var seconds = response.json.routes[0].legs[0].duration.value;
      var arrivalTime = moment().add(seconds, 's');
      this.setState({someText: arrivalTime.format("h:mm a")});
    }
  }

  componentDidMount() {
    this.getGeoLocation();
  }

  getDirections = () => {
    currentLocation = this.getGeoLocation();
    googleMapsClient.directions({
      origin: {
        lat: this.state.currentPosition.coords.latitude,
        lng: this.state.currentPosition.coords.longitude
      },
      destination: this.state.destination,
      mode: 'driving'
    }, this.showDuration);
  }
  render() {
    return <View style={styles.eta}>
      <Picker
        mode='dropdown'
        iosIcon={<Icon name="arrow-dropdown-circle"
                style={{ color: "#007aff", fontSize: 25 }} />}
        iosHeader='Choose destination'
        selectedValue={this.state.destination}
        style={{ height: 50, width: undefined }}
        onValueChange={(itemValue, itemIndex) => this.setState({destination: itemValue, someText: ''})}>
        <Picker.Item label='Mercy' value='1111 6th ave, des moines, ia 50314' />
        <Picker.Item label='Methodist' value='1200 Pleasant St, Des Moines, IA 50309' />
        <Picker.Item label='Broadlawn' value='1801 Hickman Rd, Des Moines, IA 50314' />
        <Picker.Item label='Lutheran' value='700 E University Ave, Des Moines, IA 50316' />
      </Picker>
      <Button disabled={this.state.currentPosition===null} onPress={this.getDirections} title="Get ETA from Forge"/>
      <Text style={{margin: 10}}>{this.state.someText}</Text>
    </View>
  }

  getGeoLocation = () => {
    const onSuccess = (pos) => this.setState({currentPosition: pos});
    const onError = (err) => this.setState({someText: err.message});
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
