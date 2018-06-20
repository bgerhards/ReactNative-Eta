import React, {Component} from 'react';

import {Button, StyleSheet, Text, View} from 'react-native';

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
    const onSuccess = () => this.setState({someText: 'We found it!'});
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
