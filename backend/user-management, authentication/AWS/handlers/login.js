const AWS = require("aws-sdk");
const constants = require("../constants");
const cognito = new AWS.CognitoIdentityServiceProvider();

const login = async (event) => {
  try {
    const body = JSON.parse(event.body);

    const params = {
      ClientId: constants.ClientId,
      AuthFlow: "USER_PASSWORD_AUTH",
      AuthParameters: {
        USERNAME: body.email,
        PASSWORD: body.password,
      },
    };
    const response = await cognito.initiateAuth(params).promise();

    const getUserParams = {
      AccessToken: response.AuthenticationResult.AccessToken,
    };
    const user = await cognito.getUser(getUserParams).promise();
    const email = user.UserAttributes.filter(attr => attr.Name === 'email');
    const responseBody = {
      ...response,
      Username: user.Username,
      Email: email[0].Value
    };

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(responseBody),
    };
  } catch (error) {
    console.log(error);
    const message = error.message ? error.message : "Internal server error";
    if (error.code === "UserNotFoundException") {
      const body = JSON.parse(event.body);
      if (validateEmail(body.email)) {
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
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: "User is not confirmed." }),
          };
        }
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

const validateEmail = (email) => {
  var pattern =
    /^[a-zA-Z0-9.a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/;
  if (email.match(pattern)) {
    return true;
  }
  return false;
};

module.exports = login;
