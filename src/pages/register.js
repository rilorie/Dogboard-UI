import '../App.css';
import React from 'react';
import NavBarComponent from '../NavBarComponent.js';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUserId } from '../state/userSlice';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isUsernameError, setUsernameError] = useState(false);

    const registerUser = (user) => axios.post(`http://localhost:8080/api/auth/register`, user)
        .then(function (response) {
            dispatch(setUserId(response.data.userId));
            navigate(`/login`)

        })
        .catch(function (error) {
            if (error.status === 400) {
                setUsernameError(true);
            }
            console.log(error);
        });

    console.log(isUsernameError)
    return (
        <div>
            <NavBarComponent />
            <div className='flex justify-center items-center pt4'>

                <form className=' pl2'>
                    <div className="form-group">
                        <label for="exampleInputEmail1">Username</label>
                        <input type="username" className="form-control" id="exampleInputUsername1" aria-describedby="usernameHelp" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    </div>

                </form>
            </div>
            <div className='flex justify-center pt3'>            <button className="btn btn-primary" onClick={() => registerUser({ username: username, password: password })}>Submit</button>
            </div>
        </div>
    );
}

export default Register;
