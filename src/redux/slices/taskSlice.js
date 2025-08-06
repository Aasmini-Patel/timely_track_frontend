import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { handleAuthError } from "../../utils/handleAuthError";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const taskSlice = createSlice({
  name: "taskSlice",
  initialState: {
    task: [],
    dashboard: {},
    refetch: false,
  },
  reducers: {
    setTask: (state, action) => {
      state.task = action.payload;
    },
    setDashboard: (state, action) => {
      state.dashboard = action.payload;
    },
    refetch: (state, action) => {
      state.refetch = action.payload;
    },
  },
});

export const { setTask, setDashboard, refetch } = taskSlice.actions;

export const getAllTask = (setLoading) => async (dispatch) => {
  try {
    setLoading(true);
    const url = `${BASE_URL}/task/list/v1`;
    const { data } = await axios.get(url, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    dispatch(setTask(data.data));
  } catch (error) {
    console.error("Error fetching task:", error);
    handleAuthError(error);
  } finally {
    setLoading(false);
  }
};

export const createTask =
  (formData, setCreateModal, resetForm) => async (dispatch) => {
    try {
      dispatch(refetch(false));
      const url = `${BASE_URL}/task/create/v1`;

      const { data } = await axios.post(url, formData, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      toast.success(data.message || "Task Added Successfully");
      dispatch(refetch(true));
      setCreateModal(false);
      resetForm();
    } catch (error) {
      handleAuthError(error);
    }
  };

export const updateTask =
  (formData, setCreateModal, resetForm) => async (dispatch) => {
    try {
      dispatch(refetch(false));
      const url = `${BASE_URL}/task/update/v1`;
      const { data } = await axios.put(url, formData, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      toast.success(data.message || "Task Updated Successfully");
      dispatch(refetch(true));
      setCreateModal(false);
      resetForm();
    } catch (error) {
      handleAuthError(error);
    }
  };

export const deleteTask = (id, setShowDeleteModal) => async (dispatch) => {
  try {
    dispatch(refetch(false));
    const url = `${BASE_URL}/task/delete/${id}/v1`;

    const { data } = await axios.delete(url, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    toast.success(data.message || "Task Deleted Successfully");
    dispatch(refetch(true));
    setShowDeleteModal(false);
  } catch (error) {
    handleAuthError(error);
  }
};

export const startTask = (id) => async (dispatch) => {
  try {
    dispatch(refetch(false));
    const url = `${BASE_URL}/task/start/${id}/v1`;
    const { data } = await axios.post(
      url,
      {},
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    toast.success(data.message || "Task Started Successfully");
    dispatch(refetch(true));
  } catch (error) {
    handleAuthError(error);
  }
};

export const stopTask =
  (id, isComplete = false) =>
  async (dispatch) => {
    try {
      dispatch(refetch(false));
      const url = `${BASE_URL}/task/stop/${id}/v1`;
      const { data } = await axios.post(
        url,
        { isComplete },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      toast.success(data.message || "Task Stopped Successfully");
      dispatch(refetch(true));
    } catch (error) {
      handleAuthError(error);
    }
  };

  export const dashBoardData = (setLoading) => async (dispatch) => {
    try {
      setLoading(true);
      const url = `${BASE_URL}/task/dashboard/v1`;
      const { data } = await axios.get(url, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
  console.log(data.data, "jjjjjjjjjjjj");
  
    dispatch(setDashboard(data.data));
    } catch (error) {
    console.error("Error fetching dashboard data:", error);
    handleAuthError(error);
    } finally {
      setLoading(false);
    }
  }

export default taskSlice.reducer;
