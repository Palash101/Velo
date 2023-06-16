/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {DrawerActions, NavigationContainer} from '@react-navigation/native';
import ScreenNavigationStack from './src/navigation/ScreenNavigation';
import messaging from '@react-native-firebase/messaging';
import {ToastProvider} from 'react-native-toast-notifications';
import {Alert, Image} from 'react-native';
import {assets} from './src/config/AssetsConfig';
import DrawerNavigation from './src/navigation/DrawerNavigation';
import AuthNavigationStack from './src/navigation/AuthNavigation';

const App = () => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log(remoteMessage, 'remoteMessage');
      Alert.alert(
        remoteMessage.notification.title,
        remoteMessage.notification.body,
      );
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    registerAppWithFCM();
  }, []);

  const registerAppWithFCM = async () => {
    await messaging().registerDeviceForRemoteMessages();
  };

  return (
    <>
      <ToastProvider
        offset={50}
        animationType="zoom-in"
        placement="bottom"
        icon={<Image source={assets.logo} style={{width: 32, height: 24}} />}
        normalColor={'#000'}
        textStyle={{paddingRight: 40}}>
        <NavigationContainer>
          <ScreenNavigationStack />
        </NavigationContainer>
      </ToastProvider>
    </>
  );
};

export default App;
