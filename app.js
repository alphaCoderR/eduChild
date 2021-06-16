// ***** Requiring all the important packages *****
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const Razorpay = require("razorpay");



// ***** Creating the app *****
const app = express();
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);



// ******* Razorpay payment code *******
const razorPay = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

app.post("/order",(req,res)=>{
  let options = {
    amount: req.body.amount,  
    currency: "INR",
    receipt: "order_rcptid_11"
  }; 

  razorPay.orders.create(options, function(err, order) {
    order.key_id=process.env.KEY_ID;
    res.json(order);
  });
});



//  ***** Defining different routes *****
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/landing.html");
});

app.get("/success",(req,res)=>{
  res.sendFile(__dirname+"/success.html");
});

app.get("/failure",(req,res)=>{
  res.sendFile(__dirname+"/failure.html");
});

app.listen(5000, (req, res) => {
  console.log("Server is running on port 5000");
});
