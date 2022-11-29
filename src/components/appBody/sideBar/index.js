import React from 'react'
import { SideBarContainer, SideBarHeader, SideBarInfo } from "./SideBar.styles"
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CreateIcon from '@mui/icons-material/Create';
import SideBarOption from "./sideBarOption"
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
//import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AppsIcon from '@mui/icons-material/Apps';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import AddIcon from '@mui/icons-material/Add';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { db } from "../../../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase';

const SideBar = () => {
    const [channels] = useCollection(db.collection("rooms"));
    const [user] = useAuthState(auth);

    /*
        <SideBarOption Icon={DraftsIcon} title="Contact me" path="/contact"/>
            <SideBarOption Icon={BookmarkBorderIcon} title="Portfolio" path="/portfolio"/>            
            <SideBarOption Icon={AppsIcon} title="Other apps" path="/other-apps"/>
            <SideBarOption Icon={FileCopyIcon} title="Download source code" path="/downloads"/>
            <SideBarOption Icon={ExpandLessIcon} title="Show less" path=""/>

            <SideBarOption Icon={InsertCommentIcon} title="About ESUT Alumni" path="/about-me"/>

            <CreateIcon />
    */
    return (        
        <SideBarContainer>
            <SideBarHeader>
                <SideBarInfo>
                    <h2>ESUT Alumni Relations</h2>
                    <h3 style={{flexDirection:"row",alignItems:"center",justifyContent:"flex-start"}}>
                        <FiberManualRecordIcon/>
                        <span style={{marginLeft: "5px"}}>{user?.displayName}</span>
                    </h3>
                </SideBarInfo>
                
            </SideBarHeader>
            
            <SideBarOption Icon={InboxIcon} title="Alumni Relations Office" path="/alumni relations office"/>
            <hr/>

            <SideBarOption Icon={InboxIcon} title="Our Policy" path="/our policy"/>

            <hr/>

            <SideBarOption Icon={InboxIcon} title="Give to ESUT" path="/give to ESUT"/>

            <hr/>

            <SideBarOption Icon={InboxIcon} title="Donations" path="/donations"/>

            
            <hr/>
            <SideBarOption Icon={ExpandMoreIcon} title="Channels" path=""/>
            <hr/>           
            <SideBarOption Icon={AddIcon} addChannelOption title="Add Channel" path=""/>
            {channels?.docs.map((doc) => (
                !doc.data().email && <SideBarOption 
                    key={doc.id} 
                    id={doc.id} 
                    title={doc.data().name} 
                    path="/"
                />
            ))}
            <hr/>
            <SideBarOption Icon={DraftsIcon} title="Direct Messages" path=""/>
            <hr/>
            {channels?.docs.map((doc) => (
                doc.data().email && <SideBarOption
                    key={doc.id} 
                    id={doc.id} 
                    title={doc.data().name} 
                    path="/"
                    email={doc.data().email}
                    userImage={doc.data().photoURL}
                />
            ))}
           
        </SideBarContainer>            
    )
}

export default SideBar
