import { useRef } from 'react';
import styles from './Chat.module.css';
import { hook_Chat } from './hook_Chat';
import { useSelector } from 'react-redux';
import { iGlobalMessage, iState } from '../../interface';

// ----------SVG --------------
import sendBlue from '../../assets/blueSend.svg';
import emoticonIcon from '../../assets/emoticonIcon.svg'


function Chat () {
  
  const { text, messages, chatContainerRef, DeleteMessage, HandlerChange, MessageSubbmit } = hook_Chat()


  return (
    <div className={styles.Chat_Overlay}>
      <main className={styles.Chat_Container} ref={chatContainerRef}>
          {
            
            messages.map((chat, index) => (
              <div className={styles.chat_MessageOverlay}>
                <div className={styles.Chat_MessageContainer} key={index}>
                    <div className={styles.Chat_MessageAuthor}>
                      <p>{chat.author.username}</p>
                    </div>
                    <div className={styles.Chat_MessageContent}>
                      <p>{chat.message}</p>
                    </div>
                </div>
              </div>
            ))
            
          }
      </main>
      <form className={styles.Chat_Chat_Container}>
        <div className={styles.Chat_Chat_EmoticonSide}>
          <img src={emoticonIcon} alt="" />
        </div>
        <div className={styles.Chat_Chat_TextSide}>
          <input onChange={HandlerChange} type={'text'} placeholder='Send a message...' value={text.message}/>
        </div>
        <div className={styles.Chat_Chat_SubmitSide}>
          <button onClick={MessageSubbmit}>
            <img src={sendBlue} alt="" />
          </button>
        </div>
      </form>
    </div>
  )
}

export default Chat