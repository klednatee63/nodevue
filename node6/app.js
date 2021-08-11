const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const formidableMiddleware = require("express-formidable");
const config = require("./config/database");

/** Connect to DB */
mongoose.connect(config.database, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => console.log("Connected to MongoDB"));

/** Inint App */
const app = express();

/** Formidable Middleare */
app.use(formidableMiddleware());

/** Set public Folder */
app.use(express.static(path.join(__dirname, "public")));

/** Set Routes */
const pages = require("./routes/pages");
const categories = require("./routes/categories");
const products = require("./routes/products");
const orders = require("./routes/orders");

app.use("/pages", pages);
app.use("/categories", categories);
app.use("/products", products);
app.use("/orders", orders);

/** Start the server */
const port = 3000;
app.listen(port, () => console.log("Server running at " + port));