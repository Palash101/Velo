import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Splash from '../screens/Auth/Splash';
import Welcome from '../screens/Auth/Welcome';
import Login from '../screens/Auth/Login';
import SignUp from '../screens/Auth/Signup';
import Forgot from '../screens/Auth/ForgotPassword';
import { Image } from 'react-native';
import { assets } from '../config/AssetsConfig';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

function LogoTitle() {
  return <Image source={assets.logo} style={{width: 60, height: 24}} />;
}

function BackIcon() {
   const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
      <Image
        source={assets.back}
        style={{width: 24, height: 24, marginLeft: 15}}
      />
    </TouchableOpacity>
  );
}

const AuthNavigationStack = ({navigation}) => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'Splash'}
        component={Splash}
        options={{
          headerShown: false,
        }}
      />
    <Stack.Screen
        name={'Welcome'}
        component={Welcome}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'Login'}
        component={Login}
        options={{
          headerLeft: () => <></>,
          headerRight: () => <></>,
          headerTitle: props => <LogoTitle {...props} />,
        }}
      />
       <Stack.Screen
        name={'Signup'}
        component={SignUp}
        options={{
          headerLeft: () => <></>,
          headerRight: () => <></>,
          headerTitle: props => <LogoTitle {...props} />,
        }}
      />
      <Stack.Screen
        name={'Forgot'}
        component={Forgot}
        options={{
          headerLeft: () => <></>,
          headerRight: () => <></>,
          headerTitle: props => <LogoTitle {...props} />,
        }}
      />

    </Stack.Navigator>
  );
};

export default AuthNavigationStack;
