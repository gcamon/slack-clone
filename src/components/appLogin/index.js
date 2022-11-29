import React from 'react'
import { LoginContainer, LoginInnerContainer } from "./Login.styles"
import { Button } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { auth, googleProvider, facebookProvider, db } from '../../firebase'

const Login = () => {
    const signInGoogle = (e) => {
        e.preventDefault();
        auth.signInWithPopup(googleProvider)
        .then(result => {
            addUser(result.user)
        })
        .catch(err => alert(err.message))
    }

    const signInFacebook = (e) => {
        e.preventDefault();
        auth.signInWithPopup(facebookProvider).catch(err => alert(err.message))
    }

    const addUser = (user) => {
        console.log(user)
        if(user){
           // var userRef = db.collection("users");
            //const query = userRef.where("email", "==", user.email);
            //console.log(query)

            db.collection("users").where("email", "==", user.email)
            .get()
            .then((querySnapshot) => {                
                if(querySnapshot.size === 0){
                    const username = getUserName(user.displayName)
                    db.collection('users').add({
                        displayName: user.displayName,
                        email: user.email,
                        photoURL: user.photoURL,
                        username: username,
                        created: new Date()
                    })

                    db.collection('rooms').add({
                        name: user.displayName,
                        email: user.email,
                        photoURL: user.photoURL,
                        username: username,
                    })
                }
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });

           
        }
    }

    const getUserName = (name) => {
        let random = name.replace(/\s/g, "_")
        const possible = "11112222333344444555566667777888899990000";

        for(let i = 0; i < 4; i++) 
            random += possible.charAt(Math.floor(Math.random() * possible.length))

        return random;
    }

    //https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/1200px-Slack_icon_2019.svg.png

    return (
       <LoginContainer>
            <LoginInnerContainer>
                <img
                    src="https://esut.edu.ng/wp-content/themes/esut/assets/images/esut_logo.png"
                    alt="ESUT logo"
                />
                <h1>Alumni Platform</h1>
               
                <Button type="submit" onClick={signInGoogle}>
                    <GoogleIcon/> Sign in with google
                </Button>
                <br/>
                <Button type="submit" onClick={signInFacebook}>
                    <FacebookIcon/> Sign in with Facebook
                </Button>
                
            </LoginInnerContainer>
       </LoginContainer>
    )
}

export default Login
