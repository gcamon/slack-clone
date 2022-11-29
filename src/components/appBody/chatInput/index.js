import React, { useRef, useEffect } from 'react'
//import { Button } from '@mui/material'
import { ChatInputContainer } from './ChatInput.styles'
//import { db } from "../../../firebase"
import firebase from "firebase"
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../../firebase'
import TextareaAutosize from 'react-textarea-autosize'
import SendIcon from '@mui/icons-material/Send'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import CancelIcon from '@mui/icons-material/Cancel';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import { useCollection } from 'react-firebase-hooks/firestore'
import useModal from "../../../customHooks/useModal"
import Modal from "../../modal"
import { useSelector, useDispatch } from 'react-redux'
import { selectRoomId, reply, setReply } from '../../../redux/appSlice'


const ChatInput = ({ channelName, channelId }) => {
    const [channels] = useCollection(db.collection("rooms"));
    let inputRef = useRef(null)
    let menuRef = useRef(null)
    let atRef = useRef(null)
    const [user] = useAuthState(auth)
    const {isShowing, toggle} = useModal();
    //use in reply message logic
    const activeRoomId = useSelector(selectRoomId); 
    const replyDetails = useSelector(reply)
    const dispatch = useDispatch();
    

    const messageTo = (!replyDetails.isReply) 
                      ? `Send message to #${channelName || ""}` 
                      : `Reply to ${ replyDetails.user || ""}`
    

    
    const sendMessage = e => {
        e.preventDefault() //prevents refresh on form submit;

        if(!channelId){
            return false
        }

        if(!inputRef.value){
            return false;
        }

        if(!replyDetails.isReply){
          db.collection("rooms").doc(channelId).collection("messages").add({
              message: inputRef.value,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              user: user?.displayName,
              userImage: user?.photoURL,
              replies: [],
          })
        } else {          
          const comment = {
              message: inputRef.value,
              timestamp: + new Date(),
              user: user?.displayName,
              userImage: user?.photoURL,
          }          

          db.collection("rooms").doc(channelId).collection("messages").doc(replyDetails.messageId).update({
            replies: [...replyDetails.replies, comment ],
          })

          dispatch(setReply({
              isReply: false,
          }))
        }

        inputRef.value = "";

    }

    const submitMessageTextarea = e => {
        if(e.which === 13 && !e.shiftKey){        
            e.preventDefault();
            sendMessage(e)
        }  
    }

    const cancelReply = () => {
      dispatch(setReply({
        isReply: false,
      }))
    }

      const properties = [
          'direction',
          'boxSizing',
          'width',
          'height',
          'overflowX',
          'overflowY',
        
          'borderTopWidth',
          'borderRightWidth',
          'borderBottomWidth',
          'borderLeftWidth',
          'borderStyle',
        
          'paddingTop',
          'paddingRight',
          'paddingBottom',
          'paddingLeft',
        
          'fontStyle',
          'fontVariant',
          'fontWeight',
          'fontStretch',
          'fontSize',
          'fontSizeAdjust',
          'lineHeight',
          'fontFamily',
        
          'textAlign',
          'textTransform',
          'textIndent',
          'textDecoration',
        
          'letterSpacing',
          'wordSpacing',
        
          'tabSize',
          'MozTabSize',
        ]
        
        const isFirefox = typeof window !== 'undefined' && window['mozInnerScreenX'] != null
        
        /*
         * @param {HTMLTextAreaElement} element
         * @param {number} position
         */
        function getCaretCoordinates(element, position) {
          const div = document.createElement('div')
          document.body.appendChild(div)
        
          const style = div.style
          const computed = getComputedStyle(element)
        
          style.whiteSpace = 'pre-wrap'
          style.wordWrap = 'break-word'
          style.position = 'absolute'
          style.visibility = 'hidden'
        
          properties.forEach(prop => {
            style[prop] = computed[prop]
          })
        
          if (isFirefox) {
            if (element.scrollHeight > parseInt(computed.height))
              style.overflowY = 'scroll'
          } else {
            style.overflow = 'hidden'
          }
        
          div.textContent = element.value.substring(0, position)
        
          const span = document.createElement('span')
          span.textContent = element.value.substring(position) || '.'
          div.appendChild(span)
        
          const coordinates = {
            top: span.offsetTop + parseInt(computed['borderTopWidth']),
            left: span.offsetLeft + parseInt(computed['borderLeftWidth']),
            // height: parseInt(computed['lineHeight'])
            height: span.offsetHeight
          }
        
          div.remove()
        
          return coordinates
        }
        
        class Mentionify {
          constructor(ref, menuRef, atRef, resolveFn, replaceFn, menuItemFn) {
            this.ref = ref
            this.menuRef = menuRef
            this.atRef = atRef
            this.resolveFn = resolveFn
            this.replaceFn = replaceFn
            this.menuItemFn = menuItemFn
            this.options = []
            
            this.makeOptions = this.makeOptions.bind(this)
            this.closeMenu = this.closeMenu.bind(this)
            this.selectItem = this.selectItem.bind(this)
            this.onInput = this.onInput.bind(this)
            this.onKeyDown = this.onKeyDown.bind(this)
            this.renderMenu = this.renderMenu.bind(this)
            
            this.ref.addEventListener('input', this.onInput)
            this.ref.addEventListener('keydown', this.onKeyDown)
            this.atRef.addEventListener('click', this.onInput)
          }
          
          async makeOptions(query) {
            const options = await this.resolveFn(query)
            if (options.lenght !== 0) {
              this.options = options
              this.renderMenu()
            } else {
              this.closeMenu()
            }
          }
          
          closeMenu() {
            setTimeout(() => {
              this.options = []
              this.left = undefined
              this.top = undefined
              this.triggerIdx = undefined
              this.renderMenu()
            }, 0)
          }
          
          selectItem(active) {
            return () => {
              const preMention = this.ref.value.substr(0, this.triggerIdx)
              const option = this.options[active]
              const mention = this.replaceFn(option, this.ref.value[this.triggerIdx])
              const postMention = this.ref.value.substr(this.ref.selectionStart)
              const newValue = `${preMention}${mention}${postMention}`
              this.ref.value = newValue
              const caretPosition = this.ref.value.length - postMention.length
              this.ref.setSelectionRange(caretPosition, caretPosition)
              this.closeMenu()
              this.ref.focus()
            }
          }
          
          onInput(ev) {
            if(ev.type === 'click'){
              this.ref.value = "@"
              this.ref.focus()
            }
            const positionIndex = this.ref.selectionStart
            const textBeforeCaret = this.ref.value.slice(0, positionIndex)
            const tokens = textBeforeCaret.split(/\s/)
            const lastToken = tokens[tokens.length - 1]
            const triggerIdx = textBeforeCaret.endsWith(lastToken)
              ? textBeforeCaret.length - lastToken.length
              : -1
            const maybeTrigger = textBeforeCaret[triggerIdx]
            const keystrokeTriggered = maybeTrigger === '@'
            
            if (!keystrokeTriggered) {
              this.closeMenu()
              return
            }
            
            const query = textBeforeCaret.slice(triggerIdx + 1)
            this.makeOptions(query)
            
            const coords = getCaretCoordinates(this.ref, positionIndex)
            const { top, left } = this.ref.getBoundingClientRect()
            
            setTimeout(() => {
              this.active = 0
              this.left = window.scrollX  + coords.left + left + this.ref.scrollLeft
              this.top = window.scrollY +  coords.top + top + coords.height - this.ref.scrollTop
              this.triggerIdx = triggerIdx
              this.renderMenu()
            }, 0)

          }
          
          onKeyDown(ev) {
            let keyCaught = false
            if (this.triggerIdx !== undefined) {
              switch (ev.key) {
                case 'ArrowDown':
                  this.active = Math.min(this.active + 1, this.options.length - 1)
                  this.renderMenu()
                  keyCaught = true
                  break
                case 'ArrowUp':
                  this.active = Math.max(this.active - 1, 0)
                  this.renderMenu()
                  keyCaught = true
                  break
                case 'Enter':
                case 'Tab':
                  this.selectItem(this.active)()
                  keyCaught = true
                  break
              }
            }
            
            if (keyCaught) {
              ev.preventDefault()
            }
          }
          
          renderMenu() {  
            if (this.top === undefined) {
              this.menuRef.hidden = true
              return
            }
            
            this.menuRef.style.left = '0'
            this.menuRef.style.bottom = '57px'
            this.menuRef.style.position = 'absolute'
            this.menuRef.style.zIndex = 9999
            this.menuRef.style.width = '420px'
            this.menuRef.style.background = 'white'
            this.menuRef.innerHTML = ''

            this.options.forEach((option, idx) => {
              this.menuRef.appendChild(this.menuItemFn(
                option,
                this.selectItem(idx),
                this.active === idx))
            })
            
            this.menuRef.hidden = false
          }
        }
        
        const users = [];
        
        channels?.docs.map((doc) => {
           if(doc.data().username){
            users.push({
              username: doc.data().username,
              name: doc.data().name,
              email: doc.data().email,
              userImage: doc.data().photoURL,
              id: doc.id
            })
          }
        })

      
        
        const resolveFn = prefix => prefix === ''
          ? users
          : users.filter(user => user.username.startsWith(prefix))
        
        const replaceFn = (user, trigger) => `${trigger}${user?.username || ""} `
        
        const menuItemFn = (user, setItem, selected) => {
          const div = document.createElement('div')
          const img = document.createElement('img')
          const span = document.createElement('span')
          const h3 = document.createElement('h5')
          img.src = user.userImage
          img.style.position = "absolute"
          img.style.left = "10px"
          img.style.bottom = "10px"
          img.style.width = "40px"
          img.style.borderRadius = "40px"
          h3.innerText = user.name
          span.innerText = user.username
          div.setAttribute('role', 'option')
          div.className = 'menu-item'
          div.style.position = "relative"
          div.style.paddingLeft = "60px"
          if (selected) {
            div.classList.add('selected')
            div.setAttribute('aria-selected', '')
          }
          //div.textContent = user.name 
          div.appendChild(img) 
          div.appendChild(h3)
          div.appendChild(span)
          div.onclick = setItem
          return div
        }
        
        useEffect(() => {
          new Mentionify(
            inputRef,
            menuRef,
            atRef,
            resolveFn,
            replaceFn,
            menuItemFn
          )
        },[channels?.docs])

    return (
        <ChatInputContainer>          
            <form>
              <div ref={ref => menuRef = ref}  role="listbox"></div>
              <TextareaAutosize 
                  placeholder={messageTo} 
                  ref={ref => inputRef = ref}  
                  onKeyPress={submitMessageTextarea}
              />              
            </form>            
            <div>
                {replyDetails.isReply && 
                  <button 
                  style={{backgroundColor: "gray",color:"#fff",display:"flex",alignItems: "center"}}
                  onClick={() => cancelReply()}>
                    <CancelIcon/> <em>Reply to {replyDetails.user}</em>
                  </button>
                } 
                <button ref={ref => atRef = ref}>
                    <AlternateEmailIcon/>
                </button>
                <button onClick={toggle}>
                    <AttachFileIcon/>
                </button>
                <button onClick={sendMessage} style={{color:"darkRed"}}>                   
                    <SendIcon/>
                </button>                
                 
            </div> 
            <Modal
              isShowing={isShowing}
              hide={toggle}
            />      
        </ChatInputContainer>
    )
}

export default ChatInput
