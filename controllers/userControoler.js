const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userModel = require("../models/userModel");
const genererNombreAleatoire = require("../utils/generateOTP");
const { v4 } = require("uuid");
const otpModel = require("../models/otpModel");
const transporter  = require("../utils/mailTransporter");

const register = async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await userModel.findOne({ email });
    if (userExists) {
        res.status(209).send({ message: "l'email existe dejà" });
        return;
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    let user;
    try {
        user = await userModel.create({
            name, email, password: hashedPassword
        })
    }
    catch (error) {
        res.send({
            message: ("l'utilisateur n'est pas ajouté")
        });
        return;
    };

    const otp = genererNombreAleatoire();
    const otpToken = v4();

    const otpDetails = await otpModel.create({
        userId: user._id,
        otp,
        otpToken,
        purpose: "verify-email"
    });

    transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: "Verification email.",
    html: `
    <h1> Verification email</h1>
    <div> 
        Use the above  code to verify your email <br>
        <strong>${otp}</strong>
    </div>
    `
})

    res.send({
        message: ("l'utilisateur est ajouté"),
        otpToken,
        user
    });
};

const verify = async (req, res) => {
    const { otp, otpToken, purpose } = req.body;

    if (purpose != "verify-email") {
        res.status(422).send({
            message: "purpose invalid"
        });
        return;
    }

    const otpDetails = await otpModel.findOne({
        otpToken, purpose
    });
    // console.log(otpDetails);

    if (otp != otpDetails.otp) {
        res.status(406).send({
            message: "otp invalid"
        });
        return;
    }
    const verifiedUser = await userModel.findByIdAndUpdate(
        otpDetails.userId,
        { isVerified: true },
        { new: true }
    );

    res.send({
        message: "user successfuly verified",
        verifiedUser,
    })
}

const login = async (req, res) => {
  // console.log(req.body);
  const { email, password } = req.body;
  
  const user = await userModel.findOne({ email });
  // console.log(user);
  if (!user) {
    res.status(404).send({ message: "user not found" });
    return;
  }
  const isPasswordCorrect = bcrypt.compareSync(password, user.password);
  if (!isPasswordCorrect) {
    res.status(401).send({ message: "invalid credentials" });
    return;
  }
  // console.log(isPasswordCorrect);

  const token = jwt.sign(
    {
      userId: user._id,
      email: user.email
    },
    process.env.WT_SECRET
  );
  // console.log(token);
  res.send({
    message: "user connect successfully",
    token
  });
};

module.exports = { register, login, verify }
