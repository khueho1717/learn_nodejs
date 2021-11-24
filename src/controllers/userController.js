import userService from "../sevices/userService";

let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  let userData = await userService.handleUserLogin(email, password);
  // check email exist
  // check password equal in database
  // retuen user infor
  // access_token: JWT
  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing inputs parameter ",
    });
  }

  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};

module.exports = {
  handleLogin: handleLogin,
};
