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
import {ThemeBorderButton, ThemeButton} from '../../components/Buttons';
import {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const height = Dimensions.get('window').height;

const Welcome = () => {
  const navigation = useNavigation();

  useEffect(() => {
    AsyncStorage.getItem('token', (err, result) => {
      if (result) {
        navigation.navigate('BottomTab');
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
          <Text style={styles.centerText}>Welcome To</Text>
          <Image source={assets.logoWhite} style={styles.logo} />
        </View>

        <ThemeButton
          label={'LOGIN'}
          style={styles.loginBtn}
          onPress={() => navigation.navigate('Login')}
          loading={false}
        />
        <ThemeBorderButton
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
    marginTop: 20,
  },
  loginBtn: {
    width: 220,
    position: 'absolute',
    zIndex: 3,
    bottom: Platform.OS === 'ios' ? 120 : 120,
    alignSelf: 'center',
  },
  SignUpBtn: {
    width: 220,
    position: 'absolute',
    zIndex: 3,
    bottom: Platform.OS === 'ios' ? 50 : 50,
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
    fontSize: 22,
    textAlign: 'center',
    lineHeight: 26,
  },
  skip: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: height - 40,
  },
  skipText: {
    color: '#fff',
    textAlign: 'center',
  },
});
