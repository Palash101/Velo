import React, {Component, useContext, useState} from 'react';
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
import {DarkButton, ThemeButton} from '../../components/Buttons';
import {Input} from '../../components/Input/input';
import {useToast} from 'react-native-toast-notifications';
import { UserContext } from '../../../context/UserContext';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const userCtx = useContext(UserContext);
  const {setAuth} = useContext(UserContext);
  const {setToken} = useContext(UserContext);

  const toast = useToast();

  const submit = async () => {
    console.log(email !== '' && password !== '', 'password');
    if (loading === false) {
      if (email !== '' && password !== '') {
        setLoading(true);
        const instance = new AuthContoller();
        const result = await instance.loginUser(email, password);
        console.log(result, 'result');
        if (result?.success === true) {
          if (result.data.access_token) {
            userCtx.setUser(result.data.user);
            setToken(result.data.access_token);
            setAuth(true);

            navigation.navigate('Drawer');
            toast.show('Welcome to velo');
            setLoading(false);
          } else {
            setLoading(false);
            toast.show(result.data.error);
          }
        } else {
          setLoading(false);
          toast.show(result.message.error);
        }
      } else {
        toast.show('please enter email and password');
      }
    }
  };

  return (
    <>
      <PageContainer>
        <ScrollView contentContainerStyle={{flex: 1, }}>
          <View style={{width:'100%',maxWidth:320,alignSelf:'center'}}>
            <AuthHeader title={'Login'} />
            <View style={styles.form}>
              <Input value={email} label={'E-MAIL ADDRESS'} onChang={setEmail} />

              <Input
                value={password}
                label={'PASSWORD'}
                onChang={setPassword}
                secureTextEntry={true}
              />

              <DarkButton label={'LOGIN'} onPress={submit} style={{marginTop:20}} loading={loading} />

              <TouchableOpacity
                style={styles.forget}
                onPress={() => navigation.navigate('Forgot')}>
                <Text style={styles.forgetText}>Forgot Password </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.skip} onPress={() => console.log()}>
                <Text style={styles.skipText}>Skip Now </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        <View style={styles.alreadyBox}>
          
          <Text
            style={{
              color: '#000',
              fontFamily: 'Gotham-Medium',
              opacity: 1,
              fontSize: 16,
              textTransform:'uppercase'
            }}>
            Don't have account?{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.AlreadyText}>Sign Up</Text>
          </TouchableOpacity>
        </View>

      </PageContainer>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    paddingTop: Platform.OS === 'ios' ? 0 : 20,
  },

  label: {
    fontSize: 15,
    fontFamily: 'Gotham-Medium',
    color: '#000',
    marginTop: 20,
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
    color: '#000',
    textAlign: 'center',
    textTransform:'uppercase',
    fontSize:16,
    fontFamily: 'Gotham-Medium',
  },
  input: {
    fontSize: 26,
    fontFamily: 'Gotham-Medium',
    color: '#000',
    borderWidth: 1,
    borderColor: '#000',
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 12,
    alignItems: 'center',
    textAlign: 'center',
    height: 53,
    textTransform:'uppercase'
  },

  form: {
    marginTop: 90,
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
  belowText: {
    color: '#000',
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
    color: '#000',
    textAlign: 'center',
    textTransform:'uppercase',
    fontSize:14,
    fontFamily: 'Gotham-Light',
  },
  alreadyBox: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'center',
  },
  AlreadyText: {
    color: '#000',
    textTransform:'uppercase',
    lineHeight: 16,
    marginTop: 10,
    fontSize: 16,
    fontFamily: 'Gotham-Black',
  },
});
export default Login;
