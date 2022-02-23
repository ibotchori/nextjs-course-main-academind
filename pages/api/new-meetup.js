import { MongoClient } from "mongodb";

// /api/anew-meetup
// POST /api/anew-meetup

async function handler(req, res) {
  if (req.method === "POST") {
    /* Get request */
    // export information from incoming data
    const data = req.body;

    /* Store data in the database */
    // Connect to mongodb cluster
    const client = await MongoClient.connect(
      "mongodb+srv://irakli:irakli83@cluster0.xvnnn.mongodb.net/meetups?retryWrites=true&w=majority"
    );

    // Call db method on the client object
    const db = client.db();

    // Access to collection
    const meetupCollection = db.collection("meetups");

    // insert one new document into this collection, with exported data object
    const result = await meetupCollection.insertOne(data);

    console.log(result);

    // Close database connection
    client.close();

    /* Send back a response */
    // send HTTP status code with status method, if something was inserted successfully and send a message.
    res.status(201).json({ message: "Meetup Inserted!" });
  }
}

export default handler;
