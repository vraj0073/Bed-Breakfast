/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */

var admin = require("firebase-admin");
var serviceAccount = require("./serverless-bb-firebase-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://serverless-bb-default-rtdb.firebaseio.com",
});

exports.serverlessQA = async (req, res) => {
  if (req.method === "OPTIONS") {
    // Send response to OPTIONS requests
    res.set("Access-Control-Allow-Methods", "POST");
    res.set("Access-Control-Allow-Headers", "Content-Type, Auth");
    res.set("Access-Control-Max-Age", "3600");
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Content-Type", "application/json");
    res.status(204).send("");
  } else {
    const response = await admin
      .firestore()
      .collection("users")
      .where("username", "==", req.body.username)
      .get();

    if (!response.empty) {
      if (!(response.docs[0].data().answer === req.body.answer)) {
        res.set("Access-Control-Allow-Origin", "*");
        res.set("Content-Type", "application/json");
        res.status(401).send({ message: "Incorrect security answer" });
      } else {
        res.set("Access-Control-Allow-Origin", "*");
        res.set("Content-Type", "application/json");
        res.status(200).send({ message: "Answer is correct" });
      }
    } else {
      res.set("Access-Control-Allow-Origin", "*");
      res.set("Content-Type", "application/json");
      res.status(401).send({ message: "User not found!" });
    }
  }
};