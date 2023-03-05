import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { iState } from "../../interface";
import {
  DeleteMessage_globalChat,
  messages_globalChat,
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

  const {user, isAuthenticated} = useAuth0()

  function scrollToBottom() {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }

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
    socket.on('message', (message)=> {
      console.log(message)
    })
  }, [])

  const HandlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText({
      message: e.target.value,
    });
  };

  const MessageSubbmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (!isAuthenticated) {
      return alert('Debe iniciar sesion para poder escribir en el chat')
    }

    if (user?.email) {

      sendMessage_globalChat(user.email, text)
        .then((res) => {
          dispatch(res);
        })
        .catch((error) => alert(error));
  
      setText({
        message: "",
      });
  
      socket.emit('message', text.message)
    }
  };

  const DeleteMessage = (_id: string) => {
    DeleteMessage_globalChat(_id).then((res) => {
      dispatch(res);
    });
  };

  return {
    text,
    messages,
    chatContainerRef,
    HandlerChange,
    MessageSubbmit,
    DeleteMessage,
  };
};
