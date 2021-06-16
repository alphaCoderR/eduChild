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

app.post("/order", (req, res) => {
  let options = {
    amount: req.body.amount,
    currency: "INR",
    receipt: "order_rcptid_11",
  };

  razorPay.orders.create(options, function (err, order) {
    order.key_id = process.env.KEY_ID;
    res.json(order);
  });
});

//  ***** Defining different routes *****
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/landing.html");
});

app.get("/success", (req, res) => {
  res.sendFile(__dirname + "/success.html");
});

app.post("/success", (req, res) => {
  let Data = req.body.data;
  let params = {
    type: "invoice",
    description: "Invoice for the Donation to EduChild",

    customer: {
      name: Data.name,
      contact: 9999999999,
      email: Data.email,
      billing_address: {
        line1: "Mandar Bagicha Para",
        line2: "Gandhi Park",
        zipcode: "766001",
        city: "Bhawanipatna",
        state: "Odisha",
        country: "in",
      },
      shipping_address: {
        line1: "Ground & 1st Floor, SJR Cyber Laskar",
        line2: "Hosur Road",
        zipcode: "560068",
        city: "Bengaluru",
        state: "Karnataka",
        country: "in",
      },
    },
    line_items: [
      {
        name: "Donation to EduChild",
        description: "For charity purpose",
        amount: Data.data.amount,
        currency: "INR",
        quantity: 1,
      },
    ],
    sms_notify: 1,
    email_notify: 1,
    currency: "INR",
  };
  razorPay.invoices.create(params, (err, response) => {
    if (!err) {
      console.log("Invoice Created successfully");
    }
  });
  res.sendStatus(200);
});

app.get("/failure", (req, res) => {
  res.sendFile(__dirname + "/failure.html");
});

app.listen(5000, (req, res) => {
  console.log("Server is running on port 5000");
});
