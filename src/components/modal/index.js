import React, {useState, useRef} from 'react';
import ReactDOM from 'react-dom';
import { storage } from "../../firebase"
import LinearWithValueLabel from "../progressBar/LinearProgressWithLabel"
import { ModalBodyContainer } from "./ModalBody.styles"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../firebase';
import firebase from 'firebase';
import { useSelector, useDispatch } from 'react-redux'
import { selectRoomId, reply, setReply } from '../../redux/appSlice'

const Modal = ({ isShowing, hide }) => {
  const [image , setImage] = useState('');
  const [progress,setProgress] = useState(0);
  const [errorMessage,setError] = useState(null);
  let commentRef = useRef(null);
  const [user] = useAuthState(auth);
  const roomId = useSelector(selectRoomId);
  const replyDetails = useSelector(reply)
  const dispatch = useDispatch();
  

  const uploadStatus = (snapshot) => {
    const uploadAmount = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
    //setProgress((prevProgress) => (prevProgress + uploadAmount))
    setProgress((prevProgress) => (prevProgress >= 100 ? 0 : uploadAmount));
  }

  
  const completed = () => {   
    const msg = commentRef.current.value || ""
    storage.ref(`images`).child(`${image.name}`).getDownloadURL()
      .then(
        (url) => {
          //console.log(url);
          if(!replyDetails.isReply){
            db.collection("rooms").doc(roomId).collection("messages").add({
              message: msg,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              user: user?.displayName,
              userImage: user?.photoURL,
              files:url,
              fileName: image.name,
              replies: [],
            })
          } else {
            const comment = {
              message: msg,
              timestamp: + new Date(),
              user: user?.displayName,
              userImage: user?.photoURL,
              files:url,
              fileName: image.name,
            }   
            
            db.collection("rooms").doc(roomId).collection("messages").doc(replyDetails.messageId).update({
              replies: [...replyDetails.replies, comment ],
            })
  
            dispatch(setReply({
                isReply: false,
            }))
          }
    
        },
        (error) => {
          // failed to get download URL
          console.log(error);
        }
      );

      hide();
  }

  const error = (err) => {    
    setError(() => err)
  }

  const upload = () => {
    if(!image){
      alert("No file selected! Please choose a file")
      return;
    }
      
    storage.ref(`/images/${image.name}`).put(image)
    .on("state_changed" , uploadStatus , error, completed);
  }

  return (
    isShowing ? ReactDOM.createPortal(
      <React.Fragment>
        <div className="modal-overlay"/>
        <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
          <div className="modal">
            <div className="modal-header">
              <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <ModalBodyContainer>              
              <center>
                <LinearWithValueLabel value={progress} error={errorMessage}/>
                <div>
                  <label>
                    <input type="file"  
                  onChange={(e)=>{setImage(e.target.files[0])}}/>
                    { image.name || "Select a file"}
                  </label>
                </div>
                <div>
                    <textarea placeholder="Write a comment (optional)" ref={commentRef} ></textarea>
                </div>                
                <div>
                  { image.name && <button onClick={upload}><CloudUploadIcon></CloudUploadIcon> &nbsp;Upload</button> }
                </div>
              
              </center>              
            </ModalBodyContainer>
          </div>
        </div>
      </React.Fragment>, document.body
    ) : null
  )
}
  
export default Modal;