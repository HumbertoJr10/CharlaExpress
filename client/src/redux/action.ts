export const GET_ALL_MESSAGES_GLOBALCHAT = 'GET_ALL_MESSAGES_GLOBALCHAT';
export const DELETE_MESSAGE_GLOBALCHAT = 'DELETE_MESSAGE_GLOBALCHAT';

export function messageGlobalChat () {
    return async function (dispatch: any) {
        return fetch(`http://localhost:4000/globalchat`)
        .then( res => res.json())
        .then( data => {
            dispatch({
                type: GET_ALL_MESSAGES_GLOBALCHAT,
                payload: data
            })
        })
    }
}