import type { NextApiHandler } from 'next'
 
const Create : NextApiHandler = (req, res) => {
    console.log(req)
    return res.status(200).json({"create":"file"})
}

export default Create;