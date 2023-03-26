import styles from './Chat.module.css';
import { hook_Chat } from './hook_Chat';
import moment from 'moment';

// ----------SVG --------------
import configWhite from '../../assets/configWhite.svg';
import sendWhite from '../../assets/sendWhite.svg';
import lupaWhite from '../../assets/lupaWhite.svg';
import userList from '../../assets/userList.svg';
import closeW from '../../assets/closeWhite.svg'

function Chat () {
  
  const { text, messages, chatContainerRef, UserLoged, allUsers, UserMenu, AllChats, ChatActive, DeleteMessage, HandlerChange, MessageSubbmit, menuHandler, activeChat, CreateNewChat, deleteChatPrivate, isAuthenticated } = hook_Chat()

  //console.log(UserLoged)

  return (
    <div className={UserMenu ? styles.Chat_Container : styles.Chat_Container_Close}>
      <div className={styles.Chat_ChatList}>
        <div className={styles.ChatMenuHeader}>
          <h2>Chats</h2>
          <img className={styles.menuHandler} onClick={menuHandler} src={userList} />
        </div>
        <div className={styles.Chat_ChatSearchbar}>
          <input type="text" placeholder='Buscar...' />
          <div className={styles.Chat_SearchButton}>
            <img src={lupaWhite} />
          </div>
        </div>
        <div className={styles.AllChats}>
          <div className={ChatActive == "globalChat" ? styles.OneActiveChat : styles.OneChat} key="globalChat" onClick={() => activeChat("globalChat")}>
            <img className={styles.chatPicture} src="https://cdn-icons-png.flaticon.com/512/134/134932.png" />
            <p>Chat Global</p>
          </div>
          {
            AllChats?.map((chat, index) => (
              <div key={chat._id} className={ChatActive == chat._id ? styles.OneActiveChat : styles.OneChat} onClick={() => activeChat(chat._id)}>
                <img className={styles.chatPicture} src={chat.participants[0].username === UserLoged.username ? chat.participants[1].picture : chat.participants[0].picture} />
                <p>{ chat.participants[0].username === UserLoged.username ? chat.participants[1].username : chat.participants[0].username}</p>
                <img onClick={() => deleteChatPrivate(chat._id)} src={closeW} className={styles.closeChat} />
              </div>
            ))
          }
          </div>
      </div>
      <div className={styles.Chat_Conversation} ref={chatContainerRef}>
        {
          messages.map( e => (
            <div className={e.author.username === UserLoged.username? styles.Chat_MSG_B_overlay : styles.Chat_MSG_A_overlay}>
              <div className={e.author.username === UserLoged.username? styles.Chat_MSG_B_Container : styles.Chat_MSG_A_Container}>
                <div className={ChatActive==='globalChat' ? styles.Chat_MSG_header : styles.none}>
                  <p>{e.author.username == UserLoged.username ? " " : e.author.username[0].toUpperCase() + e.author.username.slice(1)}</p>
                  <img src={configWhite} onClick={()=> DeleteMessage(e._id)}/>
                </div>
                <div className={styles.Chat_MSG_content}>
                  <p>{e.message}</p>
                </div>
                <div className={styles.Chat_MSG_Date}>
                  <p>{moment(e.date).calendar()}</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
      <div className={UserMenu ? styles.Chat_UserList: styles.none}>
        <p>Lista de usuarios</p>
        <div className={styles.Chat_UsersDiv}>
          {
            allUsers.map( e => (
              <div className={e.username!=UserLoged.username ? styles.Chat_UsersContainer : styles.none} onClick={() => CreateNewChat(UserLoged._id, e._id) }>
                <img src={e.picture} />
                <p>{e.username}</p>
              </div>
            ))
          }
        </div>
      </div>
      <div className={styles.Chat_Profile}>
        <img src={UserLoged.picture} />
        <p>{UserLoged.username}</p>
      </div>
      <form className={styles.Chat_MessageContainer}>
          <input type="text" placeholder='Escribe un mensaje...' value={text.message} onChange={HandlerChange}/>
          <button className={styles.Chat_SendButton} onClick={(e)=> MessageSubbmit(e, ChatActive)}>
            <img src={sendWhite} />
          </button>
      </form>
    </div>
  )
}

export default Chat