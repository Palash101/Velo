import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../screens/Home';
import Classes from '../screens/Classes';
import Planner from '../screens/Planner';
import Buy from '../screens/Buy';
import Journey from '../screens/Journey';

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Classes" component={Classes} />
      <Drawer.Screen name="Planner" component={Planner} />
      <Drawer.Screen name="Buy" component={Buy} />
      <Drawer.Screen name="Journey" component={Journey} />
    </Drawer.Navigator>
  );
}
