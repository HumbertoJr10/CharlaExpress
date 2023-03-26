import { iSendMessage } from "../interface"

export async function newPrivateMessage (email:string, id:string, message: string) {
    const msg = {
        message,
        id
    }

    const SEND = await fetch(`http://localhost:4000/privatechat/${email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(msg),
    })
    .then(res => res.json())
    .then(data => data)

    return SEND
}