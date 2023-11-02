import { mongoClient } from '@/clients/mongo-client';
import type { NextApiHandler } from 'next'
 
const Create : NextApiHandler = async (req, res) => {
    try{
      const body = req.body;
      if(body){
        const mongo = await mongoClient.connect();
        const db = mongo.db("data");
        const collection = db.collection("users");
        const email = body?.email;
        const type = body?.type;
        let data = await collection.find({"user-email" : email}).toArray();
        
        mongoClient.close();
        res.status(200).json({ data });
      }
      res.status(400).json({"error" : "no email given"})
    }
    catch{
    } 
  }

export default Create;