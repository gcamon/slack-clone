import styled from "styled-components"

const AppBody = styled.div`
    display: flex;
    height: 100vh;
`

const AppLoading = styled.div`
    display: grid;
    place-items: center;
    height: 100vh;
    width: 80%;
`

const AppLoadingContents = styled.div`
    text-align: center;
    padding: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > img {
        height: 100px;
        padding:20px;
        margin-bottom: 40px;
    }

    > p {
        margin-top: 80px;
        font-weight: bold;
    }
`
export  { AppBody, AppLoading, AppLoadingContents }