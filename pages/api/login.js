import connectDB from "../../middleware/connectDB";
import User from "../../Models/User";
import JWT from "jsonwebtoken";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).send({ success: false, message: "Method not allowed!" });
    return;
  }

  const { fname, lname, email, password } = req.body ?? {};

  // Check if all required fields are provided
  if (!email || !password) {
    res
      .status(403)
      .send({ success: false, message: "Please fill up all details!" });
    return; // Added return to exit the function
  }

  try {
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res
        .status(404)
        .send({ success: false, message: "User not registered" });
    }

    if (password === userExists?.password) {
        const token = JWT.sign({userExists},process.env.JWT_SECRET)
      return res.status(200).send({ success: true, message:"Logged In successfully",token });
    }
    res.status(401).send({ success: false, message: "invalid Credentials" });
  } catch (error) {
    // Handle any potential errors
    console.error("Error:", error);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};

export default connectDB(handler);
