const jwt = require('jsonwebtoken')
const Admin = require('../components/admins/admin.model')

export default async (req, res, next) => {
    try {
        //console.log("Admin authorization is call")
        //below line request the authorization field from header , this will use to get token
        const token = req.header('Authorization')
        
        //Split the Bearer keyword from token
        const tokenarr = token.split(' ')
    
        //verify Jsonweb token
        const decoded = jwt.verify(tokenarr[1], "secreteJwtToken")
        if(!decoded){
            throw Error('do not verify token')
        }

        //find the perticular admin of given token
        const admin = await Admin.findOne({_id : decoded._id, 'tokens.token':tokenarr[1]})
        if(!admin){
            throw new Error('Student not found')
        }
        req.token = tokenarr[1]

        //set the value of admin in req.admin for further use in route
        req.admin = admin
        next()
    } catch (e){
         res.status(401).send({error : 'Please Authenticate'})
    }
}
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTJmYTY1Njc2Y2NlNjA5Y2M2ZTlmNmEiLCJpYXQiOjE2OTc3MjAxMTJ9.0lnvHH0Rb2wY2er2DOiJ0SKToQa6h7HrugjGyvIWqH8