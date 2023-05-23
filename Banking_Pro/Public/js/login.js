let abc = document.getElementById(`naanu`);
abc.addEventListener(`submit`, check);

function check(event) {
  event.preventDefault();

  let c_id = $("#c_id").val();

  if ($("#c_id").val().length > 0)
   {
    if ( $("#c_id").val().trim() == "" ||$("#c_id").val() == "undefined" ||$("#c_id").val() == undefined ||$("#c_id").val() == "null" ||
      $("#c_id").val() == null  )
       {
      alert("Please enter valid Customer ID");
      $("#c_id").val("");

      $("#c_id").focus();

      return;
    }
  } 
  else 
  {
    alert("Please enter valid Customer ID....");

    $("#c_id").val("");

    $("#c_id").focus();

    return;
  }

  let mpin = $("#mpin").val();

  // if ($("#password").val().length > 0)
  //  {
    if (
      $("#mpin").val().trim() == "" ||
      $("#mpin").val() == "undefined" ||
      $("#mpin").val() == undefined ||
      $("#mpin").val() == "null" ||
      $("#mpin").val() == null) {
      alert("Please enter valid mpin");

      $("#mpin").val("");

      $("#mpin").focus();

      return;
    } 
   
  let array = [
    {
      c_id: c_id,
      mpin:mpin
    }
  ];
  let a = localStorage.setItem("data1", JSON.stringify(array));
console.log(a);

  $.post("http://localhost:3000/post_api", // endpoint --
    {
      c_id : c_id, 
      mpin:mpin,
    }, // data set as parameters --
    function (response)
     {
      console.log(response)
      if(response.MSG=="received")
      {
          window.location="/banking";
      }
    }
  ).fail(function(xhr)
  {
    console.log(xhr.status);
    if(xhr.status==400)
    {
     alert("Invalid Credentials");
    }
    else
    {
      console.log("Hey yeah");
    }
  });
}

function forget()
{
  window.location="/reset_upi";
}

function newuser()
{
  window.location="/emp";
}