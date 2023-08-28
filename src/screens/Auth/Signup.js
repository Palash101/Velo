import React, {Component, useContext, useEffect, useState} from 'react';
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
import DateTimePicker from '@react-native-community/datetimepicker';

// import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import CheckBox from 'react-native-check-box';
//  import { Checkbox } from 'react-native-paper';

import {ModalView} from '../../components/ModalView';
import Terms from '../Terms';
import PrivacyPolicy from '../PrivacyPolicy';
import {CountryPicker} from 'react-native-country-codes-picker';
import {assets} from '../../config/AssetsConfig';
import {UserContext} from '../../../context/UserContext';
import {Modal} from 'react-native-paper';

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

  const [terms, setTerms] = useState(false);
  const [termsConditionModal, setTermsConditionModal] = useState(false);
  const [policyModal, setPolicyModal] = useState(false);
  const [code, setCode] = useState('+91');
  const [countryPicker, setCountryPicker] = useState(false);
  const [selectedFlag, setSelectedFlag] = useState('');
  const [datePicker, setDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const userCtx = useContext(UserContext);
  const {setAuth} = useContext(UserContext);
  const {setToken} = useContext(UserContext);
  const toast = useToast();

  const dt = new Date();
  const maxDate = new Date(dt.setFullYear(dt.getFullYear() - 15));
  const minDate = new Date(dt.setFullYear(dt.getFullYear() - 45));
  const [dob, setDob] = useState(maxDate);

  const submit = async () => {
    const validate = validateDetail();
    if (!validate.msg) {
      setLoading(true);
      const data = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        dob: moment(dob).format('YYYY-MM-DD'),
        phone: code + phone,
        gender: gender,
      };
      const instance = new AuthContoller();
      const result = await instance.signUpUser(data);
      setLoading(false);
      if (result?.status) {
        userCtx.setUser(result.user);
        setToken(result.access_token);
        setAuth(true);
        toast.show(result.message);
        setLoading(false);
      } else {
        var errors = result.errors;
        var value = '';
        if (errors?.phone) {
          value = errors.phone + ' ,';
        }
        if (errors?.email) {
          value = value + errors.email;
        }
        if (value === '') {
          value = JSON.stringify(result.error);
        }

        setLoading(false);
        toast.show(value);
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

  function showDatePicker() {
    setDatePicker(true);
  }

  function onDateSelected(event, value) {
    setDob(value);
    if (Platform.OS !== 'ios') {
      setDatePicker(false);
    }
  }

  const renderTerms = () => {
    return (
      <View style={styles.termsBox}>
        <Text style={styles.normalText}>By signup you agree our </Text>
        <TouchableOpacity onPress={() => setTermsConditionModal(true)}>
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
      {/* <PageLoader loading={loading} /> */}
      <View
        style={{
          paddingTop: Platform.OS === 'ios' ? 0 : 0,
          backgroundColor: '#fff',
        }}>
        <ScrollView
          contentContainerStyle={{paddingBottom: 10}}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              width: '100%',
              maxWidth: 320,
              alignSelf: 'center',
            }}>
            <AuthHeader title={'Sign up'} />

            <View style={styles.form}>
              <View>
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

                <View style={{position: 'relative'}}>
                  <Text
                    style={{
                      paddingTop: 15,
                      fontSize: 12,
                      color: '#333',
                      marginLeft: 15,
                    }}>
                    BIRTH DATE
                  </Text>

                  {Platform.OS === 'android' ? (
                    <View style={{marginTop: -25}}>
                      <TouchableOpacity
                        style={{
                          height: 50,
                          position: 'absolute',
                          left: 0,
                          right: 0,
                          top: 10,
                          zIndex: 999,
                        }}
                        onPress={() => showDatePicker()}></TouchableOpacity>
                      <Input
                        value={moment(dob).format('YYYY-MM-DD')}
                        onChangeText={() => console.log('')}
                        label={' '}
                        disabled={true}
                      />
                    </View>
                  ) : (
                    <DatePicker
                      style={{
                        borderBottomWidth: 1.5,
                        borderColor: '#000000',
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
                          color: '#000000',
                          paddingLeft: 15,
                          paddingBottom: 0,
                        },
                        dateInput: {
                          fontSize: 14,
                          color: '#000000',
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
                  )}
                </View>

                <View style={{marginTop: 15}}>
                  {/* <RadioForm
                    radio_props={radio_props}
                    buttonColor={'#000000'}
                    formHorizontal={true}
                    initial={0}
                    buttonSize={10}
                    buttonOuterSize={20}
                    labelStyle={{
                      fontSize: 14,
                      fontFamily: 'Gotham-Book',
                      color: '#000000',
                      paddingRight: 15,
                      marginBottom: 10,
                    }}
                    onPress={value => {
                      setGender(value);
                    }}
                  /> */}

                  <RadioForm
                    formHorizontal={true}
                    animation={true}
                  >
                  {
                    radio_props.map((obj, i) => (
                      <RadioButton labelHorizontal={true} key={i} >
                        <RadioButtonInput
                          obj={obj}
                          index={i}
                          isSelected={gender === obj.value}
                          onPress={(value) => setGender(value)}
                          borderWidth={1}
                          buttonInnerColor={'#000'}
                          buttonOuterColor={gender === obj.value ? '#161415' : '#161415'}
                          buttonSize={10}
                          buttonOuterSize={18}
                          buttonStyle={{}}
                          buttonWrapStyle={{marginLeft: 10}}
                        />
                        <RadioButtonLabel
                          obj={obj}
                          index={i}
                          labelHorizontal={true}
                          onPress={(value) => setGender(value)}
                          labelStyle={{fontSize: 14, color: '#161415'}}
                          labelWrapStyle={{}}
                        />
                      </RadioButton>
                    ))
                  }  
                </RadioForm>
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
              </View>

              <View
                style={{width: '100%', marginTop: 20, flexDirection: 'row'}}>
                <CheckBox
                  style={{
                    width: 30,
                    paddingLeft: 0,
                    paddingTop: 8,
                    fontSize: 12,
                    color: '#000000',
                  }}
                  onClick={() => setTerms(!terms)}
                  isChecked={terms}
                  checkBoxColor={'#000000'}
                  rightText={''}
                  rightTextStyle={{
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: '#000000',
                  }}
                />
                {renderTerms()}
              </View>

              <DarkButton
                label={'SIGN UP'}
                style={{marginTop: 20, backgroundColor: '#000'}}
                onPress={submit}
                loading={loading}
                disabled={loading}
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
      </View>

      <ModalView
        visible={termsConditionModal}
        heading="TERMS AND CONDITION"
        setVisible={() => setTermsConditionModal(false)}
        style={{
          height: 'auto',
          marginTop: 260,
          justifyContent: 'flex-end',
          marginBottom: 0,
          zIndex: 999,
        }}>
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
          setSelectedFlag(item.flag);
          setCode(item.dial_code);
          setCountryPicker(false);
        }}
      />

      {datePicker && (
        <DateTimePicker
          value={dob}
          mode={'date'}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          is24Hour={true}
          onChange={onDateSelected}
          maximumDate={maxDate}
          textColor="#333"
        />
      )}
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
    lineHeight: 16,
    marginTop: 10,
    fontSize: 14,
    fontFamily: 'Gotham-Medium',
  },
  normalText: {
    color: '#161415',
    fontSize: 12,
    lineHeight: 18,
    fontFamily: 'Gotham-Book',
  },
  mediumText: {
    color: '#000000',
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
    color: '#000000',
    borderBottomColor: '#000000',
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
    borderColor: '#000000',
  },
  codeText: {
    lineHeight: 28,
    fontSize: 14,
  },
});
export default SignUp;
