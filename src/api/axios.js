import axios from 'axios';


export const getProfiles = () => axios.get(`http://localhost:8080/api/v1/profile`)
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });

export const registerUser = (user) => axios.post(`http://localhost:8080/api/auth/register`, user)
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });

export const loginUser = (user) => axios.post(`http://localhost:8080/api/auth/login`, user)
    .then(function (response) {
        // dispatch(setUserId(0));
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });