import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Link,
  Route
} from "react-router-dom"
import Header from "./components/appHeader"
import { AppBody, AppLoading, AppLoadingContents }  from "./components/appBody/AppBody.styles"
import SideBar from "./components/appBody/sideBar"
import Chat from "./components/appBody/chat"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "./firebase"
import Login from "./components/appLogin"
import Spinner from "react-spinkit"
import InfoBar from "./components/appBody/infoBar"

function App() {
  const [user,loading] = useAuthState(auth);
  
  if(loading){
    return (
      <AppLoading>
          <AppLoadingContents>
            <img
                src="https://esut.edu.ng/wp-content/themes/esut/assets/images/esut_logo.png"
                alt=""
            />
            <Spinner 
              name="ball-spin-fade-loader"
              color="orange"
              fading="none"
            />
            <p>Loading... Please wait!</p>
          </AppLoadingContents>
      </AppLoading>
    )
  }

  
  return (
    <div className="app">
      {!user ? (
        <Login/>
      ) : (
        <>
          <Header/>
          <AppBody>
            <Router>  
              <SideBar/>     
              <Routes>
                <Route path="/" exact element={<Chat/>}>            
                </Route>
                <Route path="/:id" exact element={<InfoBar/>}>                
                </Route>               
              </Routes>       
            </Router>
          </AppBody>
        </>
      )}
    </div>
  );
}

export default App;


