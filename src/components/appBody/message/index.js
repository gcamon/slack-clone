import React from 'react'
import { MessageContainer, MessageInfo, ReplyContainer, ReplyHeader } from "./Message.styles"
import dateFormat, { masks } from "dateformat";
import { enterRoom, setReply } from '../../../redux/appSlice';
import { reply } from '../../../redux/appSlice'
import { useDispatch, useSelector } from 'react-redux'; 
import { useCollection } from 'react-firebase-hooks/firestore'
import { db } from '../../../firebase'
import  fileIcon from "../../../images/file1.jpg" 
import pdf from "../../../images/pdf2.png"
import docx from "../../../images/word3.png"
import csv from "../../../images/csv6.png"
//import { Link } from "react-router-dom"
//import { blue } from '@mui/material/colors';
//import { fontWeight } from '@mui/system';


const Message = ({ message, timestamp, user, userImage, id, files, fileName,replies }) => {
    const dispatch = useDispatch();
    const [channels] = useCollection(db.collection("rooms"));
    const replyDetails = useSelector(reply)
    const msgSplit = message.split(" ")//.match(/.?\w+/g)
    let count = 0;
    const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    

    const selectedChannel = (word) => {
        channels?.docs.map((doc) => {
            if(( "@" + doc.data().username) === word){          
                dispatch(enterRoom({
                    roomId: doc.id
                }))
                
            }
        })
      
    }

    const addReply = (messageId) => {
        if(!replyDetails.isReply) {
            dispatch(setReply({
                isReply: true,
                messageId: messageId,
                user: user,
                replies: replies,
            }))
        } else {
            dispatch(setReply({
                isReply: false,
            }))
        }
    }
    
    return (
        <>
        <MessageContainer>
            <img src={userImage} alt="User profile image" />
            <MessageInfo>
                <h4>
                    {user} {' '}
                    <span>
                        {(timestamp) ? dateFormat(new Date(timestamp?.toDate()), "DDDD, mmm dS, yyyy, h:MM TT") : ""}
                    </span>
                    <i onClick={() => addReply(id)} 
                    style={{backgroundColor:(replyDetails.messageId ===  id && replyDetails.isReply 
                        ? "gray": "#eee"),color: (replyDetails.messageId ===  id && replyDetails.isReply 
                            ? "#fff": "gray")}}>Reply</i>
                </h4>
                <p>
                    {
                       
                       files && (files.indexOf('.png') !== -1 || files.indexOf('.jpg') != -1 || files.indexOf('.jpeg') != -1) ?
                       <a href={files} target="_blank" download><img src={files} alt={fileName}/> <br/><em>
                           {fileName}</em></a> : <></>
                        
                    }

                    { 
                        files && (files.indexOf('.pdf') !== -1) ? 
                        <a href={files} target="_blank" download><img src={pdf} alt={fileName}/> <br/><em>
                        {fileName}</em></a>: <></>
                    }

                    { 
                        files && (files.indexOf('.docx') !== -1) ? 
                        <a href={files} target="_blank" download><img src={docx} alt={fileName}/> <br/><em>
                        {fileName}</em></a>: <></>
                    }

                    { 
                        files && (files.indexOf('.csv') !== -1 || files.indexOf('.xls') != -1 ) ? 
                        <a href={files} target="_blank" download><img src={csv} alt={fileName}/> <br/><em>
                        {fileName}</em></a>: <></>
                    }

                    {
                       
                       files && (files.indexOf('.png') === -1 
                        && files.indexOf('.jpg') === -1 
                        && files.indexOf('.jpeg') === -1
                        && files.indexOf('.csv') === -1 
                        && files.indexOf('.xls') === -1
                        && files.indexOf('.docx') === -1
                        && files.indexOf('.pdf') === -1) ?
                       <a href={files} target="_blank" download><img src={fileIcon} alt={fileName}/> <br/><em>
                       {fileName}</em></a> : <></>
                        
                    }

                    {msgSplit && msgSplit.map((word) => {
                        if(/@/.test(word)) {
                            return <span onClick={() => selectedChannel(word)} id={word} key={count++}>{word}</span>
                        //checks to see if text is a valid url and returns a link else the actual text
                        } else if(urlRegex.test(word)){
                            return <a href={word} target="_blank">&nbsp;{word}&nbsp;</a>
                        } else {
                            return word + " ";                            
                        }
                    })}
                </p>                
            </MessageInfo>
        </MessageContainer>
        {replies && replies.length > 0 && <ReplyHeader>Replies</ReplyHeader>}
        {replies && replies.map((reply) => 
            <ReplyContainer>
                <img src={reply.userImage} alt="User profile image" />
                <MessageInfo>
                <h4>
                    {reply.user} {' '}
                    <span>
                        {(reply.timestamp) ? dateFormat(new Date(reply.timestamp), "DDDD, mmm dS, yyyy, h:MM TT") : ""}
                    </span>
                </h4>
                <p>  
                    {
                       
                       reply.files && (reply.files.indexOf('.png') !== -1 || reply.files.indexOf('.jpg') != -1 || reply.files.indexOf('.jpeg') != -1) ?
                       <a href={reply.files} target="_blank" download>
                           <img src={reply.files} alt={reply.fileName}/> <br/><em>
                           {reply.fileName}</em></a> : <></>
                        
                    }

                    { 
                        reply.files && (reply.files.indexOf('.pdf') !== -1) ? 
                        <a href={reply.files} target="_blank" download>
                            <img src={pdf} alt={reply.fileName}/> <br/><em>
                           {reply.fileName}</em></a>: <></>
                    }

                    { 
                        reply.files && (reply.files.indexOf('.docx') !== -1) ? 
                        <a href={reply.files} target="_blank" download>
                            <img src={docx} alt={reply.fileName}/> <br/><em>
                           {reply.fileName}</em></a>: <></>
                    }

                    { 
                        reply.files && (reply.files.indexOf('.csv') !== -1 || reply.files.indexOf('.xls') != -1 ) ? 
                        <a href={reply.files} target="_blank" download>
                            <img src={csv} alt={reply.fileName}/> <br/><em>
                           {reply.fileName}</em></a>: <></>
                    }

                    {
                       
                       reply.files && (reply.files.indexOf('.png') === -1 
                        && reply.files.indexOf('.jpg') === -1 
                        && reply.files.indexOf('.jpeg') === -1
                        && reply.files.indexOf('.csv') === -1 
                        && reply.files.indexOf('.xls') === -1
                        && reply.files.indexOf('.docx') === -1
                        && reply.files.indexOf('.pdf') === -1) ?
                       <a href={reply.files} target="_blank" download>
                           <img src={fileIcon} alt={reply.fileName}/> <br/><em>
                           {reply.fileName}</em></a> : <></>
                        
                    }                 
                    {reply.message && reply.message.split(" ").map((text) => {
                        if(/@/.test(text)) {
                            return <span onClick={() => selectedChannel(text)} id={text} key={count++}>{text}</span>
                        //checks to see if text is a valid url and returns a link else the actual text
                        } else if(urlRegex.test(text)){
                            return <a href={text} target="_blank">&nbsp;{text}&nbsp;</a>
                        } else {
                            return text + " ";                            
                        }
                    })}
                </p>                
                </MessageInfo>
            </ReplyContainer>
        )}

        </>
    )
}

export default Message
