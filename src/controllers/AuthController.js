import {API_BASE} from '../config/ApiConfig';

export class AuthContoller {
  async loginUser(email, password) {
    const newdata = new FormData();
    newdata.append('email', this.state.email);
    newdata.append('password', this.state.password);
    fetch(API_BASE + '/auth/login', {
      method: 'POST',
      body: newdata,
    })
      .then(response => response.json())
      .then(responseJson => {
        return {success: true, data: responseJson};
      })
      .catch(error => {
        console.log(error);
        return {success: false, error};
      });
  }

  async forgotPassword(email) {
    const newdata = new FormData();
    newdata.append('email', this.state.email);
    fetch(API_BASE + '/auth/password/reset/request', {
      method: 'POST',
      body: newdata,
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson,'reee')
        return {success: true, data: responseJson};
      })
      .catch(error => {
        console.log(error);
        return {success: false, error};
      });
  }
}
