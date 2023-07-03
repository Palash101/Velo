import {API_BASE} from '../config/ApiConfig';

export class BuyContoller {
  async getAllPackages(token) {
    return fetch(API_BASE + '/packages/get', {
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

  async getUserPackages(token) {
    return fetch(API_BASE + '/packages/active', {
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

  async purchasePackage(data, token) {
    const newdata = new FormData();
    newdata.append('package_id', data.id);
    newdata.append('type', data.type);
    newdata.append('device', 'mobile');
    const payuri =
      API_BASE +
      '/packages/purchase?package_id=' +
      data.id +
      '&type=Wallet&device=mobile';

    return fetch(payuri, {
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
        return error;
      });
  }
}
