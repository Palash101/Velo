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

       {/* <Stack.Screen
        name={'Profile'}
        component={Profile}
        options={{
          headerShown: false,
        }}
      />

        <Stack.Screen
        name={'Support'}
        component={Support}
        options={{
          headerShown: false,
        }}
      />

        <Stack.Screen
        name={'Terms'}
        component={Terms}
        options={{
          headerShown: false,
        }}
      /> */}


      {/* <Stack.Screen
        name={'BottomTab'}
        component={BottomTab}
        options={{
          headerShown: false,
          cardStyle: {backgroundColor: '#ffffff'},
        }}
      /> */}

      
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
