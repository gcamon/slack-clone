import styled from "styled-components"

const SideBarOptionContainer = styled.div`
    display: flex;
    font-size: 12px;
    align-items: center;
    padding-left: 2px;
    cursor: pointer;
    white-space: nowrap;
    
    :hover {
        opacity: 0.9;
        background-color: #350d36;
    }

    > h3 {
        font-weight: 500;
    }

    > h3 > span {
        padding: 15px
    }

    > h3 > a {
        color: white!important;
        text-decoration: none!important;
    }

    img {
        height: 40px;
        border-radius: 40px;
        margin-left: 10px;
    }
`

const SideBarOptionChannel = styled.h3`
    padding: 8px 0;
    font-weight: 300;

    > div {
        display: flex;
        align-items: center;
        padding-bottom:
    }

    > div > a {
        color: white!important;
        text-decoration: none!important;
        padding: 10px;
    }

`

export { 
    SideBarOptionContainer,
    SideBarOptionChannel,
}