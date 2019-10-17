$(function () {
  $("#mobileicon").click(mobileSwitch);
  $("#myform").submit(function (e) {
    e.preventDefault();
    submitForm();
  });
});

function mobileSwitch() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
  return false;
}

function submitForm() {
  var email = document.getElementById("emailForm").value;
  var subject = document.getElementById("subjectLine").value;
  var message = document.getElementById("messageBody").value;
  document.getElementById("emailForm").value = "";
  document.getElementById("messageBody").value = "";
  document.getElementById("subjectLine").value = "";
  $.post("https://filterfun.fun/messageForm",
    {
      e: email,
      s: subject,
      m: message
    },
    function (data, status) {
      console.log(data);
      alert(data);
    });
}