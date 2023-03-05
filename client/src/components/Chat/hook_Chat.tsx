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

export const hook_Chat = () => {
  const [text, setText] = useState<iSendMessage>({
    message: "",
  });
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const messages = useSelector((state: iState) => state.GlobalChat);

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
    sendMessage_globalChat("Rollins@gmail.com", text)
      .then((res) => {
        dispatch(res);
      })
      .catch((error) => alert(error));

    setText({
      message: "",
    });

    socket.emit('message', text.message)
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
