const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");
const { stringify } = require("querystring");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cors());
app.options("*", cors());

app.set("views", __dirname + "/public");
app.use(express.static(path.join(__dirname, "public")));
console.log(__dirname);

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

// Database connectivity
const con = mysql.createConnection({
  host: "localhost",
  database: "Bank_Pro",
  user: "root",
  password: "root",
});

con.connect(function (err) {
  if (err) {throw err;}
  else{console.log("connected");}
});


//LOG in
var tid=[];
app.get("/login", function (req, res) {
  res.render(__dirname + "/pages/login.html");
});

app.post("/post_api", (req, res) => {
  tid=[];
  console.log("POST API");
  tid.push({
    id:req.body.c_id
  })
  console.log(req.body); 
  let z="Select state from customer_details where CustomerID= '" + req.body.c_id + "';";
  let a = "select * from customer_login where CustomerID= '" + req.body.c_id + "';";
  con.query(a, function (err, result) {
    if (err)
    {
      throw err;
    } 
    else 
    {
      con.query(z,(errs,results)=>
      {
        if(errs) throw errs;
        else
        {
          console.log(results[0].state);
          console.log(results[0].state=='A');
          console.log(results[0].state==='A');
          if(results[0].state=='A')
          {
            console.log(result);
            console.log(tid);
            console.log(tid[0].id);
            if(result.length==0)
            {
              res.status(400).json({ MSG: "No data" });
            }
            else
            {
              if(result[0].mpin==req.body.mpin)
              {
                res.status(200).json({ MSG: "received" });
              }
              else
              {
                res.status(400).json({ MSG: "wrong mpin" });
              }
            }
          }
          else
          {
            res.status(402).json({ MSG: "deleted" });
          }
        }
      })
      
    }
  }
  );
});


//Name Extract
app.post("/name_extract_api", (req, res) => {
  console.log("Name Extract POST API");
  console.log(req.body); 
  let a = "select Name from customer_details where CustomerID= '" + tid[0].id + "';";
  con.query(a, function (err, result) {
    if (err)
    {
      throw err;
    } 
    else 
    {
      console.log(result);
      console.log(tid);
      console.log(tid[0].id);
      if(result.length==0)
      {
        res.status(400).json({ MSG: "No data" });
      }
      else
      {
          res.status(200).json({ MSG: result });
      }
    }
  }
  );
});



//Banking
app.get("/banking", function (req, res) {
  res.render(__dirname + "/pages/Banking.html");
});

app.get("/draw", function (req, res) {
  res.render(__dirname + "/pages/Withdrawal.html");
});
app.post("/withdraw_api", (req, res) => {
  console.log("Withdraw API");
  console.log(req.body); 
  console.log(tid);
  let z="select ";
  let a = "select * from customer_details where CustomerID= '" + tid[0].id + "';";
  console.log(a);
  con.query(a, function (err, result) {
    if (err)
    {
      throw err;
    } 
    else 
    {
      console.log(result);
      console.log(result[0].upi_pin);
      if(result[0].upi_pin==req.body.upi)
      {
        console.log(result[0].Balance);
      let x=parseInt(result[0].Balance);
      console.log("x"+x);
      let y=parseInt(req.body.amt);
      console.log("y"+y);

      if(x>=y)
      {
        const z=x-y;
      console.log(z);
      let b="update customer_details set Balance='"+z+"' where CustomerID= '" + tid[0].id + "';";
      console.log(b);
      con.query(b,function(err1,result1)
      {
        if(err1)
        {
          throw err1;
        }
        else
        {
          res.status(200).json({ MSG: "updated" });
        }
      })
      }
      else
      {
        res.status(500).json({ MSG: "insufficient bal" });
      }
      }
      else
      {
        res.status(400).json({ MSG: "Invalid upi" });
      }
    }
  });
});


app.get("/depo", function (req, res) {
  res.render(__dirname + "/pages/Deposit.html");
});
app.post("/deposit_api", (req, res) => {
  console.log("POST API");
  console.log(req.body); 
  let a = "select * from customer_details where CustomerID= '" + tid[0].id + "';";
  con.query(a, function (err, result) {
    if (err)
    {
      throw err;
    } 
    else 
    {
      console.log(result[0].Balance);
      let x=parseInt(result[0].Balance);
      console.log("x"+x);
      let y=parseInt(req.body.amt);
      console.log("y"+y);
      const z=x+y;
      console.log(z);
      let b="update customer_details set Balance='"+z+"' where CustomerID= '" + tid[0].id + "';";
      console.log(b);
      con.query(b,function(err1,result1)
      {
        if(err1)
        {
          throw err1;
        }
        else
        {
          res.status(200).json({ MSG: "updated" });
        }
      })
    }
  });
});


app.get("/bal", function (req, res) {
  res.render(__dirname + "/pages/CheckBalance.html");
});
app.post("/check_api", (req, res) => {
  console.log("POST API");
  console.log(req.body); 
  let a = "select * from customer_details where CustomerID= '" + tid[0].id + "';";
  con.query(a, function (err, result) {
    if (err)
    {
      throw err;
    } 
    else 
    {
      if(result.length==0)
      {
        res.status(400).json({ MSG: "no" });
      }
      else
      {
        if(result[0].upi_pin==req.body.upi)
        {
          res.status(200).json({ MSG: result });
        }
        else
        {
          res.status(400).json({ MSG: "wrong upi" });
        }
      }
    }
  });
});

app.get("/upi", function (req, res) {
  res.render(__dirname + "/pages/Transaction_Success.html");
});

//Reset mpin
app.get("/reset_upi", function (req, res) {
  res.render(__dirname + "/pages/Reset_mpin.html");
});
app.post("/reset_mpin_api", (req, res) => {
  console.log("Reset mpin POST API");
  console.log(req.body); 
  let a = "select * from customer_details where CustomerID= '" + req.body.c_id + "';";
  console.log(a);
  // let a1="select PhNo from customer_details where CustomerID="
  con.query(a, function (err, result) {
    if (err)
    {
      throw err;
    } 
    else 
    {
      if(result.length==0)
      {
        res.status(404).json({ MSG: "no details" });
      }
      else
      {
        console.log(result[0].PhNo);
        console.log(result[0].PhNo==req.body.phno);
        if(result[0].PhNo==req.body.phno)
        {
          let b="update customer_login set mpin='"+req.body.mpin+"' where CustomerID= '" + req.body.c_id + "';";
          console.log(b);
          con.query(b,function(err1,result1){
            if(err1)
            {
              throw err1;
            }
            else
            {
              res.status(200).json({ MSG: "success" });
            }
          })
        }
        else
        {
          res.status(400).json({ MSG: "phone number not matching" });
        }
      }
    }
  });
});



//Insert newuser
app.get("/newuser", function (req, res) {
  res.render(__dirname + "/pages/Insert_New_User.html");
});
app.post("/insert_customer_api", (req, res) => {
  console.log("Insert POST API");
  var date=new Date();
  var dd=String()
  console.log(req.body); 
  let a = "select * from customer_login where CustomerId= '" + req.body.c_id + "';";
  console.log(a);
  con.query(a, function (err, result) {
    if (err)
    {
      throw err;
    } 
    else 
    {
      if(result.length>0)
      {
        res.status(400).json({ MSG: "duplicate data" });
      }
      else
      {
        let z="Select sysdate() as ab;";
        con.query(z,function(errz,resultz){
          if(errz)
          {
            throw errz
          }
          else
          {
            console.log(resultz[0].ab);
            let y=resultz[0].ab
            console.log(y);
            let date=new Date(y);
            console.log(date.getDay());
            console.log(date.getUTCDate());
            var dd=date.getDate();
            var mm=date.getMonth()+1;
            var yy=date.getFullYear();
            var date1=yy+'-'+mm+'-'+dd;
            console.log(date1);
            // console.log(date1.toDateString());
            // console.log(date);
            // console.log(date.toLocaleDateString());
            // console.log(date.toDateString());
            let c="Insert into customer_login(CustomerID,Account_Number,mpin) values('"+req.body.c_id+"','"+req.body.ac+"','"+req.body.mpin+"');";
        console.log(c);
        let b="Insert into customer_details(CustomerID,Name,PhNo,upi_pin,Balance,Created_By,Created_on,Modified_by,Modified_on,state) values('"+req.body.c_id+"','"+req.body.name+"','"+req.body.phno+"','"+req.body.upi+"','"+req.body.bal+"','Bharathraj','2023-05-21','"+req.body.e_name+"','"+date1+"','A');";
        console.log(b);
        con.query(c, function(err1,result1){
          if(err1)
          {
            throw err1;
          }
          else
          {
            console.log(result1);
            con.query(b,function(err2,result2)
            {
              if(err2)
              {
                throw err2;
              }
              else
              {
                res.status(200).json({MSG:"inserted"});
              }
            })
          }
        })
          }
        })
      }
    }
  });
});


//Employee login
let eid=[];
app.get("/emp", function (req, res) {
  res.render(__dirname + "/pages/Employee.html");
});
app.post("/employee_api", (req, res) => {
  console.log("Employee POST API");
  eid=[];
  console.log(req.body); 
  eid.push({
    id:req.body.e_id
  })
  let a = "select * from employee_table where E_Id= '" + req.body.e_id +"';";
  console.log(a);
  con.query(a, function (err, result) {
    if (err)
    {
      throw err;
    } 
    else 
    {
      console.log(result);
      console.log(result[0].Password);
      console.log(req.body.pass);
      console.log(result[0].Password==req.body.pass);
      if(result.length==0)
      {
        res.status(400).json({ MSG: "invalid credentials" });
      }
      else
      {
        if(result[0].Password==req.body.pass)
        {
          res.status(200).json({MSG:result});
        }
        else
        {
          res.status(400).json({ MSG: "invalid credentials" });
        }
      }
    }
  });
});

//Customer delete
let eid1=[];
app.get("/del", function (req, res) {
  res.render(__dirname + "/pages/Delete_Customer.html");
});
app.post("/delete_api", (req, res) => {
  console.log("Delete POST API");
  eid1=[];
  console.log(req.body); 
  eid1.push({
    id:req.body.e_id
  })
  let a = "select * from employee_table where E_Id= '" + req.body.e_id +"';";
  console.log(a);
  con.query(a, function (err, result) {
    if (err)
    {
      throw err;
    } 
    else 
    {
      console.log(result);
      console.log(result[0].Password);
      console.log(req.body.pass);
      console.log(result[0].Password==req.body.pass);
      if(result.length==0)
      {
        res.status(400).json({ MSG: "invalid credentials" });
      }
      else
      {
        if(result[0].Password==req.body.pass)
        {
          res.status(200).json({MSG:result});
        }
        else
        {
          res.status(400).json({ MSG: "invalid credentials" });
        }
      }
    }
  });
})

app.get("/removeuser", function (req, res) {
  res.render(__dirname + "/pages/Remove_Customer.html");
});
app.post("/remove_customer_api", (req, res) => {
  console.log("Remove Customer POST API");
  let a="select * from customer_login where CustomerId= '" + req.body.c_id + "';";
  console.log(a);
  let date=new Date();
  console.log(date.getDay());
  console.log(date.getUTCDate());
  var dd=date.getDate();
  var mm=date.getMonth()+1;
  var yy=date.getFullYear();
  var date1=yy+'-'+mm+'-'+dd;
  console.log(date1);
  con.query(a,(err,result)=>
  {
    if(err) throw err;
    else
    {
      if(result.length>0)
      {
          let b="select * from customer_details where CustomerId= '" + req.body.c_id + "';";
          console.log(b);
          con.query(b,(err1,result1)=>{
            if(err1) throw err1;
            else
            {
              console.log(result1);
              console.log(req.body);
              if(result1[0].State=='A')
              {
                console.log("State Pass");
                if(result[0].Account_Number==req.body.ac)
                {
                  console.log("ACC");
                  if(result1[0].Name==req.body.name)
                  {
                    console.log("Name");
                    if(result1[0].PhNo==req.body.phno)
                    {
                      console.log("Phno");
                      let c="update customer_details set State='D',Modified_on='"+date1+"' where CustomerId= '" + req.body.c_id + "';";
                      console.log(c);
                      con.query(c,(err2,result2)=>
                      {
                        if(err2) throw err2;
                        else
                        {
                          console.log(result2);
                          res.status(200).json({MSG:"Deleted"})
                        }
                      })
                    }
                    else
                    {
                      res.status(404).json({MSG:"Phone Number is Not Matching"})
                    }
                  }
                  else
                  {
                    res.status(403).json({MSG:"Name is Not Matching"})
                  }
                }
                else
                {
                  res.status(402).json({MSG:"Account No. is Not Matching"})
                }
              }
              else
              {
                res.status(401).json({MSG:"User is Already Deleted"})
              }
            }
          })
      }
      else
      {
        res.status(400).json({MSG:"Data is Not found"})
      }
    }
  }
  );
});



//Employee Extract for Adding
app.post("/emp_extract_api", (req, res) => {
  console.log("Name Extract for Adding POST API");
  console.log(req.body); 
  let a = "select Name from employee_table where E_Id= '" + eid[0].id + "';";
  console.log(a);
  con.query(a, function (err, result) {
    if (err)
    {
      throw err;
    } 
    else 
    {
      console.log(result);
      console.log(eid);
      console.log(eid[0].id);
      if(result.length==0)
      {
        res.status(400).json({ MSG: "No data" });
      }
      else
      {
          res.status(200).json({ MSG: result });
      }
    }
  }
  );
});



//Employee Extract for Delete
app.post("/emp_extract1_api", (req, res) => {
  console.log("Name Extract for delete POST API");
  console.log(req.body); 
  let a = "select Name from employee_table where E_Id= '" + eid1[0].id + "';";
  console.log(a);
  con.query(a, function (err, result) {
    if (err)
    {
      throw err;
    } 
    else 
    {
      console.log(result);
      console.log(eid1);
      console.log(eid1[0].id);
      if(result.length==0)
      {
        res.status(400).json({ MSG: "No data" });
      }
      else
      {
          res.status(200).json({ MSG: result });
      }
    }
  }
  );
});


app.listen(3000, function () {
  console.log("server is running on port 3000");
});
