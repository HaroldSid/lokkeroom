import client from "../db/client.mjs";
import bcrypt from "bcrypt";

// Define a function for creating a new user
const register = async (request, response) => {
  const { email, password } = request.body;

  // Hash the password using bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // Write a SQL query to insert the new user into the database

  client.query(
    "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
    [email, hashedPassword],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`User added with ID: ${results.rows[0].id}`);
    }
  );
};

export default register;
