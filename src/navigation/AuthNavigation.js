import {createStackNavigator} from '@react-navigation/stack';

import Login from '../screens/Auth/Login';

const AuthNavigationStack = ({navigation}) => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
     
      <Stack.Screen
        name={'Login'}
        component={Login}
        options={{
          headerShown: true,
        }}
      />
     
    </Stack.Navigator>
  );
};

export default AuthNavigationStack;
