import {API_BASE} from '../config/ApiConfig';

export class AuthContoller {

  async loginUser(email, password) {
    console.log(email,password,'passssword')
    const newdata = new FormData();
    newdata.append('email', email);
    newdata.append('password', password);
    console.log(API_BASE + '/auth/login','API_BASE')
    return fetch(API_BASE + '/auth/login', {
      method: 'POST',
      body: newdata,
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson, 'response')
        return responseJson;
      })
      .catch(error => {
        console.log(error);
        return {success: false, error};
      });
  }

  async signUpUser(data) {

    const newdata = new FormData();
       newdata.append('first_name', data.first_name);
       newdata.append('last_name', data.last_name);
       newdata.append('email', data.email);
       newdata.append('password', data.password);
       newdata.append('phone', data.phone);
       newdata.append('dob', data.dob);
       newdata.append('password_confirmation', data.confirmPassword);
       newdata.append('gender', data.gender);
       newdata.append('terms_and_conditions', 1);
       newdata.append('referral_code','');

      console.log(newdata,'newdata')
    return fetch(API_BASE + '/auth/register', {
      method: 'POST',
      body: newdata,
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson, 'response')
        return responseJson;
      })
      .catch(error => {
        console.log(error);
        return {success: false, error};
      });
  }

  async forgotPassword(email) {
    const newdata = new FormData();
    newdata.append('email', email);
    return fetch(API_BASE + '/auth/password/reset/request', {
      method: 'POST',
      body: newdata,
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson, 'reee')
        return responseJson
      })
      .catch(error => {
        console.log(error);
        return {success: false, error};
      });
  }
}
