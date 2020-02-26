import axios from "axios";

export default class API {
  static baseURL() {
    return "https://tartu-parking-backend.herokuapp.com/api/v1";
  }

  static post(url, params) {
    return axios({
      method: "post",
      url: `${API.baseURL()}${url}`,
      data: params
    });
  }
}
