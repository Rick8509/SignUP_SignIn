const database = require("./database");
const express = require("express");
const app = express();

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/signup", (req, res) => {
  res.sendFile(__dirname + "/public/Sign_up.html");
});

app.get("/signin", (req, res) => {
  res.sendFile(__dirname + "/public/Sign_In.html");
});

app.post("/signup", async (req, res) => {
  try {
    const jsondata = req.body;
    console.log(jsondata);
    var dbresponse = await database.insertdata(jsondata);
    console.log(dbresponse);

    if (dbresponse.acknowledged) res.send("http://localhost:9000/signin");
    else if (dbresponse == 15) {
      res.statusCode = 315;
      res.send("http://localhost:9000/signup");
    } else res.send("http://localhost:9000/signup");
  } catch (err) {
    console.log(err);
  }
});

app.post("/signin", async (req, res) => {
  try {
    const jsondata = req.body;
    const response = await database.checkdata(jsondata);
    console.log(response);
    if (response) {
      res.send("successfully logged in");
    } else {
      res.statusCode = 316; // code for wrong user name or password
      res.send("http://localhost:9000/signin");
    }
  } catch (err) {
    console.log(err);
  }
});

app.listen(process.env.PORT || 9000, () => {
  console.log("listening at the port 9000");
});
