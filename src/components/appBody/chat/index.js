import React, { useRef, useEffect } from 'react'
import { StarBorderOutlined, InfoOutlined } from '@mui/icons-material'
import { ChatContainer, Header, HeaderLeft, HeaderRight, ChatMessages, ChatBottom} from "./Chat.styles"
import { useSelector } from 'react-redux'
import { selectRoomId } from '../../../redux/appSlice'
import ChatInput from "../chatInput"
import { useDocument, useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../../firebase"
import Message  from "../message"


const Chat = () => {
    const roomId = useSelector(selectRoomId)

    const chatBottomRef = useRef(null);

    const [roomDetails] = useDocument(
        roomId && db.collection('rooms').doc(roomId)
    )

    const [roomMessages, loading] = useCollection(
        roomId && 
            db
                .collection('rooms')
                .doc(roomId)
                .collection('messages')
                .orderBy('timestamp', 'asc')
    )

    useEffect(() => {
        chatBottomRef?.current?.scrollIntoView({
            behavior:'smooth'
        });
    },[roomId, loading, roomMessages])

    return (
        <ChatContainer>
            {roomDetails && roomMessages && 
                <>
                    <Header>
                        <HeaderLeft>
                            <h4><strong># {roomDetails?.data().name}</strong></h4>
                            <StarBorderOutlined/>
                        </HeaderLeft>
                        <HeaderRight>
                            <p>
                                <InfoOutlined/> Details
                            </p>
                        </HeaderRight>
                    </Header>
                 
                    <ChatMessages>
                        {roomMessages?.docs.map(doc => {
                            const {message, timestamp, user, userImage, files, fileName, replies} = doc.data()
    
                            return (
                                <Message
                                    key={doc.id}
                                    id={doc.id}
                                    message={message}
                                    timestamp={timestamp}
                                    user={user}
                                    userImage={userImage}
                                    files={files}
                                    fileName={fileName}
                                    replies={replies}
                                />
                            )
                        })}
                    </ChatMessages>
                    <ChatBottom ref={chatBottomRef}/>
                    <ChatInput 
                        channelId={roomId} 
                        channelName={roomDetails?.data().name}
                    />
                </>
            }
           
        </ChatContainer>
    )

}

export default Chat
