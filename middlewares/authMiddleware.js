const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  // console.log(req.headers.authorization);
  // If a token is not supplied
  if (!req.headers.authorization) {
    return res.status(400).send({
      message: "A token is required to use this route.",
    });
  }

  try {
    // Destructuration to get the sheme and the token
    const [type, token] = req.headers.authorization.split(" ");

    // If the token is not of type bearer
    if (type.toLocaleLowerCase() != "bearer") {
      return res.status(406).send({
        message: "Invalid authentication type!",
      });
    }

    // Verify the provided token
    const decodedValue = jwt.verify(token, process.env.SECRET_KEY);
    // console.log(decoded);

    // Add the decoded value to the request
    req.decoded = decodedValue;

    // Call next to proceed to the next middleware/callback/function
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message,
    });
  }
};

module.exports = authMiddleware;