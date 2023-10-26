// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwt = require('jsonwebtoken')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Student = require('../components/students/students.model')

/**
 * @description this studentAuth do authentication of student
*/

export default async (req, res, next) =>{
    try {
        const token = req.header('Authorization').replace('Bearer ','');
        const decoded = jwt.verify(token, process.env.JWT_SECRET_CODE)   //there is problem
        if(!decoded){
            throw Error('do not verify token')
        }
        const student = await Student.findOne({_id : decoded._id, 'tokens.token':token})
        if(!student){
            throw new Error('User not found')
        }
        req.token = token
        req.student = student
        next()
    } catch (e){
         res.status(401).send({error : `Please authenticate with Error: ${e}`})
    }
}
