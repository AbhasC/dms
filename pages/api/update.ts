import { mongoClient } from '@/clients/mongo-client';
import type { NextApiHandler } from 'next'
import { ObjectId } from 'mongodb';
 
const Create : NextApiHandler = async (req, res) => {
    try{
      const body = req.body;
      if(body){
        console.log(JSON.stringify(body.newFormat, null, 4))
        const id = new ObjectId(body.newFormat._id);
        console.log({id})
        delete body.newFormat._id;
        console.log({...body.newFormat})
        const mongo = await mongoClient.connect();
        const db = mongo.db("data");
        const collection = db.collection("users");
        collection.replaceOne({"_id": id}, body.newFormat);
        const data = (await collection.findOne({"_id" : id}));
        console.log({data})
        mongoClient.close();
        res.status(200).json({ data });
      }
      res.status(400).json({"error" : "no email given"})
    }
    catch{
    } 
  }

export default Create;