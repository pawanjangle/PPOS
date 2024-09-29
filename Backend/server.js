const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config()
const path = require("path");
const router = require("./Routes/product");

mongoose.connect(process.env.MongoUri).then(() => {
    console.log("Mongodb server connected")
}).catch(err => {
    console.log(err)
})
app.use(express.json());
// const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/Frontend/dist")));
}
app.use("/api/product", router);

// app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "Frontend", "dist", "index.html"));
// });
app.get('/', (req, res) => {
    res.send("server is ready");
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log("server started at http://localhost:" + PORT);
})