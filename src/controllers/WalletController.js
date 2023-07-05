import {API_BASE} from '../config/ApiConfig';

export class WalletController {

  async getBalance(token) {
    console.log(token,'token')
    return fetch(API_BASE + '/wallet/balance', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
        Accept: 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        return responseJson;
      })
      .catch(error => {
        console.log(error);
        return {success: false, error};
      });
  }
}