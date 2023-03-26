export const getGlobalChatController = async () => {
    const allMessages = await fetch(`http://localhost:4000/globalchat`)
    .then(res => res.json())
    .then( data => data)

    return allMessages
}