import Echo from "laravel-echo";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Pusher from "pusher-js";

const echo = new Echo({
  broadcaster: "pusher",
  key: process.env.REACT_APP_PUSHER_APP_KEY,
  cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER,
  forceTLS: true, // Use TLS (secure WebSocket connection)
});

export default echo;
