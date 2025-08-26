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
        message: ("l'utilisateur est ajouté avec succès"),
        otpToken,
        user
    });
};

const verify = async (req, res) => {
    const { otp, otpToken, purpose } = req.body;

    if (purpose != "verify-email") {
        res.status(422).send({
            message: "objectif invalide"
        });
        return;
    }

    const otpDetails = await otpModel.findOne({
        otpToken, purpose
    });
    // console.log(otpDetails);

    if (otp != otpDetails.otp) {
        res.status(406).send({
            message: "otp invalide"
        });
        return;
    }
    const verifiedUser = await userModel.findByIdAndUpdate(
        otpDetails.userId,
        { isVerified: true },
        { new: true }
    );

    res.send({
        message: "utilisateur vérifié avec succès",
        verifiedUser,
    })
}

const login = async (req, res) => {
  // console.log(req.body);
  const { email, password } = req.body;
  
  const user = await userModel.findOne({ email });
  // console.log(user);
  if (!user) {
    res.status(404).send({ message: "utilisateur introuvable" });
    return;
  }
  const isPasswordCorrect = bcrypt.compareSync(password, user.password);
  if (!isPasswordCorrect) {
    res.status(401).send({ message: "Informations d'identification invalides" });
    return;
  }
  // console.log(isPasswordCorrect);

  const token = jwt.sign(
    {
      userId: user._id,
      email: user.email
    },
    process.env.JWT_SECRET
  );
  // console.log(token);
  res.send({
    message: "Utilisateur connecté avec succès.",
    token
  });
};

const forgotPassword = async (req, res) => {
    const { email } = req.body;
  
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "Utilisateur introuvable" });
    }
  
    const otp = genererNombreAleatoire();
    const otpToken = v4();
  
    await otpModel.create({
      userId: user._id,
      otp,
      otpToken,
      purpose: "reset-password"
    });
  
    transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Réinitialisation de mot de passe",
      html: `
        <h1>Réinitialisation de mot de passe</h1>
        <p>Voici le code pour réinitialiser votre mot de passe :</p>
        <strong>${otp}</strong>
      `
    });
  
    res.send({
      message: "Code de réinitialisation envoyé",
      otpToken
    });
  };

  const deleteUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const { password } = req.body;

    // Vérifier que l'utilisateur existe
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "Utilisateur non trouvé" });
    }

    // Vérifier le mot de passe
    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).send({ message: "Mot de passe incorrect" });
    }

    // Supprimer l'utilisateur et ses OTP associés
    await userModel.findByIdAndDelete(userId);
    await otpModel.deleteMany({ userId });

    res.send({
      message: "Utilisateur supprimé avec succès",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Erreur lors de la suppression de l'utilisateur",
      error: error.message,
    });
  }
};



  const resetPassword = async (req, res) => {
  const { otp, otpToken, newPassword } = req.body;

  try {
    const otpDetails = await otpModel.findOne({
      otpToken,
      purpose: "reset-password",
    });
    if (!otpDetails) {
      return res.status(404).send({ message: "OTP non trouvé" });
    }

    if (otp !== otpDetails.otp) {
      return res.status(406).send({ message: "OTP invalide" });
    }

    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    await userModel.findByIdAndUpdate(otpDetails.userId, {
      password: hashedPassword,
    });

    await otpModel.findByIdAndDelete(otpDetails._id);

    res.send({
      message: "Mot de passe est réinitialisé! ",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Echec de réinitialisation du mot de passe",
      error: error.message,
    });
  }
};


module.exports = { register, login, verify, forgotPassword, resetPassword, deleteUser }