import React, { useState} from 'react'
import { iGlobalMessage } from '../../interface'



export const hook_Chat = () => {
  const [messages, setMessages] = useState<iGlobalMessage[]>([])
  const [text, setText] = useState<string>('')


  const HandlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }
  
  return {
    text,
    messages,
    HandlerChange
  }
}

