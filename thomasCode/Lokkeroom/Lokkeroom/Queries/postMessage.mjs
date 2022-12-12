import client from "../db/client.mjs";

const postMessage = (request, response) => {
  const { message } = request.body;
  const admin_id = request.userId;

  const currentDate = new Date();
  const currentDayOfMonth = currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const dateString =
    currentDayOfMonth + "-" + (currentMonth + 1) + "-" + currentYear;
    
  const lobby_id = request.params.lobby_id;

  client.query(
    "SELECT id, name FROM lobby WHERE admin_id = $1",
    [admin_id],
    (error, results) => {
      if (error) {
        throw error;
      }

      let lobby_name = results.rows[0].name;
    
      client.query(
        "INSERT INTO messages (text, author_id, lobby_id, created, edited) VALUES ($1, $2, $3, $4, $5 ) RETURNING *",
        [message, admin_id, lobby_id, dateString, dateString],
        (error, results) => {
          if (error) {
            throw error;
          }
          response.status(201).send(`Message added in lobby : ${lobby_name}`);
        }
      );
    }
  );
};

export default postMessage;

