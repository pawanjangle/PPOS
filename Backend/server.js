import express from 'express';
const app = express();
import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()
import path from "path";
mongoose.connect(process.env.MongoUri).then(() => {
    console.log("Mongodb server connected")
}).catch(err => {
    console.log(err)
})
app.use(express.json());
const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/Frontend/dist")));
}
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "Frontend", "dist", "index.html"));
});
app.get('/', (req, res) => {
    res.send("server is ready");
})
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log("server started at http://localhost:5000");
})