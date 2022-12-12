import client from "../db/client.mjs";

const getMessage = (request, response) => {
  const admin_id = request.userId;
  const lobby_id = request.params.lobby_id;
  const message_id = request.params.message_id;

  client.query(
    "SELECT id, name FROM lobby WHERE admin_id = $1",
    [admin_id],
    (error, results) => {
      if (error) {
        throw error;
      }

      client.query(
        "SELECT text FROM messages WHERE author_id = $1 AND lobby_id = $2",
        [admin_id, lobby_id],
        (error, results) => {
          if (error) {
            throw error;
          }
          let result = results.rows;

          if (message_id) {
            result = results.rows[message_id - 1].text;
          }
          response.status(200).json(result);
        }
      );
    }
  );
};

export default getMessage;
