import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { iGlobalMessage, iState } from "../../interface";
import {
  DeleteMessage_globalChat,
  messages_globalChat,
  getAllUsers,
  getAllChat,
  sendMessage_PrivateChat,
  getGlobalChat,
  filterChat
} from "../../redux/action";
import { iSendMessage } from "../../interface";
import { socket } from "../../App";
import { useAuth0 } from "@auth0/auth0-react";
import { createPrivateChat } from "../../Controllers/newChat";
import { deleteChat } from "../../Controllers/deleteChat";
import { newPrivateMessage } from "../../Controllers/newPrivateMessage";
import { newGlobalMessage } from "../../Controllers/newGlobalMessage";
import { getGlobalChatController } from "../../Controllers/getGlobalChat";

export const hook_Chat = () => {
  const [text, setText] = useState<iSendMessage>({
    message: "",
  });
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const globalChat = useSelector((state: iState) => state.GlobalChat);
  const allUsers = useSelector( (state:iState) => state.UsersList)
  const [ newMessage, setNewMessage] = useState<boolean>(false)
  const [ newPrivateMessageChange, setNewPrivateMessageChange] = useState<boolean>(false)
  const UserLoged = useSelector( (state:iState) => state.UserLoged)
  const {user, isAuthenticated} = useAuth0()
  const AllChats = useSelector( (state: iState) => state.chat)
  const [messages, setMessages] = useState<iGlobalMessage[]>(globalChat)
  const [refreshChat, setRefreshChat] = useState<boolean>(false)
  const [filterText, setFilterText] = useState<string>("")


  const [ UserMenu, SetUserMenu ] = useState<boolean>(false)
  const [ChatActive, setChatActive] = useState<string>("globalChat")

  function scrollToBottom() {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }

  // -------- USE EFFECT ------------------
  useEffect(() => {
      getGlobalChatController()
      .then( async res => dispatch(getGlobalChat(res)))
      setMessages(globalChat)
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, newPrivateMessageChange]);

  useEffect(()=> {
    socket.on("message", async (msg)=> {
      
      const oldMsg = [...messages]
      oldMsg.push(msg)
      setMessages(oldMsg)
      console.log('Escuchando')
      dispatch(messages_globalChat(msg))
      
     console.log(messages)
    })

    return ()=> {
      socket.off('message')
    }
  }, [messages])

  useEffect( ()=> {
    socket.on('PrivateMessage', (format => {
      dispatch(sendMessage_PrivateChat(format.idChat, format.newMessage))
      setNewPrivateMessageChange(!newPrivateMessageChange)
    }))

    return ()=> {
      socket.off('PrivateMessage')
    }
  }, [newPrivateMessageChange])

  useEffect( ()=> {
    getAllUsers()
    .then( res => dispatch(res))
  }, [])

  useEffect( ()=> {
    getAllChat(UserLoged._id)
    .then( res => dispatch(res))
  }, [UserLoged, refreshChat])

  useEffect( ()=> {
    socket.on("refreshChat", (a) => {
      setRefreshChat(!refreshChat)
    })
  })
// ----------------------------------------- 

  const menuHandler = () => {
    SetUserMenu(!UserMenu)
  }

  const HandlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText({
      message: e.target.value,
    });
  };

  const MessageSubbmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, idChat='none') => {
    e.preventDefault();

    if (!isAuthenticated) {
      return alert('Debe iniciar sesion para poder escribir en el chat')
    }

    if (user?.email && user?.picture && user?.nickname) {

      const newMessage:iGlobalMessage = {
        author: {
          picture: UserLoged.picture,
          username: UserLoged.username,
          _id: UserLoged.username + "id"
        },
        date: new Date(),
        message: text.message,
        _id: "front"
      }

      if (ChatActive==='globalChat') {

        // SE CREA EN EL BACK CON EL CONTROLADOR-------
       newGlobalMessage(UserLoged.email, text)
       .then( res => {
        console.log('Guardado en Back')
       })
       //---------------------------------------------


        dispatch(messages_globalChat(newMessage))

        setText({
          message: "",
        });
    
        socket.emit('message', newMessage)
        setNewMessage(!newMessage)
        setMessages([...messages, newMessage])
        
      } else {

        newPrivateMessage(user.email, idChat, text.message)
        .then(res => console.log(res))

        dispatch(sendMessage_PrivateChat(ChatActive, newMessage))

        const format = {
          idChat: ChatActive,
          newMessage
        }

        setText({
          message: "",
        });

        socket.emit('PrivateMessage', format)
        setNewPrivateMessageChange(!newPrivateMessageChange)
      }
    }
  };

  const DeleteMessage = (_id: string) => {
    DeleteMessage_globalChat(_id).then((res) => {
      dispatch(res);
    });
  };

  const activeChat = (id:string) => {
    setChatActive(id)
    changeMessage(id)
  }

  const changeMessage = (id:string) => {
    if (id == 'globalChat') {
      setMessages(globalChat)
    } else {
      const msgs = AllChats.find( e => e._id === id)

      if (msgs?.chat) {
        setMessages(msgs.chat)
      }
    }
  }

  const CreateNewChat = async (id1:string, id2: string) => {
    createPrivateChat(id1, id2)
    .then( res => {
      setRefreshChat(!refreshChat)

      const a = true
      socket.emit("refreshChat", a)
    })
  }

  const deleteChatPrivate = async (id:string) => {
    deleteChat(id)
    .then( res => {
      setChatActive('globalChat')
      setRefreshChat(!refreshChat)
    })
  }

  const HanlderFilterChat = (e:React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value)
    dispatch(filterChat(e.target.value, UserLoged.username))
  }

  return {
    text,
    messages,
    chatContainerRef,
    UserLoged,
    allUsers,
    UserMenu,
    AllChats,
    ChatActive,
    filterText,
    HandlerChange,
    MessageSubbmit,
    DeleteMessage,
    menuHandler,
    activeChat,
    CreateNewChat,
    deleteChatPrivate,
    isAuthenticated,
    globalChat,
    HanlderFilterChat
  };
};
