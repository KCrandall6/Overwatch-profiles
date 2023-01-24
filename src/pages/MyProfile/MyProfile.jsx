import React, {useState, useEffect} from 'react';
import Cookies from 'js-cookie';
import { Dropdown } from 'react-bootstrap';
import ProfileCard from './ProfileCard';

const MyProfile = () => {

  const [profiles, setProfiles] = useState([]);
  const [fav, setFav] = useState('')

  useEffect(() => {
    const favCookie = getCookie('user');
    if (favCookie) {
      setFav(favCookie);
    }
    const players = getCookie('profiles');
    const playersArray = players.split(',');
    setProfiles(playersArray)
  }, [])

  const setCookie = (name, value) => {
    Cookies.set(name, value);
  };
  const getCookie = (name) => {
    return Cookies.get(name);
  }

  if (!fav) {
    return (
      <div className='d-flex flex-column align-items-center justify-content-center text-center ps-4 pe-4'>
        <p className='pt-5'>It look's like you haven't selected your profile yet, select your profile from the menu</p>
        <Dropdown>
          <Dropdown.Toggle style={{ color:"black", backgroundColor: "#F99B12", border: "none"}} id="dropdown-basic">
          Select Profile
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {profiles.map((name) => {
              let index = name.lastIndexOf('-');
              let shortenedName = name.substring(0, index);
              return (
                <Dropdown.Item className='text-center' key={name} onClick={() => {
                  setFav(name);
                  setCookie('user', name);
                }}>{shortenedName}</Dropdown.Item>
              )
            })}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    )
  }

  else {
    return (
      <div>
        <ProfileCard fav={fav}/>
      </div>
    )
  }
};

export default MyProfile;