import connectDB from "@/middleware/connectDB";
import User from "@/Models/User";

const handler = async (req, res) => {
  if (req.method !== "POST") {
     res
      .status(403)
      .status({ success: false, message: "Method not allowed!" });
  }
  const { fname, lname, email, password } = req.body ?? {};
  if ((!fname, !lname, !email, !password)) {
    res
      .status(403)
      .send({ success: false, message: "Please fill up all details!" });
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(409).send({ success: false, message: "User already exists!" });
  }

  const newUser = await User.create({
    fName: fname,
    lName: lname,
    email,
    password,
  });

  res
    .status(200)
    .send({ success: true, message: "User registered successfully!" });
};

export default connectDB(handler);
