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

exports.serverlessAuth = async (req, res) => {
  if (req.method === "OPTIONS") {
    // Send response to OPTIONS requests
    res.set("Access-Control-Allow-Methods", "POST");
    res.set("Access-Control-Allow-Headers", "Content-Type");
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
      const key = response.docs[0].data().key;
      const text = req.body.text;
      let correctAns = "";
      if (req.body.type === "plain") {
        for (let i = 0; i < text.length; i++) {
          if (text.charCodeAt(i) + key > 122) {
            correctAns += String.fromCharCode(text.charCodeAt(i) + key - 26);
          } else {
            correctAns += String.fromCharCode(text.charCodeAt(i) + key);
          }
        }
      } else {
        for (let i = 0; i < text.length; i++) {
          if (text.charCodeAt(i) - key < 97) {
            correctAns += String.fromCharCode(text.charCodeAt(i) - key + 26);
          } else {
            correctAns += String.fromCharCode(text.charCodeAt(i) - key);
          }
        }
      }

      if (correctAns !== req.body.caesarAns) {
        res.set("Access-Control-Allow-Origin", "*");
        res.set("Content-Type", "application/json");
        res.status(401).send({ message: "Incorrect caesar cipher answer" });
      }
      res.set("Access-Control-Allow-Origin", "*");
      res.set("Content-Type", "application/json");
      res.status(200).send({ message: "User authenticated" });
    } else {
      res.set("Access-Control-Allow-Origin", "*");
      res.set("Content-Type", "application/json");
      res.status(401).send({ message: "User not found!" });
    }
  }
};
