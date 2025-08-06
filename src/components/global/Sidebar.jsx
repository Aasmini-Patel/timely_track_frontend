import React from "react";
import { Link, useLocation } from "react-router-dom";

const sidebar = [
  {
    label: "Dashboard",
    iconClass: "ri-home-4-line",
    url: "/",
    activeStateUrls: [""],
  },
  {
    label: "Task",
    iconClass: "ri-task-line",
    url: "/task",
    activeStateUrls: ["/task", "/tasks" ],
  }
];

// const Sidebar = ({ fullSidebar, mobileView }) => {
  
//   const { pathname } = useLocation();
//   const splittedPathname = pathname.split("/")[1];

//   return (
//     <div className="py-4">
//       <ul>
//         {mobileView && <div className={`flex items-center ${fullSidebar ? "gap-2 px-4 justify-start w-full" : "justify-center" }`}>
//           <img
//             className={`${
//               fullSidebar ? "w-[48px] h-[42px]" : "w-[35px] h-[35px]"
//             }`}
//             src="/assets/images/logo.png"
//           />
//           {fullSidebar && (
//             <h2 className="text-[15px] font-semibold">
//               Timely Track
//             </h2>
//           ) }
//         </div>}
//         {sidebar.map((item, index) => (
//           <li key={index} className={fullSidebar ? "" : "flex justify-center"}>
//             <Link
//               to={item.url}
//               // onClick={onMobileClose}
//               className={`flex items-center py-3
//                 ${fullSidebar ? "gap-2 px-4 justify-start w-full" : "justify-center"}
//                 ${item.activeStateUrls.includes(splittedPathname)
//                   ? "text-cyan-500 hover:text-rose-600"
//                   : "text-zinc-600 hover:text-medium hover:text-cyan-600"
//               }`}
//             >
//               <i className={`${item.iconClass} text-lg`}></i>
//               {fullSidebar && <span>{item.label}</span>}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };
const Sidebar = ({ fullSidebar, mobileView }) => {
  const { pathname } = useLocation();
  const splittedPathname = pathname.split("/")[1];

  return (
    <div className="py-4">
      <ul>
        {/* Removed logo/image section */}
        {sidebar.map((item, index) => (
          <li key={index} className={fullSidebar ? "" : "flex justify-center"}>
            <Link
              to={item.url}
              className={`flex items-center py-3
                ${fullSidebar ? "gap-2 px-4 justify-start w-full" : "justify-center"}
                ${item.activeStateUrls.includes(splittedPathname)
                  ? "text-cyan-500 hover:text-rose-600"
                  : "text-zinc-600 hover:text-medium hover:text-cyan-600"
                }`}
            >
              <i className={`${item.iconClass} text-lg`}></i>
              {fullSidebar && <span>{item.label}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;