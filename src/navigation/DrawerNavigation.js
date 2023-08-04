import * as React from 'react';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import BottomTab from './BottomTab';
import {Image, TouchableOpacity, Text, View} from 'react-native';
import {assets} from '../config/AssetsConfig';
import {useNavigation} from '@react-navigation/native';
import {UserContext} from '../../context/UserContext';
import Achievements from '../screens/Achievements';
import Support from '../screens/Support';
import Terms from '../screens/Terms';
import {GreyBox} from '../components/GreBox';
import Store from '../screens/Store';
import ProfileNavigation from './ProfileNavigation';
import DoubleJoyStack from './DoubleJoyStack';
import StoreStack from './StoreStack';
import Notification from '../screens/Notification';
import ClassesStack from './ClassesStack';
import ClassDetail from '../screens/ClassDetail';
import Pay from '../screens/Buy/pay';
import Buy from '../screens/Buy';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const userCtx = React.useContext(UserContext);

  const logout = () => {
    userCtx.signOut();
  };

  return (
    <DrawerContentScrollView style={{position: 'relative'}} {...props}>
      {/* <DrawerItemList {...props} /> */}
      {/* <DrawerItem
        label="Close drawer"
        onPress={() => props.navigation.closeDrawer()}
      />
      <DrawerItem
        label="Toggle drawer"
        onPress={() => props.navigation.toggleDrawer()}
      /> */}

      <GreyBox
        label="Profile"
        {...props}
        active={false}
        onPress={() => props.navigation.navigate('Profile')}
      />
      <GreyBox
        label="Support"
        {...props}
        onPress={() => props.navigation.navigate('Support')}
      />
      <GreyBox
        label="Terms & Conditions"
        onPress={() => props.navigation.navigate('Terms')}
      />
      <GreyBox label="Logout" onPress={logout} />

      {/* <View style={{
         position:'absolute',
         bottom:0,
         left:0,
         right:0,
         alignItems:'center',
         backgroundColor:'#ddd',

      }}>
        <Image source={assets.logo} style={{
          width: 150,
          height: 60,

          }} />
      </View> */}
    </DrawerContentScrollView>
  );
}

function LogoTitle() {
  return <Image source={assets.logo} style={{width: 60, height: 24}} />;
}

function NotificationIcon() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
    
    <Image
      source={assets.bell}
      style={{width: 24, height: 24, marginRight: 15}}
    />
    </TouchableOpacity>
  );
}

function HambergerIcon() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
      <Image
        source={assets.hamburger}
        style={{width: 24, height: 24, marginLeft: 15}}
      />
    </TouchableOpacity>
  );
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

export default function DrawerNavigation() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerLeft: () => <HambergerIcon />,
        headerRight: () => <NotificationIcon />,
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="Home"
        component={BottomTab}
        options={{
          headerTitle: props => <LogoTitle {...props} />,
        }}
      />

      <Drawer.Screen
        name="DoubleJoy"
        component={DoubleJoyStack}
        options={{
          headerShown: false,
        }}
      />
       <Drawer.Screen
        name="ClassDetail"
        component={ClassDetail}
        options={{
          cardStyle: {backgroundColor: '#ffffff'},
          headerLeft: () => <BackIcon />,
          headerTitle: props => <LogoTitle {...props} />,
        }}
      />
      <Drawer.Screen
        name="Store"
        component={StoreStack}
        options={{
          headerShown: false,
        }}
      />

      <Drawer.Screen
        name="Profile"
        component={ProfileNavigation}
        options={{
          headerShown: false,
        }}
      />

      <Drawer.Screen
        name="Support"
        component={Support}
        options={{
          headerLeft: () => <BackIcon />,
          headerTitle: props => <LogoTitle {...props} />,
        }}
      />
      <Drawer.Screen
        name="Terms"
        component={Terms}
        options={{
          headerLeft: () => <BackIcon />,
          headerTitle: props => <LogoTitle {...props} />,
        }}
      />

      <Drawer.Screen
        name="Achievement"
        component={Achievements}
        options={{
          headerLeft: () => <BackIcon />,
          headerTitle: props => <LogoTitle {...props} />,
        }}
      />
      <Drawer.Screen
        name="Notification"
        component={Notification}
        options={{
          headerLeft: () => <BackIcon />,
          headerTitle: props => <LogoTitle {...props} />,
        }}
      />


      <Drawer.Screen
        name="Pay"
        component={Pay}
        options={{
          headerShown:false,
          // headerLeft: () => <BackIcon />,
          // headerTitle: props => <LogoTitle {...props} />,
        }}
      />
      <Drawer.Screen
        name="Buy"
        component={Buy}
      />
    </Drawer.Navigator>
  );
}
