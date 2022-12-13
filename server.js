const express = require("express");
const session = require('express-session');

var db = require("./db")

const app = express();
const PORT = 3006

app.use(express.static("resources"));

// Session Logic
app.use(express.urlencoded({extended:true})); 
app.use(session({secret:"oauhsdlmfnaliustydfialjbkwegf"}))

let click_counter = 0;

app.set("views", "templates");
app.set("view engine", "pug");

// GET Requests
app.get("/", function(req, res)
{
    res.redirect("/myAboutMe")
});

app.get("/myAboutMe", async function(req, res)
{
    let user = req.session.username ?? "Login";
    res.render("myAboutMe.pug", {username: user})
});

app.get("/myContacts", async function(req, res) 
{
    let user = req.session.username ?? "Login";
    res.render("myContacts.pug", {username: user})
});

app.get("/myWidgets", async function(req, res) 
{
    let user = req.session.username ?? "Login";
    res.render("myWidgets.pug", {username: user})
});

app.get("/contactMe", async function(req, res) 
{
    let user = req.session.username ?? "Login";
    res.render("contactMe.pug", {username: user})
});

app.get("/contactLog", async function(req, res) 
{
    let user = req.session.username ?? "Login";
    let filter_cat = req.query.filter;
    let contact_log = await db.getMessages(filter_cat);

    res.render("contactLog.pug", {contact_log: contact_log, username: user})
});

app.get("/login", async function(req, res) 
{
    let user = req.session.username ?? "Login";

    if (user == "Login")
    {
        res.render("login.pug", {username: user})
    }
    else 
    {
        res.render("logout.pug", {username: user})
    }
});

app.get("/api/click", async function(req, res) 
{
    res.json({clickCount: click_counter});
});

// POST Requests
app.post("/login", async function(req, res) 
{
    let user = req.session.username ?? "Login";
    user = req.body.username;
    req.session.username = user;
    res.redirect("/myAboutMe");
});

app.post("/logout", async function(req, res) 
{
    let user = "Login";
    req.session.username = user;
    res.redirect("/myAboutMe");
});

app.post("/api/click", async function(req, res)
{
    click_counter += 1;
    res.json({clickCount: click_counter});
})

app.post("/contactMe", async function(req, res)
{
    const title = req.body.postTitle;
    const email = req.body.email;
    const username = req.body.username;
    const link = req.body.link;
    const msg_cat = req.body.category;
    const msg = req.body.message;
    
    const result = await db.updateContactMe(title, email, username, link, msg_cat, msg);
    const received = result["protocol41"];

    let user = req.session.username ?? "Login";

    res.render("contactMe.pug", {table_updated: received, username: user});
});

// Start the web server
app.listen(PORT, function() 
{
    console.log(`Listening on http://localhost:${PORT}`);
});