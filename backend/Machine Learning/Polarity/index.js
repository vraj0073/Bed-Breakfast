var AWS = require("aws-sdk");
var language = require("@google-cloud/language");
const client = new language.LanguageServiceClient({
  projectId: "polished-trail-340322",
  keyFilename: "./creds.json",
});
var ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

exports.handler = async (event) => {
  // TODO implement
  console.log(event.body)
  const newParsedJSON = JSON.parse(event.body);

  // const positiveText = "Yeah thats a good job"
  console.log(newParsedJSON.Feedback);
  console.log(newParsedJSON.booking_id);
  const positiveDocument = {
    type: "PLAIN_TEXT",
    content: newParsedJSON.Feedback,
  };
  var sentiment_type;
  var sentiment_score;
  await client
    .analyzeSentiment({ document: positiveDocument })
    .then((results) => {
      const sentiment = results[0].documentSentiment;
      if (sentiment.score > 0.25) {
        sentiment_type = "Postive";
        console.log("Postive");
        sentiment_score = "10";
      } else if (sentiment.score < -0.25) {
        console.log("Negative");
        sentiment_type = "Negative";
        sentiment_score = "3";
      } else {
        console.log("Neutral");
        sentiment_type = "Neutral";
        sentiment_score = "5";
      }
    });
  var params = {
    TableName: "group12_feedback",
    Item: {
      booking_id: { S: newParsedJSON.booking_id },
      Feedback: { S: newParsedJSON.Feedback },
      sentiment_type: { S: sentiment_type },
      sentiment_score: { S: sentiment_score },
      room_number:{S: ''+parseInt(Math.random() * (20-1)+1)}
    },
  };
  console.log(params);

  const response = await ddb.putItem(params).promise();

  console.log("Success ",response);
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: "Test successful" }),
  };
};