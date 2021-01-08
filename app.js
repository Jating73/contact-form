const express = require('express');
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(express.static("public"));
app.use(express.json({ limit: '2mb' }))

let entries = [];

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/admin", (req, res) => {
    res.render("admin", {
        entries: entries
    });
})

app.post("/submit", (req, res) => {
    const data = req.body;
    if (data.Name === '' || data.email === '' || data.phone === '' || data.wap === '' || data.college === '' || data.refrence === '' || data.degree === '') {
        res.status(400).json({ error: 'Fill all the fields' })
        return
    }
    const finalData={
        name:data.Name,
        email:data.email,
        contact:data.phone,
        whatsapp:data.wap,
        college:data.college,
        refrence:data.refrence,
        degree:data.degree,
        intern:data.intern,
        file:data.filename
    };
    entries.push(finalData);
    res.status(200).json({
        message:'Submitted Successfully!'
    })
});

app.listen(port, () => {
    console.log("Listening at ", port);
})