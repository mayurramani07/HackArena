const express = require("express");
const dotenv = require("dotenv")


dotenv.config();
const app = express();

app.get("/", (req,res) => {
    res.send("JAI SHREE RAM");
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})


