// function check()
// {
//     // $.post("http://localhost:8080/check_api", // endpoint --
//     //   {

//     //   }, // data set as parameters --
//     //   function (response)
//     //    {
//     //     console.log(response)
//     //     console.log(response.MSG[0].Balance);
//     //     let a="Rs."+response.MSG[0].Balance+"/-";
//     //     console.log(a);
//     //     document.getElementById(`bala`).innerHTML=a;
//     //   }
//     // ).fail(function(xhr)
//     // {
//     //   console.log(xhr.status);
//     //   if(xhr.status==400)
//     //   {
//     //    alert("Insufficient fund");
//     //   }
//     //   else
//     //   {
//     //     console.log("Hey yeah");
//     //   }
//     // });
// }


document.getElementById('showPassword').onclick = function()
      {
        if ( this.checked ) {
          document.getElementById('upi').type = "text";
        } else {
          document.getElementById('upi').type = "Password";
        }
      };

let abc = document.getElementById(`naanu`);
abc.addEventListener(`submit`, check);
function check(event) 
{
    event.preventDefault();
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
    $.post("http://localhost:3000/check_api", // endpoint --
      {
        upi
      }, // data set as parameters --
      function (response)
       {
        console.log(response)
        console.log(response.MSG[0].Balance);
        let a="Rs."+response.MSG[0].Balance+"/-";
        console.log(a);
        document.getElementById(`bala`).innerHTML=a;
      }
    ).fail(function(xhr)
    {
      console.log(xhr.status);
      if(xhr.status==400)
      {
        document.getElementById(`bala`).innerHTML="invalid upi";
       alert("Invalid upi");
       
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