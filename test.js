const bcrypt = require('bcrypt');

// Mock user data
const plainPassword = 'user123password';

async function runExample() {
  try {
    // Hash a password
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    // Mock: In a real application, you would save the hashedPassword in your database
    console.log('Hashed Password:', hashedPassword);

    // Compare hashed password with the plain password
    const result = await bcrypt.compare(plainPassword, hashedPassword);

    if (result) {
      console.log('Password Matched!');
    } else {
      console.log('Password Mismatch!');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the example
runExample();
