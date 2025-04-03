import '../App.css';
import React, { useEffect } from 'react';
import NavBarComponent from '../NavBarComponent.js';
import { useState } from 'react';
// import { loginUser } from "../api/axios";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setUserId } from '../state/userSlice';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Boards() {
    const [boardName, setBoardName] = useState('')
    const [boards, setBoards] = useState([]);
    const navigate = useNavigate();

    console.log(boards)
    const userId = sessionStorage.getItem('userId');

    // const dispatch = useDispatch();
    // const [username, setUsername] = useState('')
    // const [password, setPassword] = useState('')
    // const userId = useSelector((state) => state.user.userId);

    // const loginUser = (user) => axios.post(`http://localhost:8080/api/auth/login`, user)
    //     .then(function (response) {
    //         dispatch(setUserId(response.data.userId));
    //         console.log(response);
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });
    // // console.log(myValue);
    const createBoard = (board) => axios.post(`http://localhost:8080/api/board`, board)
        .then(function (response) {
            // dispatch(setUserId(response.data.userId));
            getBoards(userId);
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });

    const getBoards = (userId) => axios.get(`http://localhost:8080/api/board/all-boards-by-user`,
        {
            params: {
                userId: userId ?? ''
            }
        })
        .then(function (response) {
            setBoards(response.data);
            // dispatch(setUserId(response.data.userId));
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });

    useEffect(() => {
        if (userId) {
            getBoards(userId);
        }
    }, [userId]);
    return (
        <div>

            <NavBarComponent />
            <div className="dropdown pl2 pb2">
                <a className="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Create new board
                </a>
                <ul className="dropdown-menu">
                    <div>
                        Board name:
                        <input type="name" className="form-control" id="exampleInputPassword1" placeholder="Name" onChange={(e) => setBoardName(e.target.value)} />
                        <button className="btn btn-primary" onClick={() => createBoard({ boardName: boardName, userId: userId })}>Submit</button>
                    </div>
                </ul>
            </div>
            <div className='pl2 flex' style={{ gap: 6 }}>
                {boards.map((b) => {
                    return (<div style={{ height: 0, width: '20%', paddingBottom: "20%", borderStyle: "solid" }} onClick={() => navigate(`/board/${b.boardId}`)}>
                        <div className='flex justify-center items-center'>
                            {b.boardName}
                        </div>
                    </div>)
                })}
            </div>
        </div>
    );
}

export default Boards;
