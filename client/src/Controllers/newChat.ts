
export async function createPrivateChat (id1: string, id2: string) {
    const participants = {
        id1,
        id2
    }

    const newChat = await fetch(`http://localhost:4000/privatechat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(participants),
    })
    .then(res=> res.json())
    .then( data => data)
    .catch(res => alert(res))
}