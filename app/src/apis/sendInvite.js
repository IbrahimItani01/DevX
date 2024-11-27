import axios from "axios";
import { toast } from "react-toastify";
export const sendInvite = (email, id, role, userEmail) => {
  axios
    .post(
      "http://localhost:8000/api/send-invite",
      {
        email,
        user_email: userEmail,
        file_id: id,
        role: role,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      toast.success(response.data.message);
    });
};
