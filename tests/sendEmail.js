const transporter = require("../utils/mailTransporter");

transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: "test envoie de mail.",
    text: "veuillez confirmez."
})
