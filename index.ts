import express from "express";
const port = 8002;

const app = express();

app.get("/",(req,res)=>{
    res.send("HELLOW");
})

app.listen(port,()=>{
    console.log(`now listening on port ${port}`);
});