import {API_BASE} from '../config/ApiConfig';

export class ClassContoller {
  async getAllClasses(token) {
    return fetch(API_BASE + '/locations/get', {
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

  async getClassDetail(id, token) {
    console.log(id, token)
    return fetch(API_BASE + '/classes/' + id + '/details', {
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

  async BookClass(data, token) {
    const newdata = new FormData();
    newdata.append('classes_id', data.classes_id);
    newdata.append('type', data.type);
    newdata.append('seat', data.seat);
    newdata.append('device', data.device);
    if (data.package_id) {
      newdata.append('package_id', data.package_id);
    }

    const url = API_BASE + '/booking/complete';
    return fetch(url, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        Accept: 'application/json',
      },
      body: newdata,
    })
      .then(response => response.json())
      .then(responseJson => {
        return responseJson;
      })
      .catch(error => {
        return error;
      });
  }

  async joinWaitingClass(data, token) {
    const newData = new FormData();
    newData.append('classes_id', data.classes_id);
    newData.append('type', data.type);
    newData.append('device', data.device);
    if (data.package_id) {
      newData.append('package_id', data.package_id);
    }

    return fetch(API_BASE + '/booking/waiting', {
      method: 'POST',
      body: newData,
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
        return { success: false, error };
      });
  }

  async UpdateClass(data, token){
    const newdata = new FormData();
    newdata.append('seat', data.seat);
    newdata.append('booking_id', data.booking_id);
    console.log(newdata,'newdata')
    const url = API_BASE + '/booking/seat/update';
    return fetch(url, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        Accept: 'application/json',
      },
      body: newdata,
    })
      .then(response => response.json())
      .then(responseJson => {
        return responseJson;
      })
      .catch(error => {
        return error;
      });
  }
  async CancelClass(data, token){
    const newdata = new FormData();
    newdata.append('booking_id', data.booking_id);
    console.log(data.booking_id,token,'tttt')
    const url = API_BASE + '/booking/cancel';
    return fetch(url, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        Accept: 'application/json',
      },
      body: newdata,
    })
      .then(response => response.json())
      .then(responseJson => {
        return responseJson;
      })
      .catch(error => {
        return error;
      });
  };

}
