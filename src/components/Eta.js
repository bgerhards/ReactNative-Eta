import React, {Component} from 'react';

import {Button, StyleSheet, Text, View} from 'react-native';

import GoogleMapsService from '../utilities/GoogleMapsApi';

export default class Eta extends Component {

  state = {
    someText: 'abc'
  }

  render() {
    return <View style={styles.eta}>
      <Text>{this.state.someText}</Text>
      <Button onPress={this.getGeoLocation} title="Get Geo Location"/>
    </View>
  }

  getGeoLocation = () => {
    //const onSuccess = (po) => this.getDirections(position);
    const onError = () => this.setState({someText: 'Shit went wrong'});
    return navigator.geolocation.getCurrentPosition(this.getDirections, onError);
  }

  getDirections = (position) => {
    GoogleMapsService.getDirections('', '',this.outputResult)

  }

  outputResult = (theResult) => {
    this.setState({someText: JSON.stringify(theResult)});
  }
}


const styles = StyleSheet.create({
  eta: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
