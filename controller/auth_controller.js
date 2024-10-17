// Importing necessary modules
const userModel = require("../models/user"); // Importing the user model to interact with the database
const bcrypt = require('bcrypt'); // Importing bcrypt for password hashing and comparison

// Function to handle user login
async function handleLoginUser(req, res) {
    try {
        // Extract email and password from request body
        const { email, password } = req.body;
        // If either email or password is missing, return a 400 Bad Request response
        if (!email || !password) return res.status(400).json({ msg: "Email and password are required" });
        // Log the email and password for debugging purposes
        console.log(email, password);
        // Search for the user in the database using the provided email
        const existingUser = await userModel.userModel.findOne({ email: email });
        // If user is not found or the provided password does not match the hashed password, return a 400 Bad Request
        if (!existingUser || !(await bcrypt.compare(password, existingUser.password))) {
            return res.status(400).json({ msg: 'Invalid email or password' });
        }
        // If the credentials are valid, return the user's ID
        return res.json({ id: existingUser._id });
    } catch (error) {
        // Log any errors for debugging purposes
        console.log(error);
        // Return a 500 Internal Server Error response in case of an error
        return res.status(500).json({ msg: 'Internal server error' });
    }
}

// Function to handle user sign-up
async function handleSignUpUser(req, res) {
    try {
        // Extract email and password from request body
        const { email, password } = req.body;
        // If either email or password is missing, return a 400 Bad Request response
        if (!email || !password) return res.status(400).json({ msg: "Email and password are required" });
        // Log the email and password for debugging purposes
        console.log(email, password);
        // Check if a user with the same email already exists in the database
        const existingUser = await userModel.userModel.findOne({ email: email });
        // If the email already exists, return a 400 Bad Request response
        if (existingUser) return res.status(400).json({ msg: 'Email already exists' });
        // Generate a salt for hashing the password
        const salt = await bcrypt.genSalt(10);
        // Hash the password using bcrypt with the generated salt
        const hashedPassword = await bcrypt.hash(password, salt);
        // Create a new user in the database with the email and hashed password
        const createdUser = await userModel.userModel.create({
            email: email,
            password: hashedPassword,
        });
        // If the user could not be created, return a generic error response
        if (!createdUser) return res.status().json({ msg: 'Cannot create user' });
        // If the user is created successfully, return a success message
        return res.status(201).json({ msg: 'User created' });
    } catch (error) {
        // Log any errors for debugging purposes
        console.log(error);
        // Return a 500 Internal Server Error response in case of an error
        return res.status(500).json({ msg: 'Internal server error' });
    }
}

// Export the functions for use in other parts of the application
module.exports = {
    handleSignUpUser: handleSignUpUser,
    handleLoginUser: handleLoginUser,
};
