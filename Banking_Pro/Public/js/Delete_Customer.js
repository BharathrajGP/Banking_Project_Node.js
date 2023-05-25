let abc = document.getElementById(`naanu`);
abc.addEventListener(`submit`, check);

function check(event) {
  event.preventDefault();

  let e_id = $("#e_id").val();

  if ($("#e_id").val().length > 0)
   {
    if ( $("#e_id").val().trim() == "" ||$("#e_id").val() == "undefined" ||$("#e_id").val() == undefined ||$("#e_id").val() == "null" ||
      $("#e_id").val() == null  )
       {
      alert("Please enter valid Employee ID");
      $("#e_id").val("");

      $("#e_id").focus();

      return;
    }
  } 
  else 
  {
    alert("Please enter valid Employee ID....");

    $("#e_id").val("");

    $("#e_id").focus();

    return;
  }

  let pass = $("#pass").val();

  // if ($("#password").val().length > 0)
  //  {
    if (
      $("#pass").val().trim() == "" ||
      $("#pass").val() == "undefined" ||
      $("#pass").val() == undefined ||
      $("#pass").val() == "null" ||
      $("#pass").val() == null) {
      alert("Please enter valid password");

      $("#pass").val("");

      $("#pass").focus();

      return;
    } 
   
  let array = [
    {
      e_id: e_id,
      pass:pass
    }
  ];
  let a = localStorage.setItem("data3", JSON.stringify(array));
console.log(a);

  $.post("http://localhost:3000/delete_api", // endpoint --
    {
      e_id : e_id, 
      pass:pass,
    }, // data set as parameters --
    function (response)
     {
      console.log(response)
      window.location="/removeuser";
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
