require('dotenv').config()
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const atlas = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@webshop.zxvdwhb.mongodb.net/?retryWrites=true&w=majority&appName=webshop`;
mongoose.connect(atlas);
const {Product, attributes, names, random} = require("./db.js")
const methodOverride = require('method-override');


app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'));

app.listen(3000, () => {
    console.log("--- server started ---");
})

app.get("/", (req,res) => res.redirect("/products"))

app.get("/products", async (req,res) => {
    const products = await Product.find({});
    res.render("products", {products})
})

app.post("/products", async (req,res) => {
    const {name, description, price, quantity} = req.body;
    const submission = await Product({name, description, price, quantity})
    submission.save();
    res.redirect("/")
})

app.get("/create", (req,res) => {  
    res.render("create");
})

app.get("/products/:id", async (req,res) => {
    const {id} = req.params;
    const product = await Product.findById(id);
    if (!product) {
        res.send( "id not found" )
    } else{
        res.render("product", {product})
        }
})

app.delete("/product/:id", async (req,res) => {
    const {id} = req.params;
    await Product.findByIdAndDelete(id)
    res.redirect("/products")
})

app.get("/product/:id/edit", async (req,res) => {
    const {id} = req.params;
    const product = await Product.findById(id);
    if(!product){
        res.send("Product could not be found");
    }else{
        res.render("edit", {product})
    }
})

app.patch("/product/:id/edit", async (req,res) => {
    const {id} = req.params;
    const {name, description, quantity, price} = req.body;
    await Product.findByIdAndUpdate(id, {name, description, quantity, price});
    res.redirect("/products")
})

app.get("/generate", (req,res) => {
    res.render("generate")
})

app.post("/generate", async (req,res) => {
    const {quantity} = req.body;
        await Product.deleteMany({})
        for(let i = 0; i<quantity; i++){   
            const randomName = `${random(attributes)} ${random(names)}`;
            const seed = await new Product({
                name: randomName,
                description: `I am a description of a ${randomName}`,
                price: Math.floor(Math.random()*10)+1,
                quantity: Math.floor(Math.random()*100),
            });
            await seed.save()
    } res.redirect("/products")
})


app.get("/empty", (req,res) => {
    res.render("empty")
})

app.delete("/empty", async (req,res) => {
    await Product.deleteMany({})
    res.redirect("/products")
})

app.get("/about", (req,res) => {
    res.render("about")
})