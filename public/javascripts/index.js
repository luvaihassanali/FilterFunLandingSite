
/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function mobileSwitch() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
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
      alert(data);
    });
}
