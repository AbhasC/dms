import type { NextApiHandler } from 'next'
 
const Delete : NextApiHandler = (req, res) => {
    console.log(req)
    return res.status(200).json({"delete":"file"})
}

export default Delete;