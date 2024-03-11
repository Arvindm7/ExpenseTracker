require('dotenv').config()

const express=require('express');
const cors=require('cors');

const {db}=require('./db/db')
const {readdirSync}=require('fs')



const PORT=process.env.PORT


const app=express();



app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{
    res.send("Hello World");
})


//Routes...

readdirSync('./routes').map((route)=>app.use('/api/v1',require('./routes/'+route)))


const server=() => {
    db()
    app.listen(PORT, () => {
        console.log('Server is listening to port:',PORT);
    });

}

server()