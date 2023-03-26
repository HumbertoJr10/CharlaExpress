import { iSendMessage } from "../interface"

export const newGlobalMessage = async (email: string, message: iSendMessage) => {
    const msg = await fetch(`http://localhost:4000/globalchat/${email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(message)
    })
    .then( res => res.json())
    .then( data => data)

    return msg
}