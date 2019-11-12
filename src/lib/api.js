import axios from "axios";

export default class API {
  static baseURL() {
    return "http://localhost:4000/api/v1"
  }

  static post(url, params) {
    return axios({
      method: 'post',
      url: `${API.baseURL()}${url}`,
      data: params
    });
  }
}
