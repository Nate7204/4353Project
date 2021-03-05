import axios from "axios"

/*

export default class AuthService {
    login(username, password){
        return axios
            .post(API_URL + "signin", {
                username,
                password
            })
            .then(response => {
                if (response.data.accessToken){
                    localStorage.setItem("user", JSON.stringify(response.data))
                }

                return response.data
            })
    }  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      password
    });
  }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem("user"))
    }
}

*/