import styled from "styled-components"

const LoginContainer = styled.div`
    background-color: #f8f8f8;
    height: 100vh;
    display: grid;
    place-items: center;
    color: gray;
    text-shadow: 1px 2px 3px #eee;
`
const LoginInnerContainer = styled.div`
    padding: 100px;
    text-align: center;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0,0,0,0.24);
   > img {
       object-fit: contain;
       height: 100px;
       margin-bottom: 40px;
   }

   > button {
       margin-top: 20px;
       text-transform: inherit!important;
       background-color: gray!important;
       color: white;
   }
`

export {
    LoginContainer,
    LoginInnerContainer
}