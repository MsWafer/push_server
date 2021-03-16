const express = require("express");
const cors = require("cors");
const gcm = require("node-gcm");
require("dotenv").config();

const app = express();
app.use(express.json({ extended: false }));
app.use(cors());
const sender = new gcm.Sender(process.env.API_KEY);

app.get("/", (req, res) => res.send("Не крашься плиз"));

app.use("/buro", require("./routes/buro"));

const PORT = process.env.PORT || 7054;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
