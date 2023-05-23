let abc = document.getElementById(`naanu`);
abc.addEventListener(`submit`, check);
function check(event) 
{
    event.preventDefault();
    let amt = $("#amt").val();
    if ($("#amt").val().length > 0)
     {
      if ( $("#amt").val().trim() == "" ||$("#amt").val() == "undefined" ||$("#amt").val() == undefined ||$("#amt").val() == "null" ||
        $("#amt").val() == null  || $("#amt").val() <0)
         {
        alert("Please enter valid Amount");
        $("#amt").val("");
  
        $("#amt").focus();
  
        return;
      }
    } 
    else 
    {
      alert("Please enter valid Amount....");
  
      $("#amt").val("");
  
      $("#amt").focus();
  
      return;
    }

    let upi = $("#upi").val();
    if ($("#upi").val().length > 0)
     {
      if ( $("#upi").val().trim() == "" ||$("#upi").val() == "undefined" ||$("#upi").val() == undefined ||$("#upi").val() == "null" ||
        $("#upi").val() == null)
         {
        alert("Please enter valid UPI Pin");
        $("#upi").val("");
  
        $("#upi").focus();
  
        return;
      }
    } 
    else 
    {
      alert("Please enter valid UPI Pin....");
  
      $("#upi").val("");
  
      $("#upi").focus();
  
      return;
    }
    $.post("http://localhost:3000/withdraw_api", // endpoint --
      {
       amt,
       upi
      }, // data set as parameters --
      function (response)
       {
        console.log(response)
        if(response.MSG=="updated")
        {
            window.location="/upi";
        }
      }
    ).fail(function(xhr)
    {
      console.log(xhr.status);
      if(xhr.status==400)
      {
       alert("invalid upi");
      }
      else if(xhr.status==500)
      {
        alert("Insufficient balance")
        console.log("insufficient bal");
      }
    });
  }

  function back()
  {
    window.location="/banking"
  }