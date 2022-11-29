import styled from "styled-components"
import { Avatar } from "@mui/material/"
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SearchIcon from '@mui/icons-material/Search';
//import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LogoutIcon from '@mui/icons-material/Logout';

const HeaderContainer = styled.div`
    display: flex;
    position: fixed;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    padding:6px 0;
    background-color: var(--navbar-color);
    color: #fff;
`
const HeaderLeft = styled.div`
    flex: 0.24;
    display: flex;
    align-items: center;

    > .MuiSvgIcon-root {
        margin-left: auto;
        margin-right: 30px;
    }
`
const HeaderRight = styled.div`
    flex: 0.3;
    display: flex;
    align-items: flex-end;

    > .MuiSvgIcon-root {
        margin-left: auto;
        margin-right: 20px;
    }
`

const HeaderSearch = styled.div`
    flex: 0.4;
    opacity: 1;
    border-radius; 6px;
    background-color: #421f44;
    text-align: center;
    display:flex;
    padding: 0 50px;
    color: grey;
    border: 1px grey solid;

    > input {
        background-color: transparent;
        border: none;
        text-align: center;
        min-width: 30vw;
        outline: 0;
        color: white;
    }
`
const HeaderAvatar = styled(Avatar)`
    cursor:pointer;
    margin-left: 10px;

    :hover {
        opacity: 0.8;
    }
`

const HeaderLogOut = styled(LogoutIcon)`
    cursor:pointer;

    :hover {
        opacity: 0.8;
    }
`

const HeaderSearchIcon = styled(SearchIcon)`
   
`
export { 
    HeaderContainer,
    HeaderLeft,
    HeaderRight,
    HeaderAvatar,
    AccessTimeIcon,
    HeaderSearch,
    HeaderSearchIcon,
    HeaderLogOut,
}