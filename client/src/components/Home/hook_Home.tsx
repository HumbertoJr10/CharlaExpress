import React, { useEffect, useState } from 'react';
import { socket } from '../../App';

export const hook_Home = () => {

    const [text, setText] = useState<string>('')
    const [Chat, setChat] = useState<string[]>([])

 
    return {
        text,
        Chat
    }
}
