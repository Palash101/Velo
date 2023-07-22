import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  Dimensions,
  Image,
  Platform,
  BackHandler,
} from 'react-native';
import {assets} from '../../config/AssetsConfig';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {DarkButton, ThemeButton} from '../../components/Buttons';
import {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const Welcome = () => {
  const navigation = useNavigation();

  useEffect(() => {
    AsyncStorage.getItem('token', (err, result) => {
      if (result) {
        navigation.navigate('Drawer');
      }
    });
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
  }, []);

  const handleBackButton = () => {
    switch (navigation.current.state) {
      case 'Welcome':
        BackHandler.exitApp();
        break;
      default:
        navigation.goBack();
    }
    return true;
  };

  return (
    <>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#333" />

        <View style={styles.centerTextBox}>
          <Image source={assets.logoWhite} style={styles.logo} />
          <Text style={styles.centerText}>EMBRACE EVERY MOVEMENT</Text>
        </View>

        <ThemeButton
          label={'LOGIN'}
          style={styles.loginBtn}
          onPress={() => navigation.navigate('Login')}
          loading={false}
        />
        <ThemeButton
          label={'SIGN UP'}
          style={styles.SignUpBtn}
          onPress={() => navigation.navigate('Signup')}
          loading={false}
        />
        <TouchableOpacity
          style={styles.skip}
          onPress={() => navigation.navigate('Home')}>
          <Text style={styles.skipText}>Skip Now </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  logo: {
    width: 130,
    height: 53,
    alignSelf: 'center',
  },
  loginBtn: {
    width: '80%',
    position: 'absolute',
    zIndex: 3,
    bottom: Platform.OS === 'ios' ? 140 : 140,
    alignSelf: 'center',
  },
  SignUpBtn: {
    width: '80%',
    position: 'absolute',
    zIndex: 3,
    bottom: Platform.OS === 'ios' ? 60 : 60,
    alignSelf: 'center',
  },
  centerTextBox: {
    position: 'absolute',
    zIndex: 3,
    top: '40%',
    left: 0,
    right: 0,
  },
  centerText: {
    color: '#ffffff',
    fontFamily: 'Gotham-Medium',
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 26,
    marginTop: 20,
    maxWidth: 300,
    alignSelf: 'center',
  },
  skip: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: height - 50,
  },
  skipText: {
    color: '#fff',
    textAlign: 'center',
  },
});
