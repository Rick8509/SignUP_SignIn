////////////////////////////////////used by signUp page/////////////////////////////////////////////////
//create json of form data
const fields = document.getElementsByClassName("fields");
const createJson = () => {
  let jsonObj = {};
  for (i = 0; i < fields.length; i++) {
    var key = fields[i].getAttribute("name");
    jsonObj[key] = fields[i].value;
  }
  console.log(jsonObj);
  return jsonObj;
};

////////////////////////////////////used by SignUp page///////////////////////////////////////////////
//send registration data to express server
const sendData = async () => {
  const jsonObj = createJson();
  const response = await fetch("/signup", {
    method: "POST",
    body: JSON.stringify(jsonObj),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const data = await response.text();
  if (response.status == 315) {
    alert("Email already exists");
    window.location.href = data;
  } else {
    window.location.href = data;
  }
};

///////////////////////////////////used by SignUp page//////////////////////////////////////////////////
//checking either password and re-password are same or not and is checkbox checked or not
const pass = document.getElementById("pass");
const re_pass = document.getElementById("re_pass");
const checkbox = document.getElementById("agree-term");
const matchpass = document.getElementById("matchpass");
const check_sms = document.getElementById("check_sms");
const check_pass = document.getElementById("check_pass");

var checkevething = () => {
  if (
    pass.value == re_pass.value &&
    pass.value.length >= 8 &&
    checkbox.checked
  ) {
    check_sms.innerHTML = ``;
    matchpass.innerHTML = ``;
    check_pass.innerHTML = ``;
    sendData();
  } else if (
    !checkbox.checked &&
    pass.value != re_pass.value &&
    pass.value.length < 8
  ) {
    matchpass.innerHTML = `confirm password doesnot match`;
    check_sms.innerHTML = `Agree to Terms and Conditions`;
    check_pass.innerHTML = `Password must contain at least 8 characters`;
  } else if (!checkbox.checked && pass.value == 0) {
    matchpass.innerHTML = ``;
    check_sms.innerHTML = `Agree to Terms and Conditions`;
    check_pass.innerHTML = `Password cann't be empty`;
  } else if (!checkbox.checked && pass.value != re_pass.value) {
    check_sms.innerHTML = `Agree to Terms and Conditions`;
    check_pass.innerHTML = `Password cannot be empty`;
  } else if (!checkbox.checked && pass.value.length < 8) {
    check_pass.innerHTML = `Password must contain at least 8 characters`;
    check_sms.innerHTML = `Agree to Terms and Conditions`;
    matchpass.innerHTML = ``;
  } else if (!checkbox.checked) {
    matchpass.innerHTML = ``;
    check_pass.innerHTML = ``;
    check_sms.innerHTML = `Agree to Terms and Conditions`;
  } else if (pass.value.length < 8) {
    check_sms.innerHTML = ``;
    matchpass.innerHTML = ``;
    check_pass.innerHTML = `Password must contain at least 8 characters`;
  } else {
    matchpass.innerHTML = `confirm password doesnot match`;
    check_sms.innerHTML = ``;
    check_pass.innerHTML = ``;
  }
};

//////////////////////////////////used by SignIn page//////////////////////////////////////////////////
//create Json of form data and check either checkbox checked or not
const inputfields = document.getElementsByClassName("inputfields");
const rememberme = document.getElementById("remember-me");

const createJsonUser = () => {
  let jsonObj = {};
  for (i = 0; i < inputfields.length; i++) {
    var key = inputfields[i].getAttribute("name");
    jsonObj[key] = inputfields[i].value;
  }
  if (rememberme.checked) {
    jsonObj["rememberme"] = true;
  } else {
    jsonObj["rememberme"] = false;
  }
  console.log(jsonObj);
  return jsonObj;
};

//////////////////////////////////used by SignIn page//////////////////////////////////////////////////
//send login information to express to check user and password
const checkdata = async () => {
  const jsonObj = createJsonUser();
  const response = await fetch("/signin", {
    method: "POST",
    body: JSON.stringify(jsonObj),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const data = await response.text();
  if (response.status == 316) {
    alert("Wrong Username or Password");
    window.location.href = data;
  } else window.document.body.innerHTML = data;
};

//////////////////////////////////used by SignIn page//////////////////////////////////////////////////
//checking eiher field full or not and checkbox is checked or not
const your_name = document.getElementById("your_name");
const your_pass = document.getElementById("your_pass");
const check_name = document.getElementById("check_name");
const user_pass = document.getElementById("user_pass");
const check_rem = document.getElementById("check_rem");

const checkall = () => {
  if (your_name.value != 0 && your_pass.value != 0) {
    check_name.innerHTML = ``;
    user_pass.innerHTML = ``;
    checkdata();
  } else if (your_name.value == 0 && your_pass.value == 0) {
    check_name.innerHTML = `Enter your user email`;
    user_pass.innerHTML = `Enter your password`;
  } else if (your_name.value == 0 && your_pass.value != 0) {
    check_name.innerHTML = `Enter your user email`;
    user_pass.innerHTML = ``;
  } else {
    check_name.innerHTML = ``;
    user_pass.innerHTML = `Enter your password`;
  }
};
