import styled from "styled-components"

const ModalBodyContainer = styled.div`
    margin-top: 20px;

    div {
        margin-top: 30px;
    }

    input[type="file"] {
        position: fixed;
        right: 100%;
        bottom: 100%;
    }

    button {
        display: flex;
        align-items: center;
        padding: 5px 10x;
        border: none;
        background-color: green;
        color: #fff;
        border-radius: 5px;
        font-size: 14px;
        cursor: pointer;
    }

    label {
        border: 1px solid #ccc;
        display: inline-block;
        padding: 6px 12px;
        width: 320px;
        border-radius: 5px;
        height: auto;
        cursor: pointer;
    }

    textarea {
        border: 1px solid #ccc;
        display: inline-block;
        padding: 6px 12px;
        width: 320px;
        height: 100px;
        border-radius: 5px;
    }
`

export { ModalBodyContainer }