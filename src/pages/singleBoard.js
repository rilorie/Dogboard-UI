import '../App.css';
import React, { useEffect } from 'react';
import NavBarComponent from '../NavBarComponent.js';
import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';

function SingleBoard() {
    const [photos, setPhotos] = useState([]);
    const { id } = useParams();

    console.log(id)
    const userId = sessionStorage.getItem('userId');
    const renderImage = (url) => {
        return (
            <div className='gallery__img '>
                <img
                    src={url}
                    alt="new"
                />
            </div>
        );
    }

    const getPhotos = (userId, boardId) => axios.get(`http://localhost:8080/api/board-entry`,
        {
            params: {
                boardId: boardId,
                userId: userId ?? ''
            }
        })
        .then(function (response) {
            setPhotos(response.data);
            // dispatch(setUserId(response.data.userId));
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });

    useEffect(() => {
        if (userId) {
            getPhotos(userId, id);
        }
    }, [userId]);
    return (
        <div>
            <NavBarComponent />
            <div className="gallery pt3" style={{ marginLeft: 'auto', marginRight: 'auto', width: '80%' }}>
                {photos?.map((photo) => renderImage(photo.photoName))}
            </div>
        </div>
    );
}

export default SingleBoard;
