import React from 'react'
import { SideBarOptionContainer, SideBarOptionChannel } from "./SideBarOption.styles"
import { db } from "../../../../firebase"
import { useDispatch } from 'react-redux'
import { enterRoom } from '../../../../redux/appSlice'
import { Link } from "react-router-dom"

const SideBarOption = ({Icon, title, path, addChannelOption, id, email, userImage}) => {
    const dispatch = useDispatch();
    
    const addChannel = () => {
        const channelName = prompt("Please enter channel name")
        if(channelName){
            db.collection('rooms').add({
                name: channelName
            })
        }

    }
    
    const selectedChannel = () => {
        if(id) {
            dispatch(enterRoom({
                roomId: id
            }))
        }
    }

    return (
        <SideBarOptionContainer
            onClick={addChannelOption ? addChannel : selectedChannel}
        >
            {Icon && <Icon fontSize="small" style={{padding: 10}} />}
            {Icon ? (
                <h3>
                    <Link to={path} style={{width:"250px",display:"block",padding: "5px 0"}}>{title}</Link>
                </h3>
            ) : email ? 
                (
                <SideBarOptionChannel>                    
                    <div>
                        <img src={userImage} alt={title}/> 
                        <Link to={path} title={title} style={{width:"250px"}}> {title}</Link>
                    </div>
                </SideBarOptionChannel> 
                )
                : (
                <SideBarOptionChannel>                    
                    <span>#</span> <Link to={path} title={title}  style={{width:"250px"}}> {title}</Link>
                </SideBarOptionChannel>
            )}
        </SideBarOptionContainer>
    )
}

export default SideBarOption
