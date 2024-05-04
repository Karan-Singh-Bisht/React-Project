import React from "react";

function Button({
	children,
	type = "button",
	bgColor = "bg-blue-600",
	textColor = "white",
	className = "",
	...props
}) {
	//children is nothing just btn ka text.
	return (
		<button
			className={`px-4 py-3 ${className} ${bgColor} ${textColor} rounded-md`}
            {...props}
		>
			{children}
		</button>
	);
}

export default Button;
