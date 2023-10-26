import * as mongoose from "mongoose"
const Schema = mongoose.Schema;

interface IAttendance {
    date : Date,
    status : boolean,
    roleOfUser : string,
    userId : mongoose.Schema.Types.ObjectId
}

const attendance = new Schema<IAttendance>({
    date : {
        type : Date,
        required : true
    },
    status : {
        type : Boolean,
        default : false,
    },
    roleOfUser : {
        type : String,
        required :true,
        validate(value:string){
            const roles = ['Student' , 'Staff']
            if(roles.indexOf(value) === -1){
                throw new Error('Enter valid role')
            }
        }
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        //ref : ["Student", "Staff"]
    }
})



const Attendance = mongoose.model<IAttendance>('Attendance', attendance)
module.exports = Attendance