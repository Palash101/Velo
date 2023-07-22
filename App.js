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
import UserProvider, {UserConsumer} from './context/UserContext';
import { ErrorBoundary } from './src/ErrorBoundary';

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
      {/* <ErrorBoundary> */}
        <ToastProvider
          offset={50}
          animationType="zoom-in"
          placement="bottom"
          icon={
            <Image
              source={assets.vlogo}
              style={{width: 24, height: 24, tintColor: '#fff'}}
            />
          }
          normalColor={'#000'}
          textStyle={{paddingRight: 40}}>
          <UserProvider>
            <UserConsumer>
              {({auth}) => {
                console.log(auth, 'authhh');
                return (
                  <NavigationContainer>
                    {auth === true && <ScreenNavigationStack />}
                    {!auth && <AuthNavigationStack />}
                  </NavigationContainer>
                );
              }}
            </UserConsumer>
          </UserProvider>
        </ToastProvider>
      {/* </ErrorBoundary> */}
    </>
  );
};

export default App;
