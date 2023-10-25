// const bcrypt = require('bcrypt');

// // Mock user data
// const plainPassword = 'user123password';

// async function runExample() {
//   try {
//     // Hash a password
//     const hashedPassword = await bcrypt.hash(plainPassword, 10);

//     // Mock: In a real application, you would save the hashedPassword in your database
//     console.log('Hashed Password:', hashedPassword);

//     // Compare hashed password with the plain password
//     const result = await bcrypt.compare(plainPassword, hashedPassword);

//     if (result) {
//       console.log('Password Matched!');
//     } else {
//       console.log('Password Mismatch!');
//     }
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }

// // Run the example
// runExample();

// const jwt = require('jsonwebtoken')

// // Secret key used to sign and verify the token
// const secretKey = 'secreteJwtToken';

// // Payload to be included in the token
// const payload = {
//   "user": {
//     "_id": "652fa65676cce609cc6e9f6a",
//     "name": "Bhism",
//     "email": "bhism@example.com",
//     "currentSem": 1,
//     "password": "$2b$08$ysfGH2iPL9rxLrDRCEZKduR5oS9PdJ8UrhgLx4HfZl3IdIO2zswuG",
//     "phoneNumber": "8264007089",
//     "batch": 2022,
//     "attendance": 302,
//     "tokens": [
//         {
//             "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTJmYTY1Njc2Y2NlNjA5Y2M2ZTlmNmEiLCJpYXQiOjE2OTc2MjE1OTB9.TVcYgPgIEvCv7Mb6ox3t8I0WW1vv5bqRX28ivTK47M4",
//             "_id": "652fa65676cce609cc6e9f6c"
//         },
//         {
//             "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTJmYTY1Njc2Y2NlNjA5Y2M2ZTlmNmEiLCJpYXQiOjE2OTc2OTQyMDB9.UydJwN9RxBfT2Ngd1XxnsYGLsDTKBqrggs6Naj65aZo",
//             "_id": "6530c1f8d4e2d625b326b15c"
//         },
//         {
//             "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTJmYTY1Njc2Y2NlNjA5Y2M2ZTlmNmEiLCJpYXQiOjE2OTc2OTU1OTJ9.nOV8WjYMRV1BXwb5iVyxZ_3WhyebHpOYDFWiN0p5hwI",
//             "_id": "6530c76879929277e0af6b41"
//         },
//         {
//             "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTJmYTY1Njc2Y2NlNjA5Y2M2ZTlmNmEiLCJpYXQiOjE2OTc2OTYxNzl9.8A78MOBGaxuyPyT2fuWbJ9hSnNJsW0SabM8pzrsglXU",
//             "_id": "6530c9b38f86118cdcef9c08"
//         },
//         {
//             "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTJmYTY1Njc2Y2NlNjA5Y2M2ZTlmNmEiLCJpYXQiOjE2OTc3MTY4OTV9.KQq9qKcMySfaEu9jA8t35Gx_FVpTXh6aL5R_ZNobHZ0",
//             "_id": "65311a9f5f54aeeb8a31006e"
//         },
//         {
//             "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTJmYTY1Njc2Y2NlNjA5Y2M2ZTlmNmEiLCJpYXQiOjE2OTc3MTY5NTB9.Y4wY0IfVebEJCawukSnjme0PxzKMmEIMiH3qcAbc8BA",
//             "_id": "65311ad6cff4b12a895303e4"
//         },
//         {
//             "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTJmYTY1Njc2Y2NlNjA5Y2M2ZTlmNmEiLCJpYXQiOjE2OTc3MTk1OTd9.CQc-P5YYjW2IopskZRT1oaOXtL1pW7QOo6T31FMmd3E",
//             "_id": "6531252dec930faa7dd8aad5"
//         },
//         {
//             "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTJmYTY1Njc2Y2NlNjA5Y2M2ZTlmNmEiLCJpYXQiOjE2OTc3MjAxMTJ9.0lnvHH0Rb2wY2er2DOiJ0SKToQa6h7HrugjGyvIWqH8",
//             "_id": "6531273006d5f69c3536f057"
//         },
//         {
//             "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTJmYTY1Njc2Y2NlNjA5Y2M2ZTlmNmEiLCJpYXQiOjE2OTc3NzM3NTF9.mKXx3HD_OQkk4AqohcLm4Uotg3VDpKI4Gu_yukJAhB4",
//             "_id": "6531f8b74982f64b03e9f47a"
//         },
//         {
//             "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTJmYTY1Njc2Y2NlNjA5Y2M2ZTlmNmEiLCJpYXQiOjE2OTc3NzM3Njh9.NrJGuaanxHOm2KEthm4HGl7UYT1XqDvJRrHWqoS5Eck",
//             "_id": "6531f8c8dcab8a80649f0a31"
//         }
//     ],
//     "__v": 10
// },
// "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTJmYTY1Njc2Y2NlNjA5Y2M2ZTlmNmEiLCJpYXQiOjE2OTc3NzM3Njh9.NrJGuaanxHOm2KEthm4HGl7UYT1XqDvJRrHWqoS5Eck"
// };
// const payloadparsed = JSON.stringify(payload)

// // Creating a JWT token
// const token = jwt.sign(payloadparsed, secretKey);

// const decoded = jwt.verify(token, secretKey)
// console.log('Generated Token:', token);
// console.log(typeof token)
// console.log(decoded)

// // Verifying a JWT token
// jwt.verify(token, secretKey, (err, decoded) => {
//   if (err) {
//     console.error('Token verification failed:', err.message);
//   } else {
//     console.log('Decoded Token:', decoded);
//   }
// });

//import dotenv from "dotenv"
const path = require('path');
const dotenv = require('dotenv');

console.log(__dirname)
// Construct the path to the .env file
const envPath = path.resolve(__dirname, 'config', 'dev.env');

console.log()
// Load the .env file
const result = dotenv.config({ path: envPath });

if (result.error) {
  throw result.error;
}

const PORT_NO = process.env.PORT;
console.log(PORT_NO);
