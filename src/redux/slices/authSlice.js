import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { handleAuthError } from "../../utils/handleAuthError";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    admin: {},
    loading: false,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.admin = action.payload;
      localStorage.setItem("token", action.payload.token);
    },
    registerSuccess: (state, action) => {
      state.admin = action.payload;
      localStorage.setItem("token", action.payload.token);
    },
    logoutSuccess: (state, action) => {
      state.admin = {};
      localStorage.removeItem("token");
    },
  },
});

export const { loginSuccess,registerSuccess, logoutSuccess } = authSlice.actions;

export const login = (formData, setLoading, navigate) => async (dispatch) => {
  try {
    const url = `${BASE_URL}/auth/login/v1`;
    const { data } = await axios.post(url, formData);
    dispatch(loginSuccess(data));
    toast.success("Login Successfully", {
      position: "top-center",
      autoClose: 3000,
    });
    setLoading(false);
    navigate("/");
  } catch (error) {
    handleAuthError(error);
    setLoading(false);
  }
};

export const register = (formData, setLoading, navigate) => async (dispatch) => {
  try {
    const url = `${BASE_URL}/auth/register/v1`;
    
    // Remove confirmPassword from the data sent to the API
    const { confirmPassword, ...registrationData } = formData;
    
    const { data } = await axios.post(url, registrationData);
    dispatch(registerSuccess(data));
    toast.success("Account created successfully", {
      position: "top-center",
      autoClose: 3000,
    });
    setLoading(false);
    navigate("/");
  } catch (error) {
    handleAuthError(error);
    setLoading(false);
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch(logoutSuccess());
    toast.success("Logout Successfully", {
      position: "top-center",
      autoClose: 3000,
    });
  } catch (error) {
    handleAuthError(error);
  }
};

export default authSlice.reducer;
