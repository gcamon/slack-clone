import styled from "styled-components"

const InfoBarContainer = styled.div`
    flex: 0.7;
    flex-grow: 1;
    overflow-y: scroll;
    margin-top: 60px;
    padding-bottom: 100px;
`
const InfoBarHeader = styled.div`
  > h2 {
      padding: 10px;
      font-weight: bold;
      text-transform: uppercase;
      font-size: 22px;
      text-align: center;
      
  }
`

const InfoBarBody = styled.div`
  padding: 35px;
  p {
    padding-top: 30px;
    white-space: pre-line;
    line-height: 25px;
    font-weight: 400;
  }


  h4 {
    font-size: 18px;
    padding-top: 10px;
  }

  h5 {
    margin-top: 20px;
    font-size: 16px;
  }

  article {
    white-space: pre-line;
    line-height: 25px;
    font-weight: 400;
  }

  label {
    font-weight: 600;
    display: block;
  }

  input, select {
    padding: 8px;
    margin-top: 7px;
    margin-bottom: 10px;
    width: 95%;
  }

  button {
    padding: 10px 20px;
    cursor: pointer;
    border: none;
  }

`

export { 
    InfoBarContainer,
    InfoBarHeader,
    InfoBarBody
}