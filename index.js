import express from "express"
import axios from "axios"
import bodyParser from "body-parser"



const app = express()
const port = 4000

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.render("index.ejs")
})

app.post("/random", async (req,res)=>{
    try{
        const response = await axios.get('https://hindi-quotes.vercel.app/random');
        const result = response.data
        //console.log(result);



        res.render("index.ejs",
            {
                content : result.quote
            }
        )
    }
    catch(err){
        //console.log(err);
        res.sendStatus(500)
    }
})

app.post("/type", async (req,res)=>{
    const quotetype = req.body.quoteType;
    //console.log(quotetype);
    try{
        const response = await axios.get(`https://hindi-quotes.vercel.app/random/${quotetype}`);
        const result = response.data
        //console.log(result);



        res.render("index.ejs",
            {
                quoteinfo : result.quote
            }
        )
    }
    catch(err){
        //console.log(err);
        res.sendStatus(500)
    }
})

app.listen(port,()=>{
    console.log(`server is listening on ${port}`);
})