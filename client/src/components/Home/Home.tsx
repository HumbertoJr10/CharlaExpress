import React from 'react'
import io from 'socket.io-client'

const socket = io('http://localhost:4000/')

function Home() {
  return (
    <div>
        <h1>Home</h1>
    </div>
  )
}

export default Home