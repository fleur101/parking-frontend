import { Socket } from "phoenix";

function connectUser(token, user_id) {
  console.log(user_id);
  console.log(token);
  let socket = new Socket("ws://tartu-parking-backend.herokuapp.com/socket", {
    params: { token }
  });
  socket.onError(function(error) {
    console.log(error.message);
  });
  socket.connect();
  return socket.channel(`driver:${user_id}`);
}

export default connectUser;
