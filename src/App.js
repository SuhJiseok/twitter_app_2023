import { useEffect, useState } from "react";
import AppRouter from "Router";
import { authService } from "fbase";
import { onAuthStateChanged } from "firebase/auth";
import'styles/Index.scss';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons'
library.add(fas, faTwitter, faGoogle, faGithub)
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { fas } from '@fortawesome/free-solid-svg-icons'
// import { faTwitter, faFontAwesome } from '@fortawesome/free-brands-svg-icons'



function App() {
  const [init, setInit] = useState(false);
  const [isLoggeIn, setIsLoggedIn] = useState(false);
  //  const [isLoggeIn, setIsLoggedIn] = useState(authService.currentUser);
  console.log('authService.currentUser->',authService.currentUser); //currentUser는 현재 로그인을 한 사람

  const [userObj, setuserObj] = useState(null);

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      console.log('user ->', user);
      if (user) {
        setIsLoggedIn(user);
        setuserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  },[]);


  return (
    <>
    {init ? ( 
    <AppRouter isLoggeIn={isLoggeIn} userObj={userObj} />
    ) : (
      "inittializing..."
      )}
   
    <footer>&copy; {new Date().getFullYear()} Twitter app</footer>
  </>
    
  );
}

export default App;
