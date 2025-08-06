import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import {
  createTask,
  deleteTask,
  getAllTask,
  updateTask,
  startTask,
  stopTask,
} from "../../redux/slices/taskSlice";
import Popup from "../../components/common/Popup";

const Button = ({ children, className, onClick, variant = "primary", leadingIcon, ...props }) => {
  const baseClasses = "inline-flex items-center gap-2 px-3 py-1.5 rounded transition-colors";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    text: "bg-transparent hover:bg-gray-100",
    secondary: "bg-gray-200 text-gray-700 hover:bg-gray-300"
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {leadingIcon}
      {children}
    </button>
  );
};

const Task = () => {
  const dispatch = useDispatch();
  
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [createModal, setCreateModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedType, setSelectedType] = useState("All");
  const [forUpdate, setForUpdate] = useState(false);
  const [timers, setTimers] = useState({});

  const formRef = useRef();

  const { task, refetch } = useSelector((state) => state.taskSlice);
  const prevProps = useRef({ refetch }).current;

  // Initialize and fetch tasks
  useEffect(() => {
    dispatch(getAllTask(setLoading));
  }, [dispatch]);

  // Handle refetch when data changes
  useEffect(() => {
    if (prevProps.refetch !== refetch) {
      dispatch(getAllTask(setLoading));
    }
    return () => {
      prevProps.refetch = refetch;
    };
  }, [dispatch, prevProps, refetch]);

  // Update local data when Redux state changes
  useEffect(() => {
    setData(task);
    
    // Initialize timers for running tasks
    const initialTimers = {};
    task.forEach(taskItem => {
      if (taskItem.isRunning) {
        const elapsed = taskItem.startTime 
          ? Math.floor((new Date() - new Date(taskItem.startTime)) / 1000) + (taskItem.duration || 0)
          : taskItem.duration || 0;
        initialTimers[taskItem._id] = { 
          running: true, 
          elapsed: elapsed 
        };
      } else {
        initialTimers[taskItem._id] = { 
          running: false, 
          elapsed: taskItem.duration || 0 
        };
      }
    });
    setTimers(initialTimers);
  }, [task]);

  // Timer management for running tasks
  useEffect(() => {
    const interval = setInterval(() => {
      setTimers(prev => {
        const newTimers = { ...prev };
        Object.keys(newTimers).forEach(taskId => {
          if (newTimers[taskId].running) {
            newTimers[taskId].elapsed += 1;
          }
        });
        return newTimers;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Completed':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleSearch = (value) => {
    setSearchText(value);

    let filtered = task;

    if (selectedType !== "All") {
      filtered = filtered.filter((taskItem) => taskItem.status === selectedType);
    }

    if (value) {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(value.toLowerCase())
      );
    }

    setData(filtered);
  };

  const handleTypeFilter = (type) => {
    setSelectedType(type);

    let filtered = task;

    if (type !== "All") {
      filtered = filtered.filter((taskItem) => taskItem.status === type);
    }

    if (searchText) {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setData(filtered);
  };

  const handleResetFilters = () => {
    setSearchText("");
    setSelectedType("All");
    setData(task);
  };

  const handleAdd = () => {
    setSelectedTask(null);
    setForUpdate(false);
    setCreateModal(true);
  };

  const handleDelete = () => {
    dispatch(deleteTask(selectedTask._id, () => {
      setShowDeleteModal(false);
      setSelectedTask(null);
    }));
  };

  const handleConfirm = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  const formatDate = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const handleTaskAction = (taskId, action, isComplete = false) => {
  if (action === "start") {
    dispatch(startTask(taskId));
  } else if (action === "pause") {
    dispatch(stopTask(taskId)); // pause = stop without complete
  } else if (action === "stop") {
    dispatch(stopTask(taskId, isComplete));
  }
};


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-t-transparent border-orange-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-6 px-5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Task Management</h1>
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center gap-2 shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Task
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex gap-4 items-end flex-wrap">
            <div className="form-group">
              <label className="block text-gray-700 text-sm font-semibold mb-2">Search Tasks</label>
              <input
                className="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                type="text"
                placeholder="Search by title..."
                value={searchText}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="block text-gray-700 text-sm font-semibold mb-2">Filter by Status</label>
              <select
                className="w-48 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={selectedType}
                onChange={(e) => handleTypeFilter(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="form-group">
              <button
                onClick={handleResetFilters}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        {/* Task Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((taskItem) => {
            const currentTimer = timers[taskItem._id];
            const displayTime = currentTimer ? currentTimer.elapsed : (taskItem.duration || 0);
            
            return (
              <div key={taskItem._id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                {/* Card Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{taskItem.title}</h3>
                    <div className="flex gap-1">
                      <Button
                        className="text-blue-500 hover:text-blue-700 p-1"
                        onClick={() => {
                          setForUpdate(true);
                          setSelectedTask(taskItem);
                          setCreateModal(true);
                        }}
                        variant="text"
                        leadingIcon={
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        }
                      />
                      <Button
                        className="text-red-500 hover:text-red-700 p-1"
                        onClick={() => {
                          setShowDeleteModal(true);
                          setSelectedTask(taskItem);
                        }}
                        variant="text"
                        leadingIcon={
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        }
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(taskItem.status)}`}>
                      {taskItem.status}
                    </span>
                    {taskItem.isRunning && (
                      <div className="flex items-center text-green-600">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-1"></div>
                        <span className="text-xs font-medium">Running</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{taskItem.description || "No description provided."}</p>
                  
                  {/* Time Tracking */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-medium text-gray-700">Time Spent</span>
                      <span className="text-lg font-mono font-bold text-gray-900">
                        {formatTime(displayTime)}
                      </span>
                    </div>
                    
                    {/* Control Buttons */}
                    <div className="flex gap-2 justify-center">
  {(taskItem.status === 'Pending' || (taskItem.status === 'In Progress' && !taskItem.isRunning)) && (
    <button
      onClick={() => handleTaskAction(taskItem._id, 'start')}
      className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-9-4V8a3 3 0 016 0v2M5 12v7a1 1 0 001 1h12a1 1 0 001-1v-7" />
      </svg>
      {taskItem.status === 'Pending' ? 'Start' : 'Resume'}
    </button>
  )}

  {taskItem.status === 'In Progress' && taskItem.isRunning && (
    <>
      {/* ✅ Pause Button */}
      <button
        onClick={() => handleTaskAction(taskItem._id, 'pause')}
        className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors text-sm"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m6 3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Pause
      </button>

      {/* ✅ Complete Button */}
      <button
        onClick={() => handleTaskAction(taskItem._id, 'stop', true)}
        className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
        </svg>
        Complete
      </button>
    </>
  )}

  {taskItem.status === 'Completed' && (
    <div className="flex items-center gap-2 text-green-600">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span className="text-sm font-medium">Task Completed</span>
    </div>
  )}
</div>

                  </div>

                  {/* Task Metadata */}
                  {/* <div className="space-y-1 text-xs text-gray-500">
                    <div>Created: {new Date(taskItem.createdAt).toLocaleDateString()}</div>
                    {taskItem.startTime && (
                      <div>Started: {new Date(taskItem.startTime).toLocaleDateString()}</div>
                    )}
                    {taskItem.endTime && (
                      <div>Completed: {new Date(taskItem.endTime).toLocaleDateString()}</div>
                    )}
                  </div> */}
                  <div className="space-y-1 text-xs text-gray-500">
  <div>Created: {formatDate(taskItem.createdAt)}</div>
  {taskItem.startTime && <div>Started: {formatDate(taskItem.startTime)}</div>}
  {taskItem.endTime && <div>Completed: {formatDate(taskItem.endTime)}</div>}
</div>

                </div>
              </div>
            );
          })}
        </div>

        {data.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
            <p className="text-gray-500">Create your first task to get started.</p>
          </div>
        )}
      </div>

      {/* Add/Edit Task Modal */}
      <Popup
        toggle={createModal}
        setToggle={() => {
          setCreateModal(false);
          setForUpdate(false);
          setSelectedTask(null);
          formRef.current?.resetForm();
        }}
        width="lg"
        label={forUpdate ? "Edit Task" : "Add New Task"}
        confrirmBtnClick={handleConfirm}
      >
        <Formik
          innerRef={formRef}
          enableReinitialize
          initialValues={{
            title: selectedTask?.title || "",
            description: selectedTask?.description || "",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.title) errors.title = "Title is required";
            if (!values.description) errors.description = "Description is required";
            return errors;
          }}
          onSubmit={async (values, { resetForm }) => {
            if (forUpdate) {
              const updateBody = {
                ...values,
                _id: selectedTask._id,
              };
              dispatch(
                updateTask(updateBody, () => {
                  setCreateModal(false);
                  setForUpdate(false);
                  setSelectedTask(null);
                }, resetForm)
              );
            } else {
              dispatch(createTask(values, setCreateModal, resetForm));
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <div className="p-6 space-y-6">
              <div className="form-group">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out text-gray-700 text-base"
                  placeholder="Enter task title"
                />
                {errors.title && touched.title && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.title}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  rows={4}
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out text-gray-700 text-base"
                  placeholder="Enter task description"
                />
                {errors.description && touched.description && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.description}
                  </p>
                )}
              </div>
            </div>
          )}
        </Formik>
      </Popup>

      {/* Delete Confirmation Modal */}
      <Popup
        label="Delete Task"
        confrirmBtnClick={handleDelete}
        width="sm"
        toggle={showDeleteModal}
        setToggle={() => {
          setShowDeleteModal(false);
          setSelectedTask(null);
        }}
      >
        <div className="p-6">
          <div className="text-center">
            <div className="text-red-500 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Task</h3>
            <p className="text-gray-600">
              Are you sure you want to delete this task? This action cannot be undone.
            </p>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default Task;