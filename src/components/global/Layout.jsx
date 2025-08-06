import React, { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useLocation } from "react-router-dom";

// const Layout = ({ children }) => {
//   const { pathname } = useLocation();
//   const [fullSidebar, setFullSidebar] = useState(true);

//   return (
//     <>
//       {pathname === "/login" ||
//       pathname === "/policies" ||
//       pathname.startsWith("/add") ||
//       pathname == "/404" ? (
//         <>{children}</>
//       ) : (
//         <>
//           <Header fullSidebar={fullSidebar} setFullSidebar={setFullSidebar} />
//           <div className="flex main-layout">
//             <div
//               className={`${
//                 fullSidebar ? "w-[20%]" : "w-[80px]"
//               } border-r border-r-[#e3e6e8] shadow-elevationClose bg-white`}
//             >
//               <Sidebar
//                 fullSidebar={fullSidebar}
//                 setFullSidebar={setFullSidebar}
//               />
//             </div>
//             <div
//               className={`${
//                 fullSidebar ? "w-[80%]" : "w-full"
//               } px-6 py-[28px] bg-grey-50`}
//             >
//               {children}
//             </div>
//           </div>
//         </>
//       )}
//     </>
//   );
// };

// export default Layout;

const Layout = ({ children }) => {
  const { pathname } = useLocation();
  const [fullSidebar, setFullSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const excludedPaths = ["/login", "/register", "/404"];
  const isMinimalLayout =
    excludedPaths.includes(pathname) || pathname.startsWith("/add");

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      mobile ? setFullSidebar(false) :  setFullSidebar(true) // always start collapsed
    };

    handleResize(); // set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMinimalLayout) return <>{children}</>;

  return (
    <>
    <div className="flex flex-col h-screen">
      <Header fullSidebar={fullSidebar} setFullSidebar={setFullSidebar} />

      <div className="flex flex-1 overflow-hidden relative">
        {/* 📱 Mobile: Compact + Drawer */}
        {isMobile ? (
          <>
            {/* Always visible compact sidebar */}
            <div className="w-[80px] h-full bg-white border-r border-gray-200 fixed top-0 left-0 z-40 overflow-y-auto">
              <Sidebar fullSidebar={false} mobileView={isMobile} />
            </div>

            {/* Drawer sidebar only if opened */}
            {fullSidebar && (
              <>
                <div className="fixed top-0 left-0 h-full w-[240px] bg-white z-50 shadow-lg overflow-y-auto">
                  <Sidebar
                    fullSidebar={true}
                    mobileView={isMobile}
                    // setFullSidebar={setFullSidebar}
                    // onMobileClose={() => setFullSidebar(false)}
                  />
                </div>
                <div
                  className="fixed inset-0 bg-black bg-opacity-30 z-40"
                  onClick={() => setFullSidebar(false)}
                ></div>
              </>
            )}
          </>
        ) : (
          // 💻 Desktop: Only one sidebar based on fullSidebar state
          <div
            className={`${
              fullSidebar ? "w-[240px]" : "w-[80px]"
            } h-full bg-white border-r border-gray-200 shadow-md overflow-y-auto`}
          >
            <Sidebar fullSidebar={fullSidebar} 
              mobileView={isMobile}
            // setFullSidebar={setFullSidebar} 
            />
          </div>
        )}

        {/* Content Area */}
        {/* <div className="flex-1 overflow-y-auto bg-gray-50 px-4 py-6">
          {children}
        </div> */}
        <div
          className={`transition-all duration-300 bg-grey-50 px-4 py-6 flex-1 
            ${
            isMobile ? "ml-[80px]" : fullSidebar 
          }
          `}
        >
          {children}
        </div>
      </div>
    </div>
    </>
  );
};

export default Layout;
