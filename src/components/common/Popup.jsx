const Popup = ({ toggle, setToggle, children, label, confrirmBtnClick, width = "md" }) => {
  if (!toggle) return null;
  
  const widthClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl"
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`bg-white rounded-lg ${widthClasses[width]} w-full mx-4`}>
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">{label}</h3>
          <button onClick={setToggle} className="text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div>{children}</div>
        <div className="flex justify-end gap-2 p-4 border-t">
          <button
            onClick={setToggle}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={confrirmBtnClick}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;