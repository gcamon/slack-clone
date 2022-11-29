import styled from "styled-components"

const MessageContainer = styled.div`
    display: flex;
    align-item: center;
    padding-left: 15px;
    margin-top: 20px;

    > img {
        height: 50px;
        border-radius: 50px;
    }
`
const MessageInfo = styled.div`
    padding-left: 20px;

    > h4 {
        position: relative;
    }

    > h4 > span {
        color: gray;
        font-weight: 300;
        margin-left: 4px;
        font-size: 12px;
    }

    > h4 > i {
        font-weight: 300;
        font-size: 14px;
        padding: 1px 5px;
        border-radius: 4px;
        background-color: #eee;
        margin-left: 20px;
        color: gray;
        cursor: pointer;

    }

    > p > a {
        text-decoration: none;
    }

    > p {
        display: flex;
        align-items: top;
        word-break: break-word;
        padding-right: 20px;
    }

    > p > span {
        color: blue;
        cursor: pointer;
        font-weight: bold;
        display: inline-block;
        padding: 2px 5px;
        margin: 0px 5px;
        background-color: #eee;
        border-radius: 2px;
    }

    em {
        font-size: 14px;
    }

    > p > div {
        display: inline-block;
    }

    img {
        width: 75px;
        height: auto;
        object-fit: contain;
        margin-top: 6px;
        padding-right: 10px;
        
    }

`
const ReplyContainer = styled.div`
    display: flex;
    align-item: center;
    padding-left: 15px;
    margin-top: 20px;
    margin-left: 75px;

    > img {
        height: 40px;
        border-radius: 50px;
    }
`

const ReplyHeader = styled.h4`
  font-weight: 300;
  font-size: 16px;
  color: gray;
  margin-left: 80px;
  margin-top: 5px;
  padding: 4px;
`

export {
    MessageContainer,
    MessageInfo,
    ReplyContainer,
    ReplyHeader
}

