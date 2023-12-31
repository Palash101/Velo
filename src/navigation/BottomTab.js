import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import {Image, Platform, Text, View} from 'react-native';
import {bottomMenu} from '../data/bottomMenu';
import Ripple from 'react-native-material-ripple';
import Classes from '../screens/Classes';
import Planner from '../screens/Planner';
import Buy from '../screens/Buy';
import Journey from '../screens/Journey';
import { NavigationDrawerStructure } from './NavigationDrawerStructure';

const Tab = createBottomTabNavigator();

const BottomTab = ({navigation}) => {
  return (
    <View flex>
      <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
        <Tab.Screen
          name={bottomMenu[0].name}
          component={Home}
          options={{
            tabBarLabel: bottomMenu[0].label,
            headerShown: false,
            // headerLeft: () => (
            //   <NavigationDrawerStructure navigationProps={navigation} />
            // ),
          }}
        />
        <Tab.Screen
          name={bottomMenu[1].name}
          component={Classes}
          options={{
            tabBarLabel: bottomMenu[1].label,
          }}
        />
        <Tab.Screen
          name={bottomMenu[2].name}
          component={Planner}
          options={{
            tabBarLabel: bottomMenu[2].label,
          }}
        />
        <Tab.Screen
          name={bottomMenu[3].name}
          component={Buy}
          options={{
            tabBarLabel: bottomMenu[3].label,
          }}
        />
        <Tab.Screen
          name={bottomMenu[4].name}
          component={Journey}
          options={{
            tabBarLabel: bottomMenu[4].label,
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

function MyTabBar({state, navigation}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#fff',
      }}>
      {bottomMenu.map((route, index) => {
        let {label, inActive, active, name} = route;
        const isFocused = state.index === index;

        const onPress = () => {
          if (!isFocused && !!name) {
            navigation.navigate(name);
          }
        };

        return (
          <Ripple
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            onPress={onPress}
            style={{
              flex: 1,
              paddingTop: 10,
              paddingBottom: Platform.OS === 'ios' ? 20 : 10,
              justifyContent: 'center',
              alignItems: 'center',
              borderTopWidth: 1,
              borderColor: '#ddd',
            }}>
            <Image
              source={isFocused ? active : inActive}
              style={{
                tintColor: isFocused ? '#000' : '#888',
                width: 20,
                height: 20,
              }}
            />
            {!!label && (
              <Text style={{color: isFocused ? '#000' : '#888', fontSize: 12}}>
                {label}
              </Text>
            )}
          </Ripple>
        );
      })}
    </View>
  );
}

export default BottomTab;
