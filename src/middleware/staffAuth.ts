const jwt = require('jsonwebtoken')
const Staff = require('../components/staffs/staffs.model')

export default async (req, res, next) => {
    try {
        const token = req.header('Authorization')
        
        const tokenarr = token.split(' ')
        // console.log(`Token: ${tokenarr[1]}`)
        const decoded = jwt.verify(tokenarr[1], "secreteJwtToken")
        if(!decoded){
            throw Error('do not verify token')
        }
        const staff = await Staff.findOne({_id : decoded._id, 'tokens.token':tokenarr[1]})
        if(!staff){
            throw new Error('Student not found')
        }
        req.token = tokenarr[1]
        req.staff = staff
        next()
    } catch (e){
         res.status(401).send({error : 'Please Authenticate'})
    }
}
