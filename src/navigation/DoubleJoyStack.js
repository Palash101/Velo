import {Image, TouchableOpacity} from 'react-native';
import ClassDetail from '../screens/ClassDetail';
import Classes from '../screens/Classes';
import {assets} from '../config/AssetsConfig';
import {useNavigation} from '@react-navigation/native';
import DoubleJoy from '../screens/DoubleJoy';
import DoubleJoyDetail from '../screens/DoubleJoy/detail';
import DoubleJoyCheckout from '../screens/Checkout/DoubleJouCheckout';
import Home from '../screens/Home';

const {createStackNavigator} = require('@react-navigation/stack');

const DoubleJoyStack = ({navigation}) => {
  const Stack = createStackNavigator();

  function BackIcon() {
    const navigation = useNavigation();
    return (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          source={assets.back}
          style={{width: 24, height: 24, marginLeft: 15}}
        />
      </TouchableOpacity>
    );
  }

  function LogoTitle() {
    return <Image source={assets.logo} style={{width: 60, height: 24}} />;
  }

  return (
    <Stack.Navigator>
    
      <Stack.Screen
        name="DoubleJoy"
        component={DoubleJoy}
        options={{
          headerLeft: () => <BackIcon />,
          headerTitle: props => <LogoTitle {...props} />,
        }}
      />
      <Stack.Screen
        name="DoubleJoyDetail"
        component={DoubleJoyDetail}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DoubleJoyCheckout"
        component={DoubleJoyCheckout}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
export default DoubleJoyStack;
