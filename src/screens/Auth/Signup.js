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
import {AuthHeader} from '../../components/AuthHeader';
import {DarkButton, ThemeButton} from '../../components/Buttons';
import {Input} from '../../components/Input/input';
import {useToast} from 'react-native-toast-notifications';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import CheckBox from 'react-native-check-box';
import {ModalView} from '../../components/ModalView';
import Terms from '../Terms';
import PrivacyPolicy from '../PrivacyPolicy';
import {CountryPicker} from 'react-native-country-codes-picker';
import {assets} from '../../config/AssetsConfig';
import {UserContext} from '../../../context/UserContext';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

var radio_props = [
  {label: 'MALE', value: 'Male'},
  {label: 'FEMALE', value: 'Female'},
];

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('Male');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [terms, setTerms] = useState(false);
  const [termsModal, setTermsModal] = useState(false);
  const [policyModal, setPolicyModal] = useState(false);
  const [code, setCode] = useState('+91');
  const [countryPicker, setCountryPicker] = useState(false);
  const [selectedFlag, setSelectedFlag] = useState('');

  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const userCtx = useContext(UserContext);
  const {setAuth} = useContext(UserContext);
  const {setToken} = useContext(UserContext);
  const toast = useToast();

  const submit = async () => {
    const validate = validateDetail();
    if (!validate.msg) {
      setLoading(true)
      const data = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        dob: dob,
        phone: phone,
       // phone: code + phone,
        gender: gender,
      };
      const instance = new AuthContoller();
      const result = await instance.signUpUser(data);
      if (result?.status !== 'error') {
        userCtx.setUser(result.user);
        setToken(result.access_token);
        setAuth(true);
        navigation.navigate('Drawer');
        toast.show(result.message);
        setLoading(false);
      } else {
        setLoading(false);
        toast.show(result.message);
      }
    } else {
      toast.show(validate.msg);
    }
  };

  function validateDetail() {
    if (
      first_name !== '' &&
      last_name !== '' &&
      email !== '' &&
      phone !== '' &&
      password !== '' &&
      confirmPassword !== ''
    ) {
      if (password == confirmPassword) {
        if (password.length > 7) {
          if (terms === true) {
            return true;
          } else {
            return {msg: 'Please accept our terms and condition.'};
          }
        } else {
          return {msg: 'Password must be 8 characters.'};
        }
      } else {
        return {msg: 'New Password and Confirm Password does not each other.'};
      }
    } else {
      return {msg: 'please fill all details'};
    }
  }

  const renderTerms = () => {
    return (
      <View style={styles.termsBox}>
        <Text style={styles.normalText}>By signup you agree our </Text>
        <TouchableOpacity onPress={() => setTermsModal(true)}>
          <Text style={styles.mediumText}>Terms and Conditions</Text>
        </TouchableOpacity>
        <Text style={styles.normalText}> and </Text>
        <TouchableOpacity onPress={() => setPolicyModal(true)}>
          <Text style={styles.mediumText}>Privacy Policy.</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
    <PageLoader loading={loading} />
      <PageContainer>
        <ScrollView contentContainerStyle={{paddingBottom: 10}}>
          <View
            style={{
              width: '100%',
              maxWidth: 320,
              alignSelf: 'center',
            }}>
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
                label={'E-MAIL ADDRESS'}
                onChang={setEmail}
              />

              <View style={{display: 'flex', flexDirection: 'row'}}>
                <TouchableOpacity
                  style={styles.codeInput}
                  onPress={() => setCountryPicker(true)}>
                  <Text style={styles.codeText}>
                    {selectedFlag} {code}
                  </Text>
                  <Image
                    source={assets.chevron}
                    style={{width: 14, height: 14, marginTop: 7}}
                  />
                </TouchableOpacity>
                <Input
                  value={phone}
                  label={'PHONE NUMBER'}
                  onChang={setPhone}
                  keyboardType={'numeric'}
                  style={styles.countryPicker}
                />
              </View>

              <View>
                <Text
                  style={{
                    paddingTop: 15,
                    fontSize: 12,
                    color: '#333',
                    marginLeft: 15,
                  }}>
                  BIRTH DATE
                </Text>
                <DatePicker
                  style={{
                    borderBottomWidth: 1.5,
                    borderColor: '#000',
                    width: '100%',
                    paddingTop: 0,
                  }}
                  placeholder="Birth Date"
                  date={dob}
                  mode="date"
                  format="YYYY-MM-DD"
                  maxDate="2010-01-01"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateIcon: {
                      display: 'none',
                    },

                    dateText: {
                      fontSize: 14,
                      color: '#000',
                      paddingLeft: 15,
                      paddingBottom: 0,
                    },
                    dateInput: {
                      fontSize: 14,
                      color: '#000',
                      marginTop: 0,
                      borderWidth: 0,
                      alignItems: 'flex-start',
                      width: '100%',
                    },
                  }}
                  onDateChange={date => {
                    setDob(date);
                  }}
                />
              </View>

              <View style={{marginTop: 15}}>
                <RadioForm
                  radio_props={radio_props}
                  buttonColor={'#000'}
                  formHorizontal={true}
                  initial={0}
                  buttonSize={10}
                  buttonOuterSize={20}
                  labelStyle={{
                    fontSize: 14,
                    fontFamily: 'Gotham-Book',
                    color: '#000',
                    paddingRight: 15,
                    marginBottom: 10,
                  }}
                  onPress={value => {
                    setGender(value);
                  }}
                />
              </View>

              <Input
                value={password}
                label={'PASSWORD'}
                onChang={setPassword}
                secureTextEntry={true}
              />
              <Input
                value={confirmPassword}
                label={'CONFIRM PASSWORD'}
                onChang={setConfirmPassword}
                secureTextEntry={true}
              />

              <View
                style={{width: '100%', marginTop: 20, flexDirection: 'row'}}>
                <CheckBox
                  style={{
                    width: 30,
                    paddingLeft: 0,
                    paddingTop: 8,
                    fontSize: 12,
                    color: '#000',
                  }}
                  onClick={() => setTerms(!terms)}
                  isChecked={terms}
                  checkBoxColor={'#000'}
                  rightText={''}
                  rightTextStyle={{
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: '#000',
                  }}
                />
                {renderTerms()}
              </View>

              <DarkButton
                label={'SIGN UP'}
                style={{marginTop: 20}}
                onPress={submit}
                loading={loading}
              />
            </View>

            <View style={styles.alreadyBox}>
              <Text
                style={
                  (styles.mediumText,
                  {fontSize: 14, textTransform: 'uppercase'})
                }>
                Already have an account?{' '}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.AlreadyText}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </PageContainer>

      <ModalView
        visible={termsModal}
        heading="TERMS AND CONDITION"
        setVisible={() => setTermsModal(false)}>
        <Terms />
      </ModalView>

      <ModalView
        visible={policyModal}
        heading="PRIVACY POLICY"
        setVisible={() => setPolicyModal(false)}>
        <PrivacyPolicy />
      </ModalView>

      <CountryPicker
        show={countryPicker}
        pickerButtonOnPress={item => {
          console.log(item, 'item');
          setSelectedFlag(item.flag);
          setCode(item.dial_code);
          setCountryPicker(false);
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    paddingTop: Platform.OS === 'ios' ? 0 : 20,
  },
  form: {
    marginTop: 0,
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
  normalText: {
    color: '#000',
    fontSize: 12,
    lineHeight: 18,
    fontFamily: 'Gotham-Book',
  },
  mediumText: {
    color: '#000',
    fontSize: 12,
    lineHeight: 18,
    fontFamily: 'Gotham-Medium',
  },
  termsBox: {
    display: 'flex',
    width: width - 80,
    paddingTop: 8,
    paddingLeft: 6,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  countryPicker: {
    width: width - 170,
    marginLeft: 5,
    backgroundColor: 'transparent',
    color: '#000',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    textTransform: 'uppercase',
    fontSize: 14,
    fontFamily: 'Gotham-Medium',
  },
  codeInput: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1.5,
    height: 32,
    width: 85,
    marginTop: 13,
    borderRadius: 6,
    paddingHorizontal: 5,
    borderColor: '#000',
  },
  codeText: {
    lineHeight: 28,
    fontSize: 14,
  },
});
export default SignUp;
