import { mongoClient } from '@/clients/mongo-client';
import { NextApiHandler } from 'next';

const Fetch : NextApiHandler = async (req, res) => {
  try{
    const email = req.query?.email;
    if(email){
      const mongo = await mongoClient.connect();
      const db = mongo.db("data");
      const collection = db.collection("users");
      let data = await collection.find({"user-email" : email}).toArray();
      if(data.length === 0){
        const blank = 
        {"user-email":email,
        "folders":[],
        "files":[]}
        collection.insertOne(blank);
        data = await collection.find({"user-email" : email}).toArray();
      }
      mongoClient.close();
      res.status(200).json({ data });
    }
    res.status(400).json({"error" : "no email given"})
  }
  catch{
  } 
}

export default Fetch;