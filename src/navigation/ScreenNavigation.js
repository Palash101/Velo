import {createStackNavigator} from '@react-navigation/stack';

import DrawerNavigation from './DrawerNavigation';
import Splash from '../screens/Auth/Splash';

const ScreenNavigationStack = ({navigation}) => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
       {/* <Stack.Screen
        name={'Splash'}
        component={Splash}
        options={{
          headerShown: false,
        }}
      /> */}
      <Stack.Screen
        name={'Drawer'}
        component={DrawerNavigation}
        options={{
          headerShown: false,
          cardStyle: {backgroundColor: '#ffffff'},
        }}
      />
    </Stack.Navigator>
  );
};

export default ScreenNavigationStack;
