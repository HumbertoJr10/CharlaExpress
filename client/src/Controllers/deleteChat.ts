export async function deleteChat ( id:string ) {
    const deleteChat = await fetch(`http://localhost:4000/privatechat/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    })
    .then(res => res.json())
    .then( data => data)
    .catch( data => alert(data))
}