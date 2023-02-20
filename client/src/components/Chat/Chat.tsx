import { useState } from 'react';
import styles from './Chat.module.css';
import { hook_Chat } from './hook_Chat';

interface Message {
  author: string,
  content: string
}

function Chat () {
  const [messag, setMessag] = useState<Message[]>([
    {
      author: 'Juan',
      content: 'Hola como estásaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa?'
    },
    {
      author: 'Pablo',
      content: 'Bien amigo! Y tu?'
    },
    {
      author: 'Pablo',
      content: 'Bien amigo! Y tu?'
    },
    {
      author: 'Pablo',
      content: 'Bien amigo! Y tu?'
    },
    {
      author: 'Pablo',
      content: 'Bien amigo! Y tu?'
    },
    {
      author: 'Pablo',
      content: 'Bien amigo! Y tu?'
    },
    {
      author: 'Pablo',
      content: 'Bien amigo! Y tu?'
    },
    {
      author: 'Pablo',
      content: 'Bien amigo! Y tu?'
    },
    {
      author: 'Pablo',
      content: 'Bien amigo! Y tu?'
    },
    {
      author: 'Pablo',
      content: 'Bien amigo! Y tu?'
    },
    {
      author: 'Pablo',
      content: 'Bien amigo! Y tu?'
    },
    {
      author: 'Pablo',
      content: 'Bien amigo! Y tu?'
    },
    {
      author: 'Pablo',
      content: 'Bien amigo! Y tu?'
    }
  ])
  const { text, HandlerChange } = hook_Chat()

  console.log(text)

  return (
    <div className={styles.Chat_Overlay}>
      <main className={styles.Chat_Container}>
          {
            
            messag.map((chat, index) => (
              <div className={styles.chat_MessageOverlay}>
                <div className={styles.Chat_MessageContainer} key={index}>
                    <div className={styles.Chat_MessageAuthor}>
                      <p>{chat.author}</p>
                    </div>
                    <div className={styles.Chat_MessageContent}>
                      <p>{chat.content}</p>
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