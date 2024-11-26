import Echo from "laravel-echo";
import Pusher from "pusher-js";

const echo = new Echo({
    broadcaster: "pusher",
    key: process.env.REACT_APP_PUSHER_APP_KEY, // Add this key to your .env file
    cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER, // Add this cluster to your .env file
    forceTLS: true, // Ensure this matches your Pusher setup
});

export default echo;