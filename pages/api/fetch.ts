import { mongoClient } from '@/clients/mongo-client';
import { NextApiHandler } from 'next';

const Fetch : NextApiHandler = async (req, res) => {
  try{
    const email = req.query?.email ?? "";
    const mongo = await mongoClient.connect();
    const db = mongo.db("data");
    const collection = db.collection("users");
    const data = await collection.find({"user-email" : email}).toArray();
    if(data.length === 0){
      //
    }
    mongoClient.close();
    res.status(200).json({ data });
  }
  catch(e){
    console.log(e);
  } 
}

export default Fetch;