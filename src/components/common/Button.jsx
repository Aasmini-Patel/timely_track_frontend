import React from "react";

const Button = ({ className, label, size, type, noanimate = false, isLoading, isDisabled, onClick, variant, leadingIcon = "", trailingIcon = "" } = Props) => {
    return (
        <button onClick={onClick} type={type} disabled={isDisabled}  
        className={
            `btn-${variant}${className ? ` ${className}` : ""}
            ${size ? ` btn-${size}` : ""} 
            flex items-center gap-2 
            ${noanimate && "noanimate"}
            ${isDisabled ? "text-gray-400 cursor-not-allowed hover:text-gray-400" : ""}`
        }
            >
            {leadingIcon}
            {label ? <span className="mx-auto">{label}</span> : ""}
            {trailingIcon}
        </button>
    );
};

export default Button;