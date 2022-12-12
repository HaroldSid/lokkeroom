const welcome = (request, response) => {
    return response.json({
      message: "Welcome to the lobby ! ",
      user: { id: request.userId, email: request.userEmail, expire: request.exp },
    });
  }

export default welcome

