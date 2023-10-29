import type { NextApiHandler } from 'next'
 
const Delete : NextApiHandler = (req, res) => {
    return res.status(200).json({"delete":"file"})
}

export default Delete;