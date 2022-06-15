import axios from "axios";

const backendUrl = "http://localhost:3000";

export default function createUser(name: string, username: string, email: string, password: string) {
    axios.post(backendUrl + '/users', {
        name: name,
        username: username,
        email: email,
        password: password
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}