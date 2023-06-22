import {createStackNavigator} from '@react-navigation/stack';

import Login from '../screens/Auth/Login';
import SignUp from '../screens/Auth/Signup';

const AuthNavigationStack = ({navigation}) => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
     
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
     
    </Stack.Navigator>
  );
};

export default AuthNavigationStack;
