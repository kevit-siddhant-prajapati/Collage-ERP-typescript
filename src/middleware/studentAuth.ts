const jwt = require('jsonwebtoken')
const Student = require('../components/students/students.model')

export default async (req, res, next) => {
    try {
        const token = req.header('Authorization')
        
        const tokenarr = token.split(' ')
        // console.log(`Token: ${tokenarr[1]}`)
        const decoded = jwt.verify(tokenarr[1], "secreteJwtToken")
        if(!decoded){
            throw Error('do not verify token')
        }
        const student = await Student.findOne({_id : decoded._id, 'tokens.token':tokenarr[1]})
        if(!student){
            throw new Error('Student not found')
        }
        req.token = tokenarr[1]
        req.student = student
        next()
    } catch (e){
         res.status(401).send({error : 'Please Authenticate'})
    }
}
