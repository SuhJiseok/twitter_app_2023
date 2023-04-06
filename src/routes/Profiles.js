import React, { useEffect, useState } from 'react'
import { authService, db } from 'fbase';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import {async} from "@firebase/util";
import { updateProfile } from '@firebase/auth';
import Tweet from 'component/Tweet';
import "styles/profile.scss"
// 여기에 로그아웃해주는것
function Profiles({userObj}) {
  const [tweets, setTweets] = useState([]);
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const navigate = useNavigate();
  const onLogOutClick = () => {
    authService.signOut();
    navigate('/'); //첫화면으로 이동 즉 리다이렉트 기능이다.
  }

  useEffect(() => {
    const q = query(collection(db, "tweets"), 
              where("creatorId", "==", userObj.uid),
              orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newArray = [];
      querySnapshot.forEach((doc) => {
        newArray.push({...doc.data(), id:doc.id});
        console.log(newArray);
      });
      setTweets(newArray);
    });
  },[]);

  const onSubmit = async (e) =>{
  e.preventDefault();
  if (userObj.dispalyName !== newDisplayName) {
  await updateProfile(userObj,{displayName:newDisplayName,
                              //  photoURL:
                              });
}
  };


  const onChange = (e) => {
 const {target: {value}} =e;
 setNewDisplayName(value);
  };



  return (
    <div className='container'>
    <form onSubmit={onSubmit} className='profileForm'>
      <input type='text' onChange={onChange} value={newDisplayName} placeholder='Display name' className='formInput' />
      <input type='submit' value='Update Profile' className='formBtn'/>
     </form>
    <span onClick={onLogOutClick} className='formBtn cancelBtn logOut'>Log Out</span>
    <div>
    {tweets.map(tweet => (
        <Tweet key={tweet.id} tweetObj={tweet} isOwner={tweet.creatorId === userObj.uid} />
      ))}
    </div>
    </div>
    
  )
}

export default Profiles