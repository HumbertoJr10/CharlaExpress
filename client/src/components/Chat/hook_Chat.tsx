import React, { useState} from 'react'

export const hook_Chat = () => {
  const [messages, setMessages] = useState<string[]>([])
  const [text, setText] = useState<string>('')

  const HandlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }
  
  return {
    text,
    HandlerChange
  }
}

