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
import {AuthHeader} from '../../components/AuthHeader';
import {DarkButton, ThemeButton} from '../../components/Buttons';
import {Input} from '../../components/Input/input';
import {useToast} from 'react-native-toast-notifications';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

var radio_props = [
  {label: 'Male', value: 'Male'},
  {label: 'Female', value: 'Female'},
];

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const [gender, setGender] = useState('Male');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [country, setCountry] = useState('');
  const [referral_code, setRefferalCode] = useState('');
  const [msgs, setMsgs] = useState('');
  const [termsModal, setTermsModal] = useState(false);
  const [terms_and_conditions, setTermsAndConditions] = useState();
  const [privacyModal, setPrivacyModal] = useState(false);
  const [privacy_policy, setPrivacyPolicy] = useState();

  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const toast = useToast();

  const submit = async () => {
    console.log(email !== '' && password !== '', 'password');
    if (email !== '' && password !== '') {
      setLoading(true);
      const instance = await AuthContoller();
      const result = instance.loginUser(email, password);
      if (result.success === true) {
        if (result.responseJson.access_token) {
          AsyncStorage.setItem(
            'token',
            JSON.stringify(result.responseJson.access_token),
          );
          AsyncStorage.setItem(
            'user',
            JSON.stringify(result.responseJson.user),
          );
          navigation.navigate('Home');
          alert('Welcome to velo');
        } else {
          alert(result.responseJson.error);
        }
      } else {
        alert(result.message.error);
      }
    } else {
      toast.show('please enter email and password');
    }
  };

  return (
    <>
      <PageContainer>
        <ScrollView contentContainerStyle={{flex: 1}}>
          <View style={{width: '100%', maxWidth: 320, alignSelf: 'center'}}>
            <AuthHeader title={'Sign up'} />
            <View style={styles.form}>
              <Input
                value={first_name}
                label={'FIRST NAME'}
                onChang={setFirstName}
              />
              <Input
                value={last_name}
                label={'LAST NAME'}
                onChang={setLastName}
              />
              <Input
                value={email}
                label={'E_MAIL ADDRESS'}
                onChang={setEmail}
              />
              <Input
                value={password}
                label={'PASSWORD'}
                onChang={setPassword}
                secureTextEntry={true}
              />
              <Input
                value={password_confirmation}
                label={'CONFIRM PASSWORD'}
                onChang={setPasswordConfirmation}
                secureTextEntry={true}
              />
              <Input
                value={phone}
                label={'PHONE NUMBER'}
                onChang={setPhone}
                keyboardType={'numeric'}
              />

              <View style={{marginTop: 20}}>
                <RadioForm
                  radio_props={radio_props}
                  buttonColor={'#000'}
                  formHorizontal={true}
                  initial={0}
                  buttonSize={10}
                  buttonOuterSize={20}
                  labelStyle={{
                    fontSize: 16,
                    fontFamily: 'Gotham-Medium',
                    color: '#000',
                    paddingRight: 15,
                  }}
                  onPress={value => {
                    setGender(value);
                  }}
                />
              </View>
              <DarkButton
                label={'SIGN UP'}
                style={{marginTop: 20}}
                onPress={submit}
                loading={loading}
              />
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
              textTransform: 'uppercase',
            }}>
            Already have an account?{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.AlreadyText}>Login</Text>
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
  },

  form: {
    marginTop: 20,
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

  alreadyBox: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'center',
  },
  AlreadyText: {
    color: '#000',
    textTransform: 'uppercase',
    fontWeight: '800',
    lineHeight: 16,
    marginTop: 10,
    fontSize: 16,
    fontFamily: 'Gotham-Black',
  },
});
export default SignUp;
