import {API_BASE} from '../config/ApiConfig';

export class DoubleJoyController {
  async getAllDoubleJoy(token) {
    return fetch(API_BASE + '/category/get', {
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

  async getMyOrder(token) {
    return fetch(API_BASE + '/order/get', {
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

  async getMyCart(token) {
    return fetch(API_BASE + '/cart/get', {
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

  async addItem(token, id, qty) {
    const newdata = new FormData();
    newdata.append('optional_item_id', id);
    newdata.append('quantity', qty);

    console.log(newdata, token)
    return fetch(API_BASE + '/cart/add', {
      method: 'POST',
      body: newdata,
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

  async removeItem(token, id) {
    const newdata = new FormData();
    newdata.append('optional_item_id', id);

    return fetch(API_BASE + '/cart/remove', {
      method: 'POST',
      body: newdata,
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

  async checkout(token, cart_id, type, note) {
    

    // const newdata = new FormData();
    // newdata.append('cart_id', cart_id);
    // newdata.append('type', type);
    // if (note || note?.length) {
    //   newdata.append('note', note);
    // }

    // console.log(newdata, 'newdata');
    // return fetch(API_BASE + '/order/checkout', {
    //   method: 'POST',
    //   body: newdata,
    //   headers: {
    //     Authorization: 'Bearer ' + token,
    //     Accept: 'application/json',
    //   },
    // })
    //   .then(response => response.json())
    //   .then(responseJson => {
    //     return JSON.parse(responseJson);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     return {success: false, error};
    //   });

    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Authorization', 'Bearer ' + token);

    const newdata = new FormData();
    newdata.append('cart_id', cart_id);
    newdata.append('type', type);
    if (note || note?.length) {
      newdata.append('note', note);
     }

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: newdata,
      redirect: 'follow',
    };

    return fetch(API_BASE + '/order/checkout', requestOptions)
      .then(response => response.text())
      .then(result => {
        return JSON.parse(result);
      })
      .catch(error => {
        return error;
      });

  }
}
