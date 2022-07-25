"use strict";
const AWS = require("aws-sdk");
const {PubSub} = require("@google-cloud/pubsub");
const dynamoDb = new AWS.DynamoDB();
const dynamoClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });

const pubSubClient = new PubSub({
  projectId: "serverless-csci5410",
  keyFilename: "key.json"
});

exports.handler = async (event, context, callback) => {
  let bodyData;
  if (!event.body) {
    //from LEX
    bodyData = {
      item: event["interpretations"][0]["intent"]["slots"]["Item"]["value"][
        "originalValue"
      ],
      qty: parseInt(
        event["interpretations"][0]["intent"]["slots"]["Qty"]["value"][
          "originalValue"
        ]
      ),
      day: event["interpretations"][0]["intent"]["slots"]["Day"]["value"][
        "originalValue"
      ],
      bookingId:
        event["interpretations"][0]["intent"]["slots"]["BookingId"]["value"][
          "originalValue"
        ],
    };
  } else {
    //from API Gateway
    bodyData = JSON.parse(event.body);
  }

  try {
    let item = {
      TableName: "kitchen-group12",
      Key: {
        item: { S: bodyData.item },
      },
    };
    const itemDetails = await dynamoDb.getItem(item).promise();
    const itemDetailsJSON = AWS.DynamoDB.Converter.unmarshall(
      itemDetails["Item"]
    );

    let date = "";
    if (bodyData.day === "today") {
      date = new Date().toISOString().split("T")[0];
    } else {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      date = tomorrow.toISOString().split("T")[0];
    }

    console.log("Date ", date);
    const qty = itemDetailsJSON[date];

    if (bodyData.qty > qty) {
      if (!event.body) {
        //for LEX
        return {
          sessionState: {
            dialogAction: {
              type: "Close",
            },
            intent: {
              confirmationState: "Confirmed",
              name: "OrderFood",
              state: "Fulfilled",
            },
          },
          messages: [
            {
              contentType: "PlainText",
              content: "Item out of stock",
            },
          ],
        };
      } else {
        //for API Gateway
        bodyData = JSON.parse(event.body);
        return {
          statusCode: 401,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: "Item out of stock" }),
        };
      }
    }

    const updatedQty = qty - bodyData.qty;
    let updateItem = {
      TableName: "kitchen-group12",
      Key: {
        item: bodyData.item,
      },
      UpdateExpression: "set #date = :dateValue",
      ExpressionAttributeNames: {
        "#date": date,
      },
      ExpressionAttributeValues: {
        ":dateValue": updatedQty,
      },
    };

    const price = getPrice(bodyData.item);
    const updatedResult = await dynamoClient.update(updateItem).promise();

    const pubSubMsg = await sendToHotelMgmt({
      type: "kitchen",
      bookingId: bodyData.bookingId,
      price: bodyData.qty * price,
    });

    console.log(pubSubMsg);

    if (!event.body) {
      //for LEX
      return {
        sessionState: {
          dialogAction: {
            type: "Close",
          },
          intent: {
            confirmationState: "Confirmed",
            name: "OrderFood",
            state: "Fulfilled",
          },
        },
        messages: [
          {
            contentType: "PlainText",
            content: `${bodyData.qty} ${bodyData.item} ordered successfully for ${bodyData.day}`,
          },
        ],
      };
    } else {
      //for API Gateway
      bodyData = JSON.parse(event.body);
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `${bodyData.qty} ${bodyData.item} ordered successfully for ${bodyData.day}`,
        }),
      };
    }
  } catch (e) {
    console.log(e);
  }
};

const getPrice = (item) => {
  switch (item) {
    case "pancakes":
      return 10;
    case "bread-butter":
      return 5;
    case "sandwich":
      return 7;
    case "oatmeal":
      return 4;
    case "coffee":
      return 3;
    default:
      return 0;
  }
};

const sendToHotelMgmt = async (message) => {
  try {
    const topicName = "kitchen";
    const dataBuffer = Buffer.from(JSON.stringify(message));

    console.log("sending now");
    const messageId = await pubSubClient
      .topic(topicName)
      .publishMessage({data: dataBuffer});
    return `Message ${messageId} published.`;
  } catch (error) {
    console.log("Error -",error);
    return `Received error while publishing: ${error.message}`;
  }
};

//