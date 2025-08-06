// import React, { useState, useEffect } from "react";

// // Mock data for demonstration
// const mockDashboardData = {
//   todayTasks: [
//     {
//       _id: "1",
//       title: "Complete Project Documentation",
//       description: "Write comprehensive documentation for the new project features and API endpoints.",
//       status: "In Progress",
//       createdAt: "2024-08-06T10:30:00Z",
//       startTime: "2024-08-06T11:00:00Z",
//       duration: 3600,
//       isRunning: true,
//     },
//     {
//       _id: "2",
//       title: "Code Review",
//       description: "Review pull requests from team members and provide feedback.",
//       status: "Pending",
//       createdAt: "2024-08-06T09:15:00Z",
//       duration: 0,
//       isRunning: false,
//     },
//     {
//       _id: "3",
//       title: "Team Meeting",
//       description: "Weekly team standup meeting to discuss progress and blockers.",
//       status: "Completed",
//       createdAt: "2024-08-06T08:00:00Z",
//       startTime: "2024-08-06T09:00:00Z",
//       endTime: "2024-08-06T10:00:00Z",
//       duration: 3600,
//       isRunning: false,
//     },
//     {
//       _id: "4",
//       title: "Bug Fixes",
//       description: "Fix critical bugs reported by QA team.",
//       status: "In Progress",
//       createdAt: "2024-08-06T14:20:00Z",
//       duration: 1800,
//       isRunning: false,
//     },
//     {
//       _id: "5",
//       title: "Database Backup",
//       description: "Perform daily database backup and verification.",
//       status: "Pending",
//       createdAt: "2024-08-06T16:00:00Z",
//       duration: 0,
//       isRunning: false,
//     },
//   ],
//   summaries: {
//     today: {
//       totalTasks: 5,
//       completedTasks: 1,
//       inProgressTasks: 2,
//       pendingTasks: 2,
//       totalTimeSpent: 9000, // 2.5 hours
//     },
//     weekly: {
//       totalTasks: 15,
//       completedTasks: 10,
//       totalTimeSpent: 36000, // 10 hours
//     },
//     monthly: {
//       totalTasks: 60,
//       completedTasks: 45,
//       totalTimeSpent: 120000, // 33.33 hours
//     }
//   }
// };

// const Dashboard = () => {
//   const [dashboard, setDashboardData] = useState(mockDashboardData);
//   const [timers, setTimers] = useState({});

//   // Initialize timers for running tasks
//   useEffect(() => {
//     const initialTimers = {};
//     dashboard.todayTasks.forEach(task => {
//       if (task.isRunning) {
//         const elapsed = task.startTime 
//           ? Math.floor((new Date() - new Date(task.startTime)) / 1000) + (task.duration || 0)
//           : task.duration || 0;
//         initialTimers[task._id] = { 
//           running: true, 
//           elapsed: elapsed 
//         };
//       } else {
//         initialTimers[task._id] = { 
//           running: false, 
//           elapsed: task.duration || 0 
//         };
//       }
//     });
//     setTimers(initialTimers);
//   }, [dashboard.todayTasks]);

//   // Timer management for running tasks
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTimers(prev => {
//         const newTimers = { ...prev };
//         Object.keys(newTimers).forEach(taskId => {
//           if (newTimers[taskId].running) {
//             newTimers[taskId].elapsed += 1;
//           }
//         });
//         return newTimers;
//       });
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   const formatTime = (seconds) => {
//     const hours = Math.floor(seconds / 3600);
//     const minutes = Math.floor((seconds % 3600) / 60);
//     const secs = seconds % 60;
//     return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

//   const formatDuration = (seconds) => {
//     const hours = Math.floor(seconds / 3600);
//     const minutes = Math.floor((seconds % 3600) / 60);
    
//     if (hours > 0) {
//       return `${hours}h ${minutes}m`;
//     } else if (minutes > 0) {
//       return `${minutes}m`;
//     } else {
//       return `${seconds}s`;
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Pending':
//         return 'bg-yellow-100 text-yellow-800 border-yellow-200';
//       case 'In Progress':
//         return 'bg-blue-100 text-blue-800 border-blue-200';
//       case 'Completed':
//         return 'bg-green-100 text-green-800 border-green-200';
//       default:
//         return 'bg-gray-100 text-gray-800 border-gray-200';
//     }
//   };

//   const calculateProgress = (completed, total) => {
//     if (total === 0) return 0;
//     return Math.round((completed / total) * 100);
//   };

//   const { todayTasks, summaries } = dashboard;
//   const { today, weekly, monthly } = summaries;

//   return (
//     <div className="bg-gray-50 min-h-screen py-6 px-5">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">Task Dashboard</h1>
//           <p className="text-gray-600">Today is {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
//         </div>

//         {/* Summary Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           {/* Today Summary */}
//           <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-lg font-semibold text-gray-900">Today</h3>
//               <div className="bg-blue-100 p-2 rounded-lg">
//                 <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>
//             </div>
            
//             <div className="space-y-3">
//               <div className="flex justify-between items-center">
//                 <span className="text-sm text-gray-600">Total Tasks</span>
//                 <span className="text-2xl font-bold text-gray-900">{today.totalTasks}</span>
//               </div>
              
//               <div className="grid grid-cols-3 gap-2 text-center">
//                 <div className="bg-green-50 p-2 rounded">
//                   <div className="text-lg font-bold text-green-600">{today.completedTasks}</div>
//                   <div className="text-xs text-green-600">Completed</div>
//                 </div>
//                 <div className="bg-blue-50 p-2 rounded">
//                   <div className="text-lg font-bold text-blue-600">{today.inProgressTasks}</div>
//                   <div className="text-xs text-blue-600">In Progress</div>
//                 </div>
//                 <div className="bg-yellow-50 p-2 rounded">
//                   <div className="text-lg font-bold text-yellow-600">{today.pendingTasks}</div>
//                   <div className="text-xs text-yellow-600">Pending</div>
//                 </div>
//               </div>
              
//               <div className="pt-2 border-t">
//                 <div className="flex justify-between items-center mb-2">
//                   <span className="text-sm text-gray-600">Progress</span>
//                   <span className="text-sm font-semibold text-gray-900">
//                     {calculateProgress(today.completedTasks, today.totalTasks)}%
//                   </span>
//                 </div>
//                 <div className="w-full bg-gray-200 rounded-full h-2">
//                   <div 
//                     className="bg-green-500 h-2 rounded-full transition-all duration-500"
//                     style={{ width: `${calculateProgress(today.completedTasks, today.totalTasks)}%` }}
//                   ></div>
//                 </div>
//               </div>
              
//               <div className="flex justify-between items-center pt-2 border-t">
//                 <span className="text-sm text-gray-600">Time Spent</span>
//                 <span className="text-sm font-bold text-gray-900">{formatDuration(today.totalTimeSpent)}</span>
//               </div>
//             </div>
//           </div>

//           {/* Weekly Summary */}
//           <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-lg font-semibold text-gray-900">This Week</h3>
//               <div className="bg-purple-100 p-2 rounded-lg">
//                 <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                 </svg>
//               </div>
//             </div>
            
//             <div className="space-y-4">
//               <div className="text-center">
//                 <div className="text-3xl font-bold text-gray-900">{weekly.totalTasks}</div>
//                 <div className="text-sm text-gray-600">Total Tasks</div>
//               </div>
              
//               <div className="flex justify-between items-center">
//                 <span className="text-sm text-gray-600">Completed</span>
//                 <span className="text-lg font-bold text-green-600">{weekly.completedTasks}</span>
//               </div>
              
//               <div className="pt-2 border-t">
//                 <div className="flex justify-between items-center mb-2">
//                   <span className="text-sm text-gray-600">Completion Rate</span>
//                   <span className="text-sm font-semibold text-gray-900">
//                     {calculateProgress(weekly.completedTasks, weekly.totalTasks)}%
//                   </span>
//                 </div>
//                 <div className="w-full bg-gray-200 rounded-full h-2">
//                   <div 
//                     className="bg-purple-500 h-2 rounded-full transition-all duration-500"
//                     style={{ width: `${calculateProgress(weekly.completedTasks, weekly.totalTasks)}%` }}
//                   ></div>
//                 </div>
//               </div>
              
//               <div className="flex justify-between items-center pt-2 border-t">
//                 <span className="text-sm text-gray-600">Time Spent</span>
//                 <span className="text-sm font-bold text-gray-900">{formatDuration(weekly.totalTimeSpent)}</span>
//               </div>
//             </div>
//           </div>

//           {/* Monthly Summary */}
//           <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-lg font-semibold text-gray-900">This Month</h3>
//               <div className="bg-green-100 p-2 rounded-lg">
//                 <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
//                 </svg>
//               </div>
//             </div>
            
//             <div className="space-y-4">
//               <div className="text-center">
//                 <div className="text-3xl font-bold text-gray-900">{monthly.totalTasks}</div>
//                 <div className="text-sm text-gray-600">Total Tasks</div>
//               </div>
              
//               <div className="flex justify-between items-center">
//                 <span className="text-sm text-gray-600">Completed</span>
//                 <span className="text-lg font-bold text-green-600">{monthly.completedTasks}</span>
//               </div>
              
//               <div className="pt-2 border-t">
//                 <div className="flex justify-between items-center mb-2">
//                   <span className="text-sm text-gray-600">Completion Rate</span>
//                   <span className="text-sm font-semibold text-gray-900">
//                     {calculateProgress(monthly.completedTasks, monthly.totalTasks)}%
//                   </span>
//                 </div>
//                 <div className="w-full bg-gray-200 rounded-full h-2">
//                   <div 
//                     className="bg-green-500 h-2 rounded-full transition-all duration-500"
//                     style={{ width: `${calculateProgress(monthly.completedTasks, monthly.totalTasks)}%` }}
//                   ></div>
//                 </div>
//               </div>
              
//               <div className="flex justify-between items-center pt-2 border-t">
//                 <span className="text-sm text-gray-600">Time Spent</span>
//                 <span className="text-sm font-bold text-gray-900">{formatDuration(monthly.totalTimeSpent)}</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Today's Tasks Section */}
//         <div className="bg-white rounded-xl shadow-lg border border-gray-100">
//           <div className="p-6 border-b border-gray-100">
//             <div className="flex justify-between items-center">
//               <h2 className="text-xl font-semibold text-gray-900">Today's Tasks</h2>
//               <div className="flex items-center gap-2 text-sm text-gray-600">
//                 <div className="flex items-center gap-1">
//                   <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                   <span>{today.completedTasks} Completed</span>
//                 </div>
//                 <div className="flex items-center gap-1">
//                   <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//                   <span>{today.inProgressTasks} In Progress</span>
//                 </div>
//                 <div className="flex items-center gap-1">
//                   <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
//                   <span>{today.pendingTasks} Pending</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Tasks List */}
//           <div className="p-6">
//             {todayTasks.length === 0 ? (
//               <div className="text-center py-12">
//                 <div className="text-gray-400 mb-4">
//                   <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
//                   </svg>
//                 </div>
//                 <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks for today</h3>
//                 <p className="text-gray-500">All caught up! Enjoy your day.</p>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {todayTasks.map((task) => {
//                   const currentTimer = timers[task._id];
//                   const displayTime = currentTimer ? currentTimer.elapsed : (task.duration || 0);
                  
//                   return (
//                     <div key={task._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
//                       <div className="flex-1">
//                         <div className="flex items-center gap-3 mb-2">
//                           <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
//                           <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(task.status)}`}>
//                             {task.status}
//                           </span>
//                           {task.isRunning && (
//                             <div className="flex items-center text-green-600">
//                               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-1"></div>
//                               <span className="text-xs font-medium">Running</span>
//                             </div>
//                           )}
//                         </div>
//                         <p className="text-sm text-gray-600 mb-2">{task.description}</p>
//                         <div className="flex items-center gap-4 text-xs text-gray-500">
//                           <span>Created: {new Date(task.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
//                           {task.startTime && (
//                             <span>Started: {new Date(task.startTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
//                           )}
//                           {task.endTime && (
//                             <span>Completed: {new Date(task.endTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
//                           )}
//                         </div>
//                       </div>
                      
//                       <div className="flex items-center gap-4">
//                         <div className="text-right">
//                           <div className="text-lg font-mono font-bold text-gray-900">
//                             {formatTime(displayTime)}
//                           </div>
//                           <div className="text-xs text-gray-500">Time spent</div>
//                         </div>
                        
//                         {task.status === 'Completed' ? (
//                           <div className="flex items-center text-green-600">
//                             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                             </svg>
//                           </div>
//                         ) : (
//                           <div className="flex gap-2">
//                             {!task.isRunning ? (
//                               <button className="flex items-center gap-1 bg-green-500 text-white px-3 py-1.5 rounded-lg hover:bg-green-600 transition-colors text-sm">
//                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-9-4V8a3 3 0 016 0v2M5 12v7a1 1 0 001 1h12a1 1 0 001-1v-7" />
//                                 </svg>
//                                 Start
//                               </button>
//                             ) : (
//                               <button className="flex items-center gap-1 bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600 transition-colors text-sm">
//                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
//                                 </svg>
//                                 Complete
//                               </button>
//                             )}
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dashBoardData } from "../../redux/slices/taskSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { dashboard } = useSelector((state) => state.taskSlice); 
  
  const [loading, setLoading] = useState(true);
  const [timers, setTimers] = useState({});

  // Fetch dashboard data on mount
  useEffect(() => {
    dispatch(dashBoardData(setLoading));
  }, [dispatch]);

  // Initialize timers
  useEffect(() => {
    if (!dashboard?.todayTasks) return;

    const initialTimers = {};
    dashboard.todayTasks.forEach(task => {
      if (task.isRunning) {
        const elapsed = task.startTime 
          ? Math.floor((new Date() - new Date(task.startTime)) / 1000) + (task.duration || 0)
          : task.duration || 0;
        initialTimers[task._id] = { running: true, elapsed };
      } else {
        initialTimers[task._id] = { running: false, elapsed: task.duration || 0 };
      }
    });

    setTimers(initialTimers);
  }, [dashboard]);

  // Timer updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prev) => {
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

  // Formatters
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours}h ${minutes}m` : minutes > 0 ? `${minutes}m` : `${seconds}s`;
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

  const calculateProgress = (completed, total) => {
    if (total === 0) return 0;
    return Math.round((completed / total) * 100);
  };

  // Destructure safely
  const todayTasks = dashboard?.todayTasks || [];
  const summaries = dashboard?.summaries || {};
  const { today = {}, weekly = {}, monthly = {} } = summaries;

  // Optionally: loading spinner
  if (loading) {
    return <div className="text-center py-20 text-lg text-gray-500">Loading Dashboard...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-6 px-5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Task Dashboard</h1>
          <p className="text-gray-600">Today is {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Today Summary */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Today</h3>
              <div className="bg-blue-100 p-2 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Tasks</span>
                <span className="text-2xl font-bold text-gray-900">{today.totalTasks}</span>
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-green-50 p-2 rounded">
                  <div className="text-lg font-bold text-green-600">{today.completedTasks}</div>
                  <div className="text-xs text-green-600">Completed</div>
                </div>
                <div className="bg-blue-50 p-2 rounded">
                  <div className="text-lg font-bold text-blue-600">{today.inProgressTasks}</div>
                  <div className="text-xs text-blue-600">In Progress</div>
                </div>
                <div className="bg-yellow-50 p-2 rounded">
                  <div className="text-lg font-bold text-yellow-600">{today.pendingTasks}</div>
                  <div className="text-xs text-yellow-600">Pending</div>
                </div>
              </div>
              
              <div className="pt-2 border-t">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Progress</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {calculateProgress(today.completedTasks, today.totalTasks)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${calculateProgress(today.completedTasks, today.totalTasks)}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-2 border-t">
                <span className="text-sm text-gray-600">Time Spent</span>
                <span className="text-sm font-bold text-gray-900">{formatDuration(today.totalTimeSpent)}</span>
              </div>
            </div>
          </div>

          {/* Weekly Summary */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">This Week</h3>
              <div className="bg-purple-100 p-2 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{weekly.totalTasks}</div>
                <div className="text-sm text-gray-600">Total Tasks</div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Completed</span>
                <span className="text-lg font-bold text-green-600">{weekly.completedTasks}</span>
              </div>
              
              <div className="pt-2 border-t">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Completion Rate</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {calculateProgress(weekly.completedTasks, weekly.totalTasks)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${calculateProgress(weekly.completedTasks, weekly.totalTasks)}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-2 border-t">
                <span className="text-sm text-gray-600">Time Spent</span>
                <span className="text-sm font-bold text-gray-900">{formatDuration(weekly.totalTimeSpent)}</span>
              </div>
            </div>
          </div>

          {/* Monthly Summary */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">This Month</h3>
              <div className="bg-green-100 p-2 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{monthly.totalTasks}</div>
                <div className="text-sm text-gray-600">Total Tasks</div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Completed</span>
                <span className="text-lg font-bold text-green-600">{monthly.completedTasks}</span>
              </div>
              
              <div className="pt-2 border-t">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Completion Rate</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {calculateProgress(monthly.completedTasks, monthly.totalTasks)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${calculateProgress(monthly.completedTasks, monthly.totalTasks)}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-2 border-t">
                <span className="text-sm text-gray-600">Time Spent</span>
                <span className="text-sm font-bold text-gray-900">{formatDuration(monthly.totalTimeSpent)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Tasks Section */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Today's Tasks</h2>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>{today.completedTasks} Completed</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>{today.inProgressTasks} In Progress</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span>{today.pendingTasks} Pending</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tasks List */}
          <div className="p-6">
            {todayTasks.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks for today</h3>
                <p className="text-gray-500">All caught up! Enjoy your day.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {todayTasks.map((task) => {
                  const currentTimer = timers[task._id];
                  const displayTime = currentTimer ? currentTimer.elapsed : (task.duration || 0);
                  
                  return (
                    <div key={task._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(task.status)}`}>
                            {task.status}
                          </span>
                          {task.isRunning && (
                            <div className="flex items-center text-green-600">
                              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-1"></div>
                              <span className="text-xs font-medium">Running</span>
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>Created: {new Date(task.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                          {task.startTime && (
                            <span>Started: {new Date(task.startTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                          )}
                          {task.endTime && (
                            <span>Completed: {new Date(task.endTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-lg font-mono font-bold text-gray-900">
                            {formatTime(displayTime)}
                          </div>
                          <div className="text-xs text-gray-500">Time spent</div>
                        </div>
                        
                        {task.status === 'Completed' ? (
                          <div className="flex items-center text-green-600">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                        ) : (
                          <div className="flex gap-2">
                            {!task.isRunning ? (
                              <button className="flex items-center gap-1 bg-green-500 text-white px-3 py-1.5 rounded-lg hover:bg-green-600 transition-colors text-sm">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-9-4V8a3 3 0 016 0v2M5 12v7a1 1 0 001 1h12a1 1 0 001-1v-7" />
                                </svg>
                                Start
                              </button>
                            ) : (
                              <button className="flex items-center gap-1 bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600 transition-colors text-sm">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                                </svg>
                                Complete
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
