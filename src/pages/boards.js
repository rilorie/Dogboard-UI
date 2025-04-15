import '../App.css';
import React, { useEffect } from 'react';
import NavBarComponent from '../NavBarComponent.js';

import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Boards() {
    const [boardName, setBoardName] = useState('')
    const [boards, setBoards] = useState([]);
    const navigate = useNavigate();
    const userId = sessionStorage.getItem('userId');

    const createBoard = (board) => axios.post(`http://localhost:8080/api/board`, board)
        .then(function (response) {
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
        <div className='h-100'>
            <NavBarComponent />
            {!userId ? <div className='flex justify-center items-center f2 pt6'> Please login to access this feature!</div> : <div>

                <div className="dropdown pl2 pb2 pt2">
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
                {boards.length ? <div className='pl2 flex' style={{ gap: 6 }}>
                    {boards.map((b) => {
                        return (<div style={{ height: '10vh', width: '15%', paddingBottom: "20%", borderStyle: "solid", borderRadius: "25px", backgroundColor: "#F0FFFF", }} onClick={() => navigate(`/board/${b.boardId}`)}>
                            <div className='flex justify-center items-center pt5 f3'>
                                {b.boardName}
                            </div>
                        </div>)
                    })}
                </div> : <div className='flex items-center justify-center f2 pt6'>You have no boards! Click "Create new board" to get started</div>}

            </div>}
        </div >
    );
}

export default Boards;
