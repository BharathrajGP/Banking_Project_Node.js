
function emp()
{
  $.post("http://localhost:3000/emp_extract1_api", // endpoint --
      {

      }, // data set as parameters --
      function (response)
       {
        console.log(response)
        console.log(response.MSG[0].Name);
         document.getElementById(`e_name`).value=response.MSG[0].Name;
      }
    ).fail(function(xhr)
    {
      console.log(xhr.status);
      if(xhr.status==400)
      {
       alert("Invalid amount");
      }
      else
      {
        console.log("Hey yeah");
      }
    });
}

let abc = document.getElementById("naanu");
abc.addEventListener(`submit`, check);

function check(event) {
  event.preventDefault();
  let c_id=$("#c_id").val();
  let name=$("#name").val();
  let phno=$("#phno").val();
  let ac=$("#ac").val();
  let e_name=$("#e_name").val();

  //Customer ID
  if ($("#c_id").val().length > 0) 
  {
    if (
      $("#c_id").val().trim() == "" ||
      $("#c_id").val() == "undefined" ||
      $("#c_id").val() == undefined ||
      $("#c_id").val() == "null" ||
      $("#c_id").val() == null
    ) 
    {
      alert("Please enter valid Customer Id");
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

//Name
if ($("#name").val().length > 0) 
{
  if (
    $("#name").val().trim() == "" ||
    $("#name").val() == "undefined" ||
    $("#name").val() == undefined ||
    $("#name").val() == "null" ||
    $("#name").val() == null
  ) 
  {
    alert("Please enter valid Last_name");
    $("#name").val("");
    $("#name").focus();
    return;
  }
} 
else 
{
  alert("Please enter valid Last_name....");
  $("#name").val("");
  $("#name").focus();
  return;
}

//Phone number
if ($("#phno").val().length > 0) 
  {
    if (
      $("#phno").val().trim() == "" ||
      $("#phno").val() == "undefined" ||
      $("#phno").val() == undefined ||
      $("#phno").val() == "null" ||
      $("#phno").val() == null
    ) 
    {
      alert("Please enter valid Phone Number");
      $("#phno").val("");
      $("#phno").focus();
      return;
    }
  } 
  else 
  {
    alert("Please enter valid Phone Number....");
    $("#phno").val("");
    $("#phno").focus();
    return;
  }

  //Account Number
  if ($("#ac").val().length > 0) 
  {
    if (
      $("#ac").val().trim() == "" ||
      $("#ac").val() == "undefined" ||
      $("#ac").val() == undefined ||
      $("#ac").val() == "null" ||
      $("#ac").val() == null
    ) 
    {
      alert("Please enter valid Account Number");
      $("#ac").val("");
      $("#ac").focus();
      return;
    }
  } 
  else 
  {
    alert("Please enter valid Account Number....");
    $("#ac").val("");
    $("#ac").focus();
    return;
  }


  //Modified By
  if ($("#e_name").val().length > 0) 
  {
    if (
      $("#e_name").val().trim() == "" ||
      $("#e_name").val() == "undefined" ||
      $("#e_name").val() == undefined ||
      $("#e_name").val() == "null" ||
      $("#e_name").val() == null
    ) 
    {
      alert("Please enter valid Employee Name");
      $("#e_name").val("");
      $("#e_name").focus();
      return;
    }
  } 
  else 
  {
    alert("Please enter valid Employee Name....");
    $("#e_name").val("");
    $("#e_name").focus();
    return;
  }

  console.log("Hiii");
  $.post("http://localhost:3000/remove_customer_api",
  {
    c_id,
    name,
    phno,
    ac,
    e_name
  },
  function(response)
  {
    console.log(response.MSG=="inserted");
    console.log(response.MSG);
    console.log(response);
    if(response.MSG=="Deleted")
    {
        console.log("Deleted");
        alert("Data is successfully deleted");
        window.location="/login";
    }
  }).fail(function(xhr)
  {
    console.log(xhr.status);
          if(xhr.status==400)
          {
           alert("Invalid Credentials");
          }
          else if(xhr.status==401)
          {
           alert("User is Already deleted");
          }
          else if(xhr.status==402)
          {
           alert("Invalid Credentials");
          }
          else if(xhr.status==403)
          {
           alert("Invalid Credentials");
          }
          else if(xhr.status==404)
          {
           alert("Invalid Credentials");
          }
          else
          {
            console.log("Hey yeah");
          }
  })

}

