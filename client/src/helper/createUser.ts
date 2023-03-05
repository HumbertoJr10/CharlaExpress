import { iUser } from "../interface"

export const createUser = async (user:iUser) => {
    return await fetch(`http://localhost:4000/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
}