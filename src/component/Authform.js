import React, { useState } from 'react'
import { authService } from 'fbase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,} from "firebase/auth";
import'styles/authForm.scss';

function Authform() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true); //true회원가입, false로그인
  const [error, setError] = useState(''); //에러 메시지를 담는 공간

  const onChange = (e) => {
    console.log('e.target.name->',e.target.name);
    console.log(e);
    const {target:{name, value}} = e;
    if(name === 'email'){
    setEmail(value);
    }else if(name === 'password'){
    setPassword(value);
    }
    }

    const onSubmit = async(e) => {
      e.preventDefault();
      try {
        let data;
        if(newAccount){
          //true 회원가입
          data = await createUserWithEmailAndPassword(authService, email, password);
         }else{
          //false 로그인
          data = await signInWithEmailAndPassword(authService, email, password);
         }
         console.log('data->',data);
      } catch (error) {
        console.log('error->',error);
        setError(error.message);
        
      }
    }
    const toggleAccount = () => setNewAccount(prev => !prev);

  return (
    <>
        <form onSubmit={onSubmit} className='container'>
        <input name='email' type='email' placeholder='Email' required value={email} onChange={onChange} className='authInput' />

        <input name= "password" type='password' placeholder='Password' required value={password} onChange={onChange} className='authInput'/>

        <input type='submit' className='authInput authSubmit'
        value={newAccount ? "Create Account" : "Log in"} />
        {error && <span className='authError'>{error}</span>}
      </form>

      <span onClick={toggleAccount} className='authSwitch'>
        {newAccount ? "Sing In" : "Create Account"}
      </span>
    </>
  )
}

export default Authform