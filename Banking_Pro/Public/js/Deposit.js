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

    $.post("http://localhost:3000/deposit_api", // endpoint --
      {
       amt
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
       alert("Invalid amount");
      }
      else
      {
        console.log("Hey yeah");
      }
    });
  }

  function back()
  {
    window.location="/banking"
  }