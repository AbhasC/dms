import type { NextApiHandler } from 'next'
 
const Update : NextApiHandler = (req, res) => {
    return res.status(200).json({"update":"file"})
}

export default Update;