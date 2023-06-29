const express = require("express")
const bodyParser = require("body-parser")
// IMPORT DB
const connDB = require("./config/db")
// IMPORT ROUTE
const TypeRoute = require("./routes/TypeRoute")
const AuthRoute = require("./routes/AuthRoute")
const CategoryRoute = require("./routes/CategoryRoute")
const BrandRoute = require("./routes/BrandRoute")
const SubCategoryRoute = require("./routes/SubCategoryRoute")
const ProductRoute = require('./routes/ProductRoute')
const OrderRoute = require('./routes/OrderRoute')

// PORT
const port = 3000
const app = express()

// KONEKSI DB
connDB()

app.use(bodyParser.json())

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to retail app",
  })
})

app.use(TypeRoute)
app.use(AuthRoute)
app.use(CategoryRoute)
app.use(BrandRoute)
app.use(SubCategoryRoute)
app.use(ProductRoute)
app.use(OrderRoute)

app.listen(port, () => {
  console.log("server running on port: " + port)
})
