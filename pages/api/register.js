import connectDB from "@/middleware/connectDB";
import User from "@/Models/User";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res
      .status(405)
      .send({ success: false, message: "Method not allowed!" });
  }

  const { fname, lname, email, password } = req.body ?? {};

  // Check if all required fields are provided
  if (!fname || !lname || !email || !password) {
    res
      .status(403)
      .send({ success: false, message: "Please fill up all details!" });
    return; // Added return to exit the function
  }

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res
        .status(409)
        .send({ success: false, message: "User already exists!" });
    }

    const newUser = await User.create({
      fName: fname,
      lName: lname,
      email,
      password,
    });

    res
      .status(201)
      .send({ success: true, message: "User registered successfully!" });
  } catch (error) {
    // Handle any potential errors
    console.error("Error:", error);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};

export default connectDB(handler);
