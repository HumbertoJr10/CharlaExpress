import { useState } from 'react';
import styles from './Chat.module.css';
import { hook_Chat } from './hook_Chat';
import { useSelector } from 'react-redux';
import { iGlobalMessage, iState } from '../../interface';


function Chat () {
  
  const { text, messages, HandlerChange } = hook_Chat()
  const GlobalChat:iGlobalMessage[] = useSelector( (state:iState) => state.GlobalChat)

  console.log(GlobalChat)

  return (
    <div className={styles.Chat_Overlay}>
      <main className={styles.Chat_Container}>
          {
            
            messages.map((chat, index) => (
              <div className={styles.chat_MessageOverlay}>
                <div className={styles.Chat_MessageContainer} key={index}>
                    <div className={styles.Chat_MessageAuthor}>
                      <p>nombre</p>
                    </div>
                    <div className={styles.Chat_MessageContent}>
                      <p>texto</p>
                    </div>
                </div>
              </div>
            ))
            
          }
      </main>
      <form className={styles.Chat_Chat_Container}>
        <div className={styles.Chat_Chat_EmoticonSide}>

        </div>
        <div className={styles.Chat_Chat_TextSide}>
          <input onChange={HandlerChange} type={'text'} placeholder='Send a message...'/>
        </div>
        <div className={styles.Chat_Chat_SubmitSide}>
          <button>Send</button>
        </div>
      </form>
    </div>
  )
}

export default Chat