function withdraw()
{
    window.location='/draw';
}
function deposit()
{
    window.location="/depo";
}
function checkbal()
{
    window.location="/bal";
}
function back()
{
    window.location="/login"
}
function add()
{
    $.post("http://localhost:8080/name_extract_api", // endpoint --
      {

      }, // data set as parameters --
      function (response)
       {
        console.log(response)
        console.log(response.MSG[0].Name);
        let z="Hi, "+response.MSG[0].Name;
        console.log(z);
        document.getElementById(`inserting`).innerHTML=z;
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