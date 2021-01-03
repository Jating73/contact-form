const express = require('express');
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let entries = [];

app.get("/",(req,res)=>{
    res.render("home");
  });

app.get("/admin",(req,res)=>{
    res.render("admin",{
        entries:entries
    });
})  

app.post("/submit",(req,res)=>{
    const data={
        name:req.body.name,
        email:req.body.email,
        contact:req.body.contact,
        whatsapp:req.body.wap,
        college:req.body.college,
        refrence:req.body.refrence,
        degree:req.body.degree,
        intern:req.body.intern,
        file:req.body.file
      };
    entries.push(data);
    res.redirect("/admin");  
});

app.listen(port,()=>{
    console.log("Listening at ",port);
})