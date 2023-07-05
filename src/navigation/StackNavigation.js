import React from 'react';
import Profile from '../screens/Profile';
import Support from '../screens/Support';
const {createStackNavigator} = require('@react-navigation/stack');

const StackNavigation = ({navigation}) => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'Profile'}
        component={Profile}
        options={{
          headerShown: false,
          cardStyle: {backgroundColor: '#ffffff'},
        }}
      />
      <Stack.Screen
        name={'Support'}
        component={Support}
        options={{
          headerShown: false,
          cardStyle: {backgroundColor: '#ffffff'},
        }}
      />
    </Stack.Navigator>
  );
};
export default StackNavigation;
