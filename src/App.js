import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Random from "./pages/random";
import SinglePhoto from "./pages/SinglePhoto";
import Login from "./pages/login";
import Register from "./pages/register";
import Boards from "./pages/boards";
import SingleBoard from "./pages/singleBoard";
import NavBarComponent from "./NavBarComponent";
import { store } from './state/store';
import React from 'react';
import { Provider } from 'react-redux';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          {/* <Route index element={<Home />} /> */}
          <Route path="singlephoto" element={<Provider store={store}>
            <SinglePhoto />          </Provider>} />
          <Route path="random" element={<Provider store={store}>
            <Random />
          </Provider>} />
          <Route path="login" element={<Provider store={store}>
            <Login />
          </Provider>} />
          <Route path="register" element={<Provider store={store}>
            <Register />
          </Provider>} />
          <Route path="boards" element={<Provider store={store}>
            <Boards />
          </Provider>} />
          <Route path="board/:id" element={<Provider store={store}>
            <SingleBoard />
          </Provider>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     {/* <Provider store={store}> */}
//     <App />
//     {/* </Provider> */}
//   </React.StrictMode>
// );