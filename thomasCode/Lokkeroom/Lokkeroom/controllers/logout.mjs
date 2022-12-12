const logout = (request, response) => {
  return response
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Successfully logged out" });
};

export default logout