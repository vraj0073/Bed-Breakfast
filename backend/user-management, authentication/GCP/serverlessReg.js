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
 
 exports.serverlessRegistration = async (req, res) => {
   if (req.method === "OPTIONS") {
     // Send response to OPTIONS requests
     res.set("Access-Control-Allow-Methods", "POST");
     res.set("Access-Control-Allow-Headers", "Content-Type");
     res.set("Access-Control-Max-Age", "3600");
     res.set("Access-Control-Allow-Origin", "*");
     res.set("Content-Type", "application/json");
     res.status(204).send("");
   } else {
     const key = Math.floor(Math.random() * 25) + 1;
 
     await admin.firestore().collection("users").add({
       username: req.body.username,
       answer: req.body.answer.toLowerCase(),
       key,
     });
     res.set("Access-Control-Allow-Origin", "*");
     res.set("Content-Type", "application/json");
     res.status(200).send({ message: "Authentication key is " + key });
   }

   res.set("Access-Control-Allow-Origin", "*");
   res.set("Content-Type", "application/json");
   res.status(500).send({ message: "Internal server error" });
 };
 