import '../App.css';
import React from 'react';
import NavBarComponent from '../NavBarComponent.js';
import { useState } from 'react';
// import { loginUser } from "../api/axios";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setUserId } from '../state/userSlice';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Login() {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const userId = useSelector((state) => state.user.userId);
    // console.log(sessionStorage)
    const loginUser = (user) => axios.post(`http://localhost:8080/api/auth/login`, user)
        .then(function (response) {
            sessionStorage.setItem('jwtToken', response.data.accessToken);
            sessionStorage.setItem('userId', response.data.userId);
            // dispatch(setUserId(response.data.userId));
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    // console.log(myValue);

    return (
        <div>
            <NavBarComponent />
            <form className='mw5 pl2'>
                <div className="form-group">
                    <label for="exampleInputEmail1">Username</label>
                    <input type="username" className="form-control" id="exampleInputUsername1" aria-describedby="usernameHelp" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    Need to create an account? <Link to="/register">Sign up here</Link>
                </div>
                {/* <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" for="exampleCheck1">Check me out</label>
                </div> */}
                {/* <button className="btn btn-primary" onClick={() => loginUser({ username: username, password: password })}>Submit</button> */}
            </form>

            <button className="btn btn-primary" onClick={() => loginUser({ username: username, password: password })}>Submit</button>

        </div>
    );
}

export default Login;
