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

const url="http://localhost:5000/order";
      $(".submit").click(()=>{
        const data={
          amount:$("#amount-tag").val()
        }
        $.post(url,data,(data,status)=>{
          console.log(data);
        });
      })
