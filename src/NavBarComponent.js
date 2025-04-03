import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function NavBarComponent() {
  const token = sessionStorage.getItem('jwtToken');
  const navigate = useNavigate();

  console.log(sessionStorage)
  return (
    <div className='flex pa3'>
      <div className='pr6'>Dogboard</div>
      <div className='pr4'><Link to="/singlephoto">Give me a photo</Link></div>
      <div className='pr4'><Link to="/random">Gallery</Link></div>
      <div><Link to="/boards">Your boards</Link></div>
      {token === null ? <div className='ml-auto'><Link to="/login">Login</Link></div> : <div className='ml-auto'>Profile</div>}
      {token !== null && <div className='ml-auto' onClick={() => {
        sessionStorage.removeItem('jwtToken');
        sessionStorage.removeItem('userId')
      }}>Logout</div>}
    </div>
    // <nav class="navbar navbar-expand-lg navbar-light bg-light">
    //   <a class="navbar-brand" href="#">Dogboard</a>

    //   <div class="collapse navbar-collapse" id="navbarSupportedContent">
    //     <div className='pr4'><Link to="/singlephoto">Give me a photo</Link></div>
    //     <div className='pr4'><Link to="/random">Gallery</Link></div>
    //     <div><Link to="/boards">Your boards</Link></div>
    //     {userId === '' ? <div className='ml-auto pr3'><Link to="/login">Login</Link></div> : <div className='ml-auto pr3'>Profile</div>}
    //   </div>
    // </nav>
  );
}

export default NavBarComponent;