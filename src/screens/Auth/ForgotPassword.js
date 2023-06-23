import React, {Component, useState} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import {AuthContoller} from '../../controllers/AuthController';
import {useNavigation} from '@react-navigation/native';
import {PageContainer} from '../../components/Container';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PageLoader from '../../components/PageLoader';
import {assets} from '../../config/AssetsConfig';
import {AuthHeader} from '../../components/AuthHeader';
import {ThemeButton} from '../../components/Buttons';
import {Input} from '../../components/Input/input';
import {useToast} from 'react-native-toast-notifications';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Forgot = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const toast = useToast();

  const submit = async () => {
    if (loading === false) {
      if (email !== '') {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (reg.test(email) === false) {
          toast.show('Email is Not Correct');
          return false;
        } else {
          setLoading(true);
          const instance = await AuthContoller();
          const result = instance.forgotPassword(email);
         
          console.log(result,'resultt')
         
          if (result.data.responseJson.status === 'success') {
            toast.show('', result.data.responseJson.message);
            navigation.navigate('Login');
          } else {
            toast.show(result.data.responseJson.message);
          }
        }
      } else {
        toast.show('please enter email.and password');
      }
    }
  };

  return (
    <>
      <PageContainer>
        <ScrollView style={{flex: 1, paddingBottom: 50}}>
          <AuthHeader title={'Forgot Password'} />
          <View style={styles.form}>
            <Input value={email} label={'Email address'} onChang={setEmail} />

            <ThemeButton
              label={'Reset Password'}
              onPress={submit}
              loading={loading}
            />

            <TouchableOpacity
              style={{marginTop: 20}}
              onPress={() => navigation.navigate('Login')}>
              <Text style={styles.skipText}>Go back</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <Image source={assets.forgetBg} style={styles.bottombg} />
        <View style={styles.bgoverlay}></View>
      </PageContainer>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
  },

  label: {
    fontSize: 15,
    fontFamily: 'Gotham-Medium',
    color: '#111111',
    marginTop: 20,
  },
  bottombg: {
    position: 'absolute',
    resizeMode: 'cover',
    left: 0,
    right: 0,
    height: height,
    width: width,
    bottom: 0,
    zIndex: -1,
  },
  loader: {
    position: 'absolute',
    marginTop: 10,
    flex: 1,
  },
  forget: {
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 40,
  },
  forgetText: {
    color: '#fff',
    textAlign: 'center',
  },
  bgoverlay: {
    position: 'absolute',
    resizeMode: 'cover',
    left: 0,
    right: 0,
    height: height,
    width: width,
    bottom: 0,
    zIndex: -1,
    backgroundColor: 'rgba(0,0,0,0.75)',
  },
  input: {
    fontSize: 26,
    fontFamily: 'Gotham-Medium',
    color: '#F8C22E',
    borderWidth: 1,
    borderColor: '#F8C22E',
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 12,
    alignItems: 'center',
    textAlign: 'center',
    height: 53,
  },

  form: {
    marginTop: 220,
  },
  back: {
    width: 20,
    height: 20,
    marginTop: 5,
    position: 'absolute',
  },
  textBelow: {
    marginTop: 20,
    width: 250,
    alignSelf: 'center',
    textAlign: 'center',
  },
  pinkBorder: {
    borderColor: '#EA0A8C',
  },
  belowText: {
    color: '#ffffff',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 15,
    fontFamily: 'Gotham-Medium',
  },
  skip: {
    textAlign: 'center',
    marginTop: 30,
    bottom: Platform.OS === 'ios' ? 10 : 10,
    position: 'absolute',
    zIndex: 3,
    left: 0,
    right: 0,
  },
  skipText: {
    color: '#fff',
    textAlign: 'center',
  },
  alreadyBox: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'center',
  },
  AlreadyText: {
    color: '#1AA3AD',
    borderBottomWidth: 1,
    borderColor: '#1e4b4f',
    lineHeight: 16,
    marginTop: 5,
    fontSize: 16,
    fontFamily: 'Gotham-Black',
  },
});
export default Forgot;
