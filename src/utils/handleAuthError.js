import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const handleAuthError = (error) => {
  const status = error?.response?.status;

  if (status === 401 || status === 403) {
    localStorage.removeItem("token");
    toast.error("Session expired. Please login again.", {
      position: "top-center",
      autoClose: 3000,
    });
    window.location.href = "/login";
  } else {
    toast.error(error?.response?.data?.message || "Something went wrong", {
      position: "top-center",
      autoClose: 3000,
    });
  }
};
