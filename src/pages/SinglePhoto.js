import '../App.css';
import { useState } from 'react';
import React, { useEffect } from 'react';
import { getRandomSinglePhoto } from "../Client";
import NavBarComponent from '../NavBarComponent';
import axios from 'axios';
// import { breedNames } from '../PhotosUtils';
function SinglePhoto() {
    const [boards, setBoards] = useState([]);
    const userId = sessionStorage.getItem('userId');

    const [data, setData] = useState('')
    const renderImage = (url) => {
        return (
            <div className=''>
                <img
                    height={500}
                    src={url}
                    alt="new"
                />
            </div>
        );
    }

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

    const createBoardEntry = (boardEntry) => axios.post(`http://localhost:8080/api/board-entry`, boardEntry)
        .then(function (response) {
            // dispatch(setUserId(response.data.userId));
            // getBoards(userId);
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });

    useEffect(() => {
        getRandomSinglePhoto(setData);
    }, []);

    useEffect(() => {
        if (userId) {
            getBoards(userId);
        }
    }, [userId]);
    console.log(boards)
    console.log('data', data)

    return (
        <div>
            <NavBarComponent />
            <div className='flex justify-center'>
                {renderImage(data)}
            </div>
            <div className='flex justify-center items-center'>
                <div className='pt2 flex justify-center'><button type="button" class="btn btn-primary" onClick={() => getRandomSinglePhoto(setData)}>Give me a new photo</button></div>
                <div className="pl1 pt2 dropdown">
                    <a className="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Add to board
                    </a>
                    <ul className="dropdown-menu">
                        {boards.map((board) => {
                            return (
                                <><li>
                                    <div className="dropdown-item" onClick={() => createBoardEntry({ photoName: data, boardId: board.boardId, userId: userId })}>{board.boardName}</div>
                                </li>
                                </>)
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default SinglePhoto;
