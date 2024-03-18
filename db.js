const mongoose = require("mongoose");

const attributes = [
    "Shiny", "Sunny", "Sparkling", "Precious", "Fresh", "Misty", "Petite", "Premium", "Vegan",
    "Gluten-free", "Large", "Limited-edition", "Heavenly", "Rare", "Exotic"
];

const names = [
    "Potato", "Lettuce", "Carrot", "Apple", "Strawberry", "Peach", "Orange", "Pasta", "Egg",
    "Watermelon", "Tomato", "Salmon", "Lamb", "Mushroom", "Tuna", "Green Bean", "Shrimp", "Peanut",
    "Rice", "Lemon", "Pineapple"
];

const schema = new mongoose.Schema({
    name: String,
    description: String,
    quantity: Number,
    price: Number
})

const Product = mongoose.model("Product", schema);

const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

module.exports = {attributes, names, random, Product}

