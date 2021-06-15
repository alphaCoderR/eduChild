let receivedData = {};
// *** Text Changing code ***
let counter = "donationPage";
function textChange() {
  let text = document.getElementById("iterateEffects");
  counter = counter == "donationPage" ? "loginPage" : "donationPage";
  if (counter == "donationPage") {
    text.innerHTML = "Donate";
  } else {
    text.innerHTML = "Go Back";
  }
}

// *** Requesting data from the backend server ***
const url = "http://localhost:5000/order";
$("#rzp-button1")
  .click(() => {
    receivedData.name = $("input[name=Name]").val();
    receivedData.email = $("input[name=Email]").val();
    const data = {
      amount: $("#amount-tag").val(),
    };
    $.post(url, data, (data, status) => {
      receivedData = { ...receivedData, data };
      console.log(receivedData);
    }).then(() => {
      var options = {
        key: receivedData.data.key_id, // Enter the Key ID generated from the Dashboard
        amount: receivedData.data.amount, // Amount is in currency subunits. Default currency is INR
        currency: "INR",
        name: "EduChild",
        description: "Donation",
        image: "https://example.com/your_logo",
        order_id: receivedData.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: function (response) {
          alert(response.razorpay_payment_id);
          alert(response.razorpay_order_id);
          alert(response.razorpay_signature);
        },
        prefill: {
          name: receivedData.name,
          email: receivedData.email,
        },
        theme: {
          color: "#3399cc",
        },
      };
      var rzp1 = new Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });
  
      rzp1.open();
      e.preventDefault();
    })
  }
)
  /*
  .then(() => {
    var options = {
      key: response.data.key_id, // Enter the Key ID generated from the Dashboard
      amount: response.data.amount, // Amount is in currency subunits. Default currency is INR
      currency: "INR",
      name: "EduChild",
      description: "Donation",
      image: "https://example.com/your_logo",
      order_id: response.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        name: response.name,
        email: response.email,
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });

    rzp1.open();
    e.preventDefault();
  })
  */