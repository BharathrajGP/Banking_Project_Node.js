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

  let phno = $("#phno").val();

  if ($("#phno").val().length > 0)
   {
    if ( $("#phno").val().trim() == "" ||$("#phno").val() == "undefined" ||$("#phno").val() == undefined ||$("#phno").val() == "null" ||
      $("#phno").val() == null  )
       {
      alert("Please enter valid Phone Number");
      $("#phno").val("");

      $("#phno").focus();

      return;
    }
  } 
  else 
  {
    alert("Please enter valid Phno number....");

    $("#phno").val("");

    $("#phno").focus();

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
   
//   let array = [
//     {
//       c_id: c_id,
//       mpin:mpin
//     }
//   ];
//   let a = localStorage.setItem("data1", JSON.stringify(array));
// console.log(a);

  $.post("http://localhost:3000/reset_mpin_api", // endpoint --
    {
      c_id, 
      mpin,
      phno
    },
    function (response)
     {
      console.log(response)
      if(response.MSG=="success")
      {
          window.location="/login";
      }
    }
  ).fail(function(xhr)
  {
    console.log(xhr.status);
    if(xhr.status==404)
    {
     alert("Invalid Credentials");
    }
    else if(xhr.status==400)
    {
      console.log("Hey yeah");
      alert("phone number not matching");
    }
  });
}