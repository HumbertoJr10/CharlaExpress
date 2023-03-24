import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { iGlobalMessage, iState } from "../../interface";
import {
  DeleteMessage_globalChat,
  messages_globalChat,
  getAllUsers,
  getAllChat
} from "../../redux/action";
import { sendMessage_globalChat } from "../../redux/action";
import { iSendMessage } from "../../interface";
import { socket } from "../../App";
import { useAuth0 } from "@auth0/auth0-react";

export const hook_Chat = () => {
  const [text, setText] = useState<iSendMessage>({
    message: "",
  });
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const messages = useSelector((state: iState) => state.GlobalChat);
  const allUsers = useSelector( (state:iState) => state.UsersList)
  const [ newMessage, setNewMessage] = useState<boolean>(false)
  const UserLoged = useSelector( (state:iState) => state.UserLoged)
  const {user, isAuthenticated} = useAuth0()
  const AllChats = useSelector( (state: iState) => state.chat)
  


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
      messages_globalChat()
      .then((res) => {
        dispatch(res);
      })
      .catch((error) => alert(error));
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(()=> {
    socket.on('message', async (message)=> {
      console.log(message)
      dispatch(await messages_globalChat(message))
    })

    return ()=> {
      socket.off('message')
    }
  }, [newMessage])

  useEffect( ()=> {
    getAllUsers()
    .then( res => dispatch(res))
  }, [])

  useEffect( ()=> {
    getAllChat(UserLoged._id)
    .then( res => dispatch(res))
  }, [UserLoged])
// ----------------------------------------- 

  const menuHandler = () => {
    SetUserMenu(!UserMenu)
  }

  const HandlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText({
      message: e.target.value,
    });
  };

  const MessageSubbmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (!isAuthenticated) {
      return alert('Debe iniciar sesion para poder escribir en el chat')
    }

    if (user?.email && user?.picture && user?.nickname) {

      const newMessage:iGlobalMessage = {
        author: {
          picture: user.picture,
          username: user.nickname,
          _id: user.nickname + "id"
        },
        date: new Date(),
        message: text.message,
        _id: "front"
      }
      dispatch(await messages_globalChat(newMessage))

      sendMessage_globalChat(user.email, text)
        .then((res) => {
          
        })
        .catch((error) => alert(error));
  
      setText({
        message: "",
      });
  
      socket.emit('message', newMessage)
      setNewMessage(!newMessage)
    }
  };

  const DeleteMessage = (_id: string) => {
    DeleteMessage_globalChat(_id).then((res) => {
      dispatch(res);
    });
  };

  const activeChat = (id:string) => {
    setChatActive(id)
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
    HandlerChange,
    MessageSubbmit,
    DeleteMessage,
    menuHandler,
    activeChat
  };
};
