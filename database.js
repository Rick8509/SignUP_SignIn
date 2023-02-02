const { MongoClient, ServerApiVersion } = require("mongodb");

const dbconnection = () => {
  const uri =
    "mongodb+srv://asdf:Z8hRXqw_.s.WfYp@cluster0.jpmva3q.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });
  return client;
};

const getdata = async () => {
  var client = dbconnection();
  try {
    var coll = client.db("mydata").collection("first");
    var response = await coll.find().toArray();
    return response;
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

const insertdata = async (data) => {
  var client = dbconnection();
  try {
    var check_email = await getdata();
    for (i = 0; i < check_email.length; i++) {
      if (check_email[i].email == data.email) {
        return 15; //code for email already exists
      }
    }
    var coll = client.db("mydata").collection("first");
    var response = await coll.insertOne(data);
    return response;
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

const checkdata = async (data) => {
  var response = await getdata();
  for (i = 0; i < response.length; i++) {
    if (response[i].email == data.user_name) {
      if (response[i].pass == data.user_pass) {
        return true;
      }
    }
  }
  return false;
};

module.exports = { insertdata, getdata, checkdata };
