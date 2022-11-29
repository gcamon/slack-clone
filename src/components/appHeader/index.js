import React from 'react'
import { 
    HeaderContainer, 
    HeaderLeft, 
    HeaderRight, 
    HeaderAvatar, 
    AccessTimeIcon,  
    HeaderSearch,
    HeaderSearchIcon,
    HeaderLogOut,
} from './Header.styles'
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from '../../firebase'

const Header = () => {
    const [user] = useAuthState(auth)
    return (
        <div>
            <HeaderContainer>                
                <HeaderLeft>
                   <HeaderAvatar
                    src={user?.photoURL}
                    alt={user?.displayName}
                   />
                   {/*<AccessTimeIcon/>*/}
                </HeaderLeft>
                <HeaderSearch>                   
                    <input type="text" placeholder="Search" />
                   
                </HeaderSearch>
                <HeaderRight>
                    <HeaderLogOut
                        onClick={() => auth.signOut()}
                    />
                </HeaderRight>
            </HeaderContainer>
        </div>
    )
}

// <HeaderSearchIcon />

export default Header
