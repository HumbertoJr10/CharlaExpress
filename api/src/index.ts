import express from 'express';
import morgan from 'morgan';

const app = express()

app.use(express.json())
app.use(morgan('dev'))


app.get( '/ping', ( _req, res) => {
    console.log('funcionando')
    res.send('pong')
})

app.listen(4000, ()=> {
    console.log('app listen in port 3000')
})