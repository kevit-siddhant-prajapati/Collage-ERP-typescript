// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwt = require('jsonwebtoken')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Staff = require('../components/staffs/staffs.model')
import { staffsLogger } from "../components/staffs/staffs.logs"


export default async (req, res, next) => {
    try {
        //below line request the authorization field from header , this will use to get token
        const token = req.header('Authorization')
        
        //Split the Bearer keyword from token
        const tokenarr = token.split(' ')
        //verify Jsonweb token
        const decoded = jwt.verify(tokenarr[1], process.env.JWT_SECRET_CODE)
        if(!decoded){
            staffsLogger.error(`Unable to verify token`)
            throw Error('do not verify token')
        }

        //find the perticular staff of given token
        const staff = await Staff.findOne({_id : decoded._id, 'tokens.token':tokenarr[1]})
        if(!staff){
            staffsLogger.error(`Unable to find Student`)
            throw new Error('Student not found')
        }
        req.token = tokenarr[1]
        staffsLogger.info(`Staff ${staff._id} is successfully login.`)

        //set the value of staff in req.staff for further use in route
        req.staff = staff
        next()
    } catch (e){
        staffsLogger.error(`Authentication fail! with error : ${e}`)
         res.status(401).send({error : 'Please Authenticate',e})
    }
}
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTMwZGQxMmYzMGRjNmQ4NDU5ZmRhNTciLCJpYXQiOjE2OTc3MDMwMDJ9.f9NOvIbW14K-3Jr_vl2bAlH3dff_q3eBTJsaEQwsngw
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTJmYmVlYWU2ZTkzNTU4ZGQ0ODcwYTIiLCJpYXQiOjE2OTc2Mjc5NDZ9.AwKeogx2F0TuIb0eubz2KM2ylRtmrHJdHcJfv42GJk4
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTMwZGQxMmYzMGRjNmQ4NDU5ZmRhNTciLCJpYXQiOjE2OTc3MDMwMDJ9.f9NOvIbW14K-3Jr_vl2bAlH3dff_q3eBTJsaEQwsngw