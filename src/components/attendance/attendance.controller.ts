import { Request, Response } from "express";
const Attendance = require('./attendance.model')
import { staffsLogger } from "../staffs/staffs.logs";
import { studentsLogger } from "../students/students.logs";
const Student = require('../students/students.model')
const Staff = require('../staffs/staffs.model')

class AttendanceController {

    async fillStudentAttendance(req:Request, res:Response){
        try {
            const attendStudent = req.body.attendance;
    
            for (const attendie of attendStudent) {
                const student = await Student.findById(attendie);
                if (student) {
                    student.attendance += 1;

                    // there is change
                    const attendanceDetail = {
                        status : true,
                        date : req.body.date,
                        userId : student._id,
                        roleOfUser : "Student"
                    }
                    const newAttendance = new Attendance(attendanceDetail)

                    //there is change
                    //console.log(req.body)
                    try {
                        await newAttendance.save()
                    } catch (err){
                        return res.status(400).send(`Unable to fill student attendance ${err}`)
                    }
                    // res.status(201).send(newAttendance)

                    await student.save();
                    studentsLogger.info(`Attendance filled : ${student._id}`)
                } 
                const notAttendStudent = await Staff.findById({ $ne :attendie});
                if(notAttendStudent){
                    const attendanceDetail = {
                        status : false,
                        date : req.body.date,
                        userId : notAttendStudent._id,
                        roleOfUser : "Student"
                    }
                    const newAttendance = new Attendance(attendanceDetail)

                    //there is change
                    //console.log(req.body)
                    try {
                        await newAttendance.save()
                    } catch (err){
                        return res.status(400).send(`Unable to fill student attendance ${err}`)
                    }
                    //res.status(201).send(newAttendance)
                    await student.save();
                    studentsLogger.info(`Attendance filled : ${notAttendStudent._id}`)
                }
            }
            studentsLogger.info('Filled attendance of given Students')
            res.status(201).send("Filled Attendance of all student")
        } catch( e ){
            res.status(500).send({error : e})
        }
    }

    async fillStaffAttendance(req:Request, res:Response){
        try {
            const attendStaff = req.body.attendance;
    
            for (const attendie of attendStaff) {
                const staff = await Staff.findById(attendie);
                if (staff) {
                    staff.attendance += 1;

                    // there is change
                    const attendanceDetail = {
                        status : true,
                        date : req.body.date,
                        userId : staff._id,
                        roleOfUser : "Staff"
                    }
                    const newAttendance = new Attendance(attendanceDetail)

                    //there is change
                    //console.log(req.body)
                    try {
                        await newAttendance.save()
                    } catch (err){
                        return res.status(400).send(`Unable to fill student attendance ${err}`)
                    }
                    // res.status(201).send(newAttendance)

                    await staff.save();
                    staffsLogger.info(`Attendance filled : ${staff._id}`)
                } 
                const notAttendStaff = await Staff.findById({ $ne :attendie});
                if(notAttendStaff){
                    
                    const attendanceDetail = {
                        status : false,
                        date : req.body.date,
                        userId : notAttendStaff._id,
                        roleOfUser : "Staff"
                    }
                    const newAttendance = new Attendance(attendanceDetail)

                    try {
                        await newAttendance.save()
                    } catch (err){
                        return res.status(400).send(`Unable to fill staff attendance ${err}`)
                    }
                    //res.status(201).send(newAttendance)
                    await staff.save();
                    staffsLogger.info(`Attendance filled : ${staff._id}`)
                }
            }
            studentsLogger.info('Filled attendance of given Staffs')
            res.status(201).send("Filled Attendance of all staffs")
        } catch( e ){
            res.status(500).send({error : e})
        }
    }

    async manageStudentAttendance(req:Request, res:Response){
        try {
            const updatable = ['status', 'Role', 'date']
            const updateStudentAttendance = Object.keys(req.body)
            const isValidUpdate = updateStudentAttendance.every(update => updatable.includes(update))
            if(!isValidUpdate){
                studentsLogger.error(`Not valid student Attendance update`)
                return res.status(400).send('Not valid update')
            }
            try {
                const studentAttendance = await Attendance.findById(req.params.id)
                if(!studentAttendance){
                    studentsLogger.error(`Unable to find student`)
                    return res.status(404).send('This type of Student not found')
                }
                updateStudentAttendance.forEach(update => {
                    studentAttendance[update] = req.body[update] 
                })
                await studentAttendance.save()
                res.status(200).send(studentAttendance)
                studentsLogger.info(`update data of student attendance ${studentAttendance._id}`)
            } catch( e ){
                return res.status(400).send(e)
            }
        } catch (e){
            studentsLogger.error('Internal server error!, unable to connect with application')
            res.status(500).send({ error: 'Internal Server Error' });
        }
    }

    async manageStaffAttendance(req:Request, res:Response){
        try {
            const updatable = ['status', 'Role', 'date']
            const updateStaffAttendance = Object.keys(req.body)
            const isValidUpdate = updateStaffAttendance.every(update => updatable.includes(update))
            if(!isValidUpdate){
                staffsLogger.error(`Not valid staff Attendance update`)
                return res.status(400).send('Not valid update')
            }
            try {
                const staffAttendance = await Attendance.findById(req.params.id)
                if(!staffAttendance){
                    staffsLogger.error(`Unable to find staff`)
                    return res.status(404).send('This type of Staff not found')
                }
                updateStaffAttendance.forEach(update => {
                    staffAttendance[update] = req.body[update] 
                })
                await staffAttendance.save()
                res.status(200).send(staffAttendance)
                staffsLogger.info(`update data of student attendance ${staffAttendance._id}`)
            } catch( e ){
                return res.status(400).send(e)
            }
        } catch (e){
            staffsLogger.error('Internal server error!, unable to connect with application')
            res.status(500).send({ error: 'Internal Server Error' });
        }
    }

    async getStudentsAttendance(req:Request, res:Response){
        try {
            const attendance = await Attendance.find({roleOfUser : 'Student'})
            if(!attendance){
                studentsLogger.error('Given user not found')
                return res.status(404).send('Not User found!')
            }
            studentsLogger.info('Fetching data of students')
            res.status(200).send(attendance)
        } catch(e){
            studentsLogger.error('Internal server error , unable to get data')
            return res.status(500).send({error : `Unable to get data with error : ${e}`})
        }
    }

    async getStaffsAttendance(req:Request, res:Response){
        try {
            const attendance = await Attendance.find({roleOfUser : "Staff"})
            //console.log(`this is staff ${attendance}`)
            if(!attendance){
                staffsLogger.error('Given user not found')
                return res.status(404).send('Not User found!')
            }
            staffsLogger.info('Fetching data of students')
            res.status(200).send(attendance)
        } catch(e){
            studentsLogger.error('Internal server error , unable to get data')
            return res.status(500).send({error : `Unable to get data with error : ${e}`})
        }
    }

    async getAbsentStudent(req:Request, res:Response){
        
        const date = req.body.date
        const newDate = new Date(date)
        //console.log(newDate)
        const attendance = await Attendance.aggregate([
            {
                $match : {
                    'date' : newDate,
                    'status' : false
                }
            },
            {
                $project : {
                    studentId : "$userId",
                    date : 1,
                    _id : 0
                }
            }
        ])
        if(!attendance){
            return res.status(404).send('unable to find data')
        }
        res.status(200).send(attendance)
    }

    async studentLessAttendance(req:Request, res:Response){
        try {
            //console.log(req.body.date)
            const specificDate = new Date(req.body.date); // Replace 'YYYY-MM-DD' with your specific date
            const batchSize = req.body.batch || 2020; // Replace with the desired batch year
            const branch = req.body.department || 'CE'; // Replace with the desired branch
            const semester = req.body.currentSem || 1; // Replace with the desired semester

            // console.log(`batchSize : ${batchSize}
            //     semester ${semester}
            //     department ${branch}
            //     date ${specificDate}`)
            const result = await Attendance.aggregate([
            
            {
                $lookup: {
                    from: 'students',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'attendanceData'
                  }
            },
             {
                $match : { 
                     date : specificDate,
                    'attendanceData.batch': batchSize,
                    'attendanceData.department' : branch,
                    'attendanceData.currentSem' : semester
                 },
                },
             
            {
                $addFields: {
                    percentageAttendance: {
                      $cond: {
                        if: { $gt: [{ $size: '$attendanceData' }, 0] },
                        then: {
                          $multiply: [
                            100,
                            {
                              $divide: [
                                {
                                  $sum: {
                                    $map: {
                                      input: '$attendanceData',
                                      as: 'attendanceItem',
                                      in: '$$attendanceItem.attendance'
                                    }
                                  }
                                },
                                { $multiply: [{$size: '$attendanceData'}, 300] }
                              ]
                            }
                          ]
                        },
                        else: 0  // or any default value when the array is empty
                      }
                    }
                  }
            },
            {
                $match: {
                    percentageAttendance : {
                      $lt : 75
                    }
                 }
            },
            {
                $project: {
                    _id : 0,
                  status : 0,
                  roleOfUser : 0,
                  __v : 0,
                }
            }
            ]);

            console.log(result);

            if(!result){
                res.status(404).send('student attendance data not found')
            }
            res.status(200).send(result)
        } catch(e){
            studentsLogger.error('enable to get Analysis 2 details')
            res.status(500).send(`Internal Server Error! ${e}`)
        }
   }

   async studentIntakeAnalysis(req:Request, res: Response){
    try {
        const result = await Attendance.aggregate([
            {
              $match: {
                //date: { $gte: new Date('2021-06-18T00:00:00.000Z') }, // Add your date filter if needed
                roleOfUser: 'Student',
                //status: false // Assuming you want to consider only false status
              }
            },
            {
              $lookup: {
                from: 'students',
                localField: 'userId',
                foreignField: '_id',
                as: 'student'
              }
            },
            {
              $unwind: '$student'
            },
            {
              $lookup: {
                from: 'batches',
                localField: 'student.batch',
                foreignField: 'year',
                as: 'batch'
              }
            },
            {
              $unwind: '$batch'
            },
            {
              $group: {
                _id: '$student.department',
                totalStudents: { $sum: 1 },
                totalStudentsIntake: { $first: '$batch.branches.totalStudentsIntake' },
                availableIntake: {
                  $sum: {
                    $cond: [
                      { $eq: ['$status', false] },
                      1,
                      0
                    ]
                  }
                }
              }
            },
            {
              $group: {
                _id: null,
                totalStudents: { $sum: '$totalStudents' },
                totalStudentsIntake: { $sum: '$totalStudentsIntake' },
                availableIntake: { $sum: '$availableIntake' },
                branches: {
                  $push: {
                    k: '$_id',
                    v: {
                      totalStudents: '$totalStudents',
                      totalStudentsIntake: '$totalStudentsIntake',
                      availableIntake: '$availableIntake'
                    }
                  }
                }
              }
            },
            {
              $project: {
                _id: 0,
                batch: 2020, // Assuming you want to consider a specific batch (adjust as needed)
                totalStudents: 1,
                totalStudentsIntake: 1,
                availableIntake: 1,
                branches: { $arrayToObject: '$branches' }
              }
            }
          ]);
          
          console.log(result);
        res.status(200).send(result)
    } catch(e){
        res.status(500).send(`Internal Server Error : ${e}`)
    }
   }
}

export default AttendanceController


