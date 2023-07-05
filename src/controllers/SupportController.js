import {API_BASE} from '../config/ApiConfig';

export class SupportController {

  async getSupport() {
    return fetch(API_BASE + '/cms/contact_us', {
      method: 'GET',
      headers: {
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