import '../App.css';
import React from 'react';
import NavBarComponent from '../NavBarComponent.js';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUserId } from '../state/userSlice';
import axios from 'axios';

function Register() {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isUsernameError, setUsernameError] = useState(false);

    const registerUser = (user) => axios.post(`http://localhost:8080/api/auth/register`, user)
        .then(function (response) {
            dispatch(setUserId(response.data.userId));
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
            Create an account
            <form className='mw5 pl2'>
                <div className="form-group">
                    <label for="exampleInputEmail1">Username</label>
                    <input type="username" className="form-control" id="exampleInputUsername1" aria-describedby="usernameHelp" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div class="col-md-4">
                    <label for="validationCustomUsername" class="form-label">Username</label>
                    <div class="input-group has-validation">
                        <input type="text" class="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" required />
                        <div class="invalid-feedback">
                            Please choose a username.
                        </div>
                    </div>
                </div>

            </form>

            <button className="btn btn-primary" onClick={() => registerUser({ username: username, password: password })}>Submit</button>

        </div>
    );
}

export default Register;
