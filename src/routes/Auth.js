import React from 'react'
import { authService } from 'fbase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { async } from '@firebase/util';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Authform from 'component/Authform';
import'styles/auth.scss';



function Auth() {
 
  const onSocialClick = async (e) =>{
    console.log('e.target.name->',e.target.name);
    const {target:{name}} = e;
    let provider;
    if(name === "google"){
      provider = new GoogleAuthProvider();
    }else if(name === "github"){
      provider = new GithubAuthProvider();
    }
    const data = await signInWithPopup(authService,provider);
    console.log('data ->',data);
  }

   return (
    <div className='authContainer'>
      <FontAwesomeIcon icon="fa-brands fa-twitter" size='3x' color={"#04AAFF"} style={{marginBottom:30}} />

      <Authform/>

      <div className='authBtns'>
        <button onClick={onSocialClick} name="google" className='authBtn'>Continue width Google</button>
        <button onClick={onSocialClick} name="github"
        className='authBtn'>Continue width Github</button>
      </div>
    </div>
  )
}

export default Auth