import styled from "styled-components"

const ChatContainer = styled.div`
    flex: 0.7;
    flex-grow: 1;
    overflow-y: scroll;
    margin-top: 60px;
    padding-bottom: 120px;
`

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
    box-shadow: 3px 2px 2px lightgray
`

const HeaderLeft = styled.div`
    display: flex;
    align-items: center;

    > h4 {
        display: flex;
        text-transform: lowercase;
        margin-right: 10px;
    }

    > h4 > .MuiSvgIcon-root {
       margin-left: 10px;
       font-size: 18px;
    }
`

const HeaderRight = styled.div`
    > p {
        display: flex;
        align-items: center;
        font-size: 14px;
    }

    > p > .MuiSvgIcon-root {
        margin-right: 5px !important;
        font-size: 18px;
    }
    
`

const ChatMessages = styled.div`  
`

const ChatBottom = styled.div` 
    
`

export { ChatContainer, Header, HeaderLeft, HeaderRight, ChatMessages, ChatBottom}