import styled from "styled-components"


const ChatInputContainer = styled.div`
    border-radius: 20px;   
    position: relative;
    
    > form {
       display: flex;
       justify-content: center;      
       position: fixed;
       bottom: 50px;
       width: 73%;
       right: 40px;
       background-color: white;
    } 

    > form > textarea {       
        width: 100%;
        border: 1px solid gray;
        border-radius: 3px;
        padding: 15px 20px;
        outline: none;
        font-family: inherit!important;
        line-height: 25px;
        font-size: 16px!important;
        resize: none;
        z-index: 99!important;
    }

    .menu {
        background-color: #f3f3f3;
        left: 10px;
        width: 200px;
        bottom: 57px;
        position: absolute;
        z-index: 999;
        background: #fff;
       
    }
    
    .menu-item {
        cursor: default;
        padding: 1rem;
    }
    
    .menu-item.selected {
        background-color: slateGray;
        color: white;
    }
    
    .menu-item:hover:not(.selected) {
        background-color: #fafafa;
    }

    > div {
        position: relative;
        display: flex;
        justify-content: right;      
        position: fixed;
        bottom: 0px;
        width: 72.87%;
        right: 40px;
        background-color: white;
        border-top: 1px solid #eee;
        border-left: 1px solid gray;
        border-right: 1px solid gray;
        border-bottom: 1px solid gray;
        height: 45px;
        padding-bottom: 5px;
        border-radius: 3px;
    }

    > div > button {
        background-color: #fff;
        border: none;
        outline: none;
        color: gray;
        cursor: pointer;
        margin-right: 5px;
    }
    
`
export { ChatInputContainer }