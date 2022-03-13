import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class Chat extends React.Component {

  render() {
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });

    const {backgroundColor} = this.props.route.params;

    return (
      <View style={{
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: backgroundColor}}>
      </View>
    );
  };
}