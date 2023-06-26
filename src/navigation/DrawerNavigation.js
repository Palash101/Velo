import * as React from 'react';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import Home from '../screens/Home';
import Classes from '../screens/Classes';
import Planner from '../screens/Planner';
import Buy from '../screens/Buy';
import Journey from '../screens/Journey';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Close drawer"
        onPress={() => props.navigation.closeDrawer()}
      />
      <DrawerItem
        label="Toggle drawer"
        onPress={() => props.navigation.toggleDrawer()}
      />
    </DrawerContentScrollView>
  );
}

export default function DrawerNavigation() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Classes" component={Classes} />
      <Drawer.Screen name="Planner" component={Planner} />
      <Drawer.Screen name="Buy" component={Buy} />
      <Drawer.Screen name="Journey" component={Journey} />
    </Drawer.Navigator>
  );
}
