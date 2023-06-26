import {createStackNavigator} from '@react-navigation/stack';

import Splash from '../screens/Auth/Splash';
import Welcome from '../screens/Auth/Welcome';
import Login from '../screens/Auth/Login';
import SignUp from '../screens/Auth/Signup';
import Forgot from '../screens/Auth/ForgotPassword';


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
          headerShown: false,
        }}
      />
       <Stack.Screen
        name={'Signup'}
        component={SignUp}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'Forgot'}
        component={Forgot}
        options={{
          headerShown: false,
        }}
      />

    </Stack.Navigator>
  );
};

export default AuthNavigationStack;
