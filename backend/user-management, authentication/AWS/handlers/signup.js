const AWS = require("aws-sdk");
const constants = require("../constants");
const cognito = new AWS.CognitoIdentityServiceProvider();

const signup = async (event) => {
  try {
    const body = JSON.parse(event.body);

    const listParams = {
      UserPoolId: "us-east-1_3xpu*****",
      AttributesToGet: ["email"],
      Filter: "email=" + JSON.stringify(body.email),
    };
    const listResponse = await cognito.listUsers(listParams).promise();
    if (listResponse.Users && listResponse.Users.length > 0) {
      return {
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: "Account with email already exists" }),
      };
    }

    let username = "";
    if (body.firstName.length > 3) {
      username += body.firstName.substring(0, 3);
    } else {
      username = body.firstName;
    }

    if (body.lastName.length > 3) {
      username += body.lastName.substring(0, 3);
    } else {
      username += body.lastName;
    }

    username += body.phoneNumber.substring(body.phoneNumber.length - 4);
    username += Math.floor(Math.random() * 89) + 10;
    const params = {
      ClientId: constants.ClientId,
      Username: username,
      UserAttributes: [
        {
          Name: "email",
          Value: body.email,
        },
        {
          Name: "name",
          Value: body.firstName + " " + body.lastName,
        },
        {
          Name: "phone_number",
          Value: body.phoneNumber,
        },
      ],
      Password: body.password,
    };

    const response = await cognito.signUp(params).promise();
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: "User created successfully", username: username }),
    };
  } catch (error) {
    console.log(error);
    const message = error.message ? error.message : "Internal server error";

    if (error.code === "UsernameExistsException") {
      //username + 1 random 0-9 
      
      return {
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: "Username already exists" }),
      };
    }
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: message }),
    };
  }
};

module.exports = signup;
