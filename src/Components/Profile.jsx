import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import UpdateProfile from './UpdateProfile';

const Profile = () => {
   const user = useSelector((store) => store.User);
  
  return (
    user && (<div>
     <UpdateProfile user={user}/>
    </div>)
  );
}

export default Profile