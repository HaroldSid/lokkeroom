import client from "../db/client.mjs";

const updateUserPatch = (request, response) => {
  const admin_id = request.userId;
  const lobby_id = request.params.lobby_id;
  const { message } = request.body;
  const currentDate = new Date();
  const currentDayOfMonth = currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const dateString =
    currentDayOfMonth + "-" + (currentMonth + 1) + "-" + currentYear;

  client.query(
    "SELECT * FROM messages WHERE author_id = $1 AND lobby_id = $2",
    [admin_id, lobby_id],
    (error, results) => {
      if (error) {
        throw error;
      }

      let lastComment = results.rows[results.rows.length - 1].id;

      client.query(
        "UPDATE messages SET text = COALESCE($1,text), edited = COALESCE($2, edited) WHERE id = $3",
        [message, dateString, lastComment],

        (error, results) => {
          if (error) {
            throw error;
          }

          response.status(200).send(`Message modified the : ${dateString}`);
        }
      );
    }
  );
};
export default updateUserPatch;
