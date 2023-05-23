
function emp()
{
  $.post("http://localhost:3000/emp_extract_api", // endpoint --
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
  let mpin=$("#mpin").val();
  let upi=$("#upi").val();
  let bal=$("#bal").val();
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

  //mpin
  if ($("#mpin").val().length > 0) 
  {
    if (
      $("#mpin").val().trim() == "" ||
      $("#mpin").val() == "undefined" ||
      $("#mpin").val() == undefined ||
      $("#mpin").val() == "null" ||
      $("#mpin").val() == null
    ) 
    {
      alert("Please enter valid mpin");
      $("#mpin").val("");
      $("#mpin").focus();
      return;
    }
  } 
  else 
  {
    alert("Please enter valid mpin....");
    $("#mpin").val("");
    $("#mpin").focus();
    return;
  }

  //UPi
  if ($("#upi").val().length > 0) 
  {
    if (
      $("#upi").val().trim() == "" ||
      $("#upi").val() == "undefined" ||
      $("#upi").val() == undefined ||
      $("#upi").val() == "null" ||
      $("#upi").val() == null
    ) 
    {
      alert("Please enter valid Roll Number");
      $("#upi").val("");
      $("#upi").focus();
      return;
    }
  } 
  else 
  {
    alert("Please enter valid Roll Number....");
    $("#upi").val("");
    $("#upi").focus();
    return;
  }

  //bal
  if ($("#bal").val().length > 0) 
  {
    if (
      $("#bal").val().trim() == "" ||
      $("#bal").val() == "undefined" ||
      $("#bal").val() == undefined ||
      $("#bal").val() == "null" ||
      $("#bal").val() == null
    ) 
    {
      alert("Please enter valid amount");
      $("#bal").val("");
      $("#bal").focus();
      return;
    }
  } 
  else 
  {
    alert("Please enter valid amount....");
    $("#bal").val("");
    $("#bal").focus();
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
  $.post("http://localhost:3000/insert_customer_api",
  {
    c_id,
    name,
    phno,
    mpin,
    upi,
    bal,
    ac,
    e_name
  },
  function(response)
  {
    console.log(response.MSG=="inserted");
    console.log(response.MSG);
    console.log(response);
    if(response.MSG=="inserted")
    {
        console.log("insert into");
        alert("Data is successfully inserted");
        window.location="/login";
    }
  }).fail(function(xhr)
  {
    console.log(xhr.status);
          if(xhr.status==400)
          {
           alert("Duplicate Credentials");
          }
          else
          {
            console.log("Hey yeah");
          }
  })

}

