import type { NextApiHandler } from 'next'
 
const Update : NextApiHandler = (req, res) => {
    console.log(req.body.auth0)
    return res.status(200).json({"update":"file"})
}

export default Update;