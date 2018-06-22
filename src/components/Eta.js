import React, {Component} from 'react';

import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {Icon, Picker} from 'native-base';
import moment from 'moment';

var googleMapsClient = require('react-native-google-maps-services').createClient({
  key: 'API KEY'
});

export default class Eta extends Component {
  state = {
    estimatedArrivalTime: '',
    estimatedTravelTime: '',
    currentPosition: null,
    destination: '1111 6th ave, des moines, ia 50314'
  }

  showDuration = (err, response) => {
    if (!err) {
      var seconds = response.json.routes[0].legs[0].duration.value;
      var arrivalTime = moment().add(seconds, 's');
      this.setState({estimatedArrivalTime: arrivalTime.format("h:mm a")});
      this.setState({estimatedTravelTime: response.json.routes[0].legs[0].duration.text})
    }
  };

  componentDidMount() {
    this.getGeoLocation();
  };

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
  };

  resetTimes = (itemValue) => {
    this.setState({destination: itemValue, estimatedArrivalTime: '', estimatedTravelTime: ''})
  };

  render() {
    return <View style={styles.eta}>
      <Text style={styles.header}>Get ETA</Text>
      <View style={styles.hr}/>

      <Picker
        mode='dropdown'
        iosIcon={<Icon name="arrow-dropdown-circle"
                       style={{color: "#007aff", fontSize: 25}}/>}
        iosHeader='Choose destination'
        selectedValue={this.state.destination}
        style={{height: 50, width: undefined}}
        onValueChange={this.resetTimes}>
        <Picker.Item label='Mercy' value='1111 6th ave, des moines, ia 50314'/>
        <Picker.Item label='Methodist' value='1200 Pleasant St, Des Moines, IA 50309'/>
        <Picker.Item label='Broadlawn' value='1801 Hickman Rd, Des Moines, IA 50314'/>
        <Picker.Item label='Lutheran' value='700 E University Ave, Des Moines, IA 50316'/>
      </Picker>
      <TouchableHighlight disabled={this.state.currentPosition === null} style={styles.getEtaButton}
                          onPress={this.getDirections}>
        <Text>GET ETA FROM THE FORGE</Text>
      </TouchableHighlight>
      <Text style={{margin: 10}}>{`You will arrive at ${this.state.estimatedArrivalTime}`}</Text>
      <Text style={{margin: 10}}>{`Travel Time ${this.state.estimatedTravelTime}`}</Text>
    </View>
  }

  getGeoLocation = () => {
    const onSuccess = (pos) => this.setState({currentPosition: pos});
    const onError = (err) => this.setState({estimatedArrivalTime: err.message});
    return navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }
}

const yellowishColor = '#ffb500';

const styles = StyleSheet.create({
  eta: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  getEtaButton: {
    backgroundColor: yellowishColor,
    padding: 20,
    borderColor: '#e6a300',
    borderWidth: 1,
    borderStyle: 'solid'
  },
  getEtaButtonText: {
    fontFamily: 'Futura Book,Futura,Arial,sans-serif',
  },
  header: {
    fontSize: 32,
    padding: 20,
    fontWeight: 'bold'
  },
  hr: {
    borderBottomWidth: 1,
    borderBottomColor: yellowishColor,
    width: '75%',
    marginBottom: 100
  }

});
