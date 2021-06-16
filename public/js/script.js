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
$("#rzp-button1").click(() => {
  receivedData.name = $("input[name=Name]").val();
  receivedData.email = $("input[name=Email]").val();
  const data = {
    amount: $("#amount-tag").val(),
  };
  
  
  $.post(url, data, (data, status) => {
    receivedData = { ...receivedData, data };
  }).then(() => {
    var options = {
      key: receivedData.data.key_id, // Enter the Key ID generated from the Dashboard
      amount: receivedData.data.amount, // Amount is in currency subunits. Default currency is INR
      currency: "INR",
      name: "EduChild",
      description: "Donation",
      image:
        "https://scontent.fbbi5-1.fna.fbcdn.net/v/t1.6435-9/96520441_3339114362798186_2125736330204807168_n.jpg?_nc_cat=110&ccb=1-3&_nc_sid=973b4a&_nc_ohc=qz-DL6dqNxkAX_9Sjax&_nc_ht=scontent.fbbi5-1.fna&oh=db08587421615773f1db9e7255790ab9&oe=60CE8695",
      order_id: receivedData.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: function (response) {
        receivedData.payment_id = response.razorpay_payment_id;
        receivedData.order_id = response.razorpay_order_id;
        receivedData.signature = response.razorpay_signature;
        sessionStorage.setItem("userData", JSON.stringify(receivedData));
        window.location.href = "/success";
      },
      prefill: {
        name: receivedData.name,
        email: receivedData.email,
      },
      theme: {
        color: "#0ac2d2",
      },
    };
    var rzp1 = new Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      receivedData.errCode=response.error.code;
      receivedData.description=response.error.description;
      sessionStorage.setItem("userData", JSON.stringify(receivedData));
      window.location.href = "/failure";
    });

    rzp1.open();
    e.preventDefault();
  });
});
