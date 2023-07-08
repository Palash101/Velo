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
import BottomTab from './BottomTab';
import {Image, TouchableOpacity, Text, View} from 'react-native';
import {assets} from '../config/AssetsConfig';
import {useNavigation} from '@react-navigation/native';
import {UserContext} from '../../context/UserContext';
import Profile from '../screens/Profile';
import Achievements from '../screens/Achievements';
import Support from '../screens/Support';
import Terms from '../screens/Terms';
import StackNavigation from './StackNavigation';
import { GreyBox } from '../components/GreBox';
import DoubleJoy from '../screens/DoubleJoy';
import Store from '../screens/Store';
import ProfileEdit from '../screens/Profile/ProfileEdit';
import ChangePassword from '../screens/Profile/ChangePassword';
import MyWallet from '../screens/Profile/MyWallet';
import DoubleJoyDetail from '../screens/DoubleJoy/detail';
import DoubleJoyCheckout from '../screens/Checkout/DoubleJouCheckout';
import ClassDetail from '../screens/ClassDetail';

const Drawer = createDrawerNavigator();



function CustomDrawerContent(props) {
  const userCtx = React.useContext(UserContext);

  const logout = () => {
    userCtx.signOut();
    props.navigation.navigate('Login');
  };

  return (
    <DrawerContentScrollView style={{position: 'relative'}} {...props}>
      <DrawerItemList {...props} />
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
        active={true}
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
  return (
    <Image
      source={assets.bell}
      style={{width: 24, height: 24, marginRight: 15}}
    />
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
function EditIcon() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('ProfileEdit')}>
      <Image
        source={assets.edit}
        style={{width: 24, height: 24, marginRight: 15}}
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
        name="Profile"
        component={Profile}
        options={{
          headerLeft: () => <BackIcon />,
          headerTitle: props => <LogoTitle {...props} />,
          headerRight: () => <EditIcon />,
        }}
      />
      <Drawer.Screen
        name="ProfileEdit"
        component={ProfileEdit}
        options={{
          headerLeft: () => <BackIcon />,
          headerTitle: props => <></>,
          headerRight: () => <></>,
        }}
      />

      <Drawer.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          headerLeft: () => <BackIcon />,
          headerTitle: props => <></>,
          headerRight: () => <></>,
        }}
      />

      <Drawer.Screen
        name="MyWallet"
        component={MyWallet}
        options={{
          headerLeft: () => <BackIcon />,
          headerTitle: props => <LogoTitle {...props} />,
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
        name="ClassDetail"
        component={ClassDetail}
        options={{
          headerShown: false
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
        name="DoubleJoy"
        component={DoubleJoy}
        options={{
          headerLeft: () => <BackIcon />,
          headerTitle: props => <LogoTitle {...props} />,
        }}
      />
      <Drawer.Screen
        name="DoubleJoyDetail"
        component={DoubleJoyDetail}
        options={{
          headerShown: false
        }}
      />
      <Drawer.Screen
        name="DoubleJoyCheckout"
        component={DoubleJoyCheckout}
        options={{
          headerShown: false
        }}
      />

       <Drawer.Screen
        name="Store"
        component={Store}
        options={{
          headerLeft: () => <BackIcon />,
          headerTitle: props => <LogoTitle {...props} />,
        }}
      />
  
    </Drawer.Navigator>
  );
}
