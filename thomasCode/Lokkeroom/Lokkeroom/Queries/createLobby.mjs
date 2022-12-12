import client from "../db/client.mjs";

const createLobby = (request, response) => {
  const { name } = request.body;
  const admin_id = request.userId;

  client.query(
    "INSERT INTO lobby ( name, admin_id) VALUES ($1, $2 ) RETURNING *",
    [name, admin_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      client.query(
        "INSERT INTO user_lobby ( user_id, lobby_id) VALUES ($1, $2 ) RETURNING *",
        [admin_id, results.rows[0].id],
        (error, results) => {
          if (error) {
            throw error;
          }
          console.log(results.rows);
        }
      );
      response
        .status(201)
        .send(`Lobby added with ID: ${results.rows[0].id} and name ${name}`);
    }
  );
};

export default createLobby;
