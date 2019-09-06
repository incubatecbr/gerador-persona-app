import React from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Image, StyleSheet } from 'react-native';

import Start from './pages/Start';
//import Form from './pages/Form';
import logo from './assets/img/logo.png';

const styles = StyleSheet.create({
  imgLogo: {
    marginHorizontal: 110,
  }
});

const AppNavigator = createStackNavigator({
  Start: Start,
  //Form: Form
},

  {
    defaultNavigationOptions: {
      headerStyle: { backgroundColor: '#3176B8' },
      headerTintColor: '#FFFFFF',
      headerTitle: <Image style={styles.imgLogo} source={logo} />,
      headerBackTitle: null,
    },
    mode: 'modal'
});

export default createAppContainer(AppNavigator);