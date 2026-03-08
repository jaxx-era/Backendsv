require("dotenv").config()

const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

// routes
const auth = require("./routes/auth")

app.use("/auth", auth)

app.get("/", (req, res) => {
  res.json({ status: "Backend running" })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log("Server running on " + PORT)
})
