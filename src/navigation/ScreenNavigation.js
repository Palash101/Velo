import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import BottomTab from './BottomTab';
import Classes from '../screens/Classes';
import Planner from '../screens/Planner';
import Buy from '../screens/Buy';
import Journey from '../screens/Journey';
import Splash from '../screens/Auth/Splash';
import DrawerNavigation from './DrawerNavigation';

const ScreenNavigationStack = ({navigation}) => {
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
        name={'Drawer'}
        component={DrawerNavigation}
        options={{
          headerShown: false,
          cardStyle: {backgroundColor: '#ffffff'},
        }}
      />
      <Stack.Screen
        name={'BottomTab'}
        component={BottomTab}
        options={{
          headerShown: false,
          cardStyle: {backgroundColor: '#ffffff'},
        }}
      />

      
      {/* <Stack.Screen
        name={'home'}
        component={Home}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name={'classes'}
        component={Classes}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name={'planner'}
        component={Planner}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name={'buy'}
        component={Buy}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name={'journey'}
        component={Journey}
        options={{
          headerShown: true,
        }}
      /> */}
    </Stack.Navigator>
  );
};

export default ScreenNavigationStack;
