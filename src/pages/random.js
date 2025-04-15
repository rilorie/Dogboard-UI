import '../App.css';
import { useState } from 'react';
import React, { useEffect } from 'react';
import { getRandomPhotos, getRandomPhotosByBreed } from "../Client";
import { getProfiles, createProfiles } from "../api/axios";
import NavBarComponent from '../NavBarComponent';
import { breedNames } from '../PhotosUtils';
import axios from 'axios';

// import NavBarComponent from '../NavBarComponent.js';
function Random() {
  const [data, setData] = useState([])
  const [selectedBreed, setSelectedBreed] = useState('Random')
  const [onHover, setOnHover] = useState(false)
  const [boards, setBoards] = useState([]);
  const userId = sessionStorage.getItem('userId');

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
    if (selectedBreed === 'Random') {
      getRandomPhotos(setData);
    } else {
      getRandomPhotosByBreed(selectedBreed, setData);
    }
  }, [selectedBreed]);

  useEffect(() => {
    if (userId) {
      getBoards(userId);
    }
  }, [userId]);

  const renderImage = (url) => {
    return (
      <div className={'gallery__img div-img'} style={{ position: 'relative', zIndex: 1 }} onMouseOver={() => setOnHover(true)}
        onMouseLeave={() => setOnHover(false)}>
        <img

          src={url}
          alt="new"
          className="image"
        // style={{ position: 'absolute', zIndex: 2 }}
        />
        {onHover && userId &&
          <div id="overlay_text" style={{ position: 'absolute', top: '10px', zIndex: 2, }}>
            <div className=''>
              <div className="pl2 pt2 dropdown flex justify-center items-center" >
                <a className="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  +
                </a>
                <ul className="dropdown-menu" style={{ position: 'relative', zIndex: 3 }}>
                  {boards.map((board) => {
                    return (
                      <><li className='h-auto'>
                        <div className="dropdown-item " onClick={() => createBoardEntry({ photoName: url, boardId: board.boardId, userId: userId })}>{board.boardName}</div>
                      </li>
                      </>)
                  })}
                </ul>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
  return (
    <div>
      <NavBarComponent />
      <div className='flex items-center justify-center pb3 pt2'>
        <div className='pr2'>Filter by breed: </div>
        <div className="dropdown">
          <a className="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            {selectedBreed}
          </a>
          <ul className="dropdown-menu overflow-scroll h5" >
            {breedNames.map((breed) => {
              return (
                <><li className='mh2'>
                  <div className="dropdown-item" onClick={() => setSelectedBreed(breed)}>{breed}</div>
                </li>
                </>)
            })}
          </ul>
        </div>
      </div>
      <div className="gallery" style={{ marginLeft: 'auto', marginRight: 'auto', width: '80%' }}>
        {data?.map((imageURL) => renderImage(imageURL))}
      </div>
    </div>
  );
}

export default Random;
