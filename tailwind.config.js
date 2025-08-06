/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx}"],
    mode: "jit",
    theme: {
        extend: {
            colors: {
                "orange-50": "#FFE0CC",
                "orange-100": "#FFB366",
                "orange-200": "#FF8A33",
                "orange-300": "#FF6600",
                "orange-400": "#CC5200",
                "orange-500": "#993D00",

                "grey-50": "#F4F5F6",
                "grey-100": "#E3E6E8",
                "grey-200": "#C5CBD1",
                "grey-300": "#AAB2BB",
                "grey-400": "#7F8C99",
                "grey-500": "#5F6B77",
                "grey-600": "#384047",
                "grey-700": "#22262b",

                "success-50": "#DBFFE3",
                "success-100": "#94FFAA",
                "success-200": "#34E175",
                "success-300": "#0DB14B",
                "success-400": "#078737",
                "success-500": "#035F25",

                "danger-50": "#fdedee",
                "danger-100": "#fbd0d3",
                "danger-200": "#f6a2a6",
                "danger-300": "#f47179",
                "danger-400": "#f4324c",
                "danger-500": "#9d1b2d",
                "danger-600": "#791120",
                "danger-700": "#4f020d",
            },
            boxShadow: {
                middleShadow: "0px 2px 4px 0px #0000001f, 0px 7px 7px 0px #0000001a, 0px 16px 10px 0px #00000014, 0px 28px 11px 0px #00000005, 0px 44px 12px 0px #00000000",
                elevationHighSubtle: "0px 19px 42px 0px #0000000d, 0px 77px 77px 0px #0000000a, 0px 173px 104px 0px #00000008, 0px 307px 123px 0px #00000003, 0px 480px 134px 0px #00000000",
                elevationHighStrong: "0px 9px 20px 0px #0000001a, 0px 37px 37px 0px #00000017, 0px 83px 50px 0px #0000000d, 0px 148px 59px 0px #00000003, 0px 232px 65px 0px #00000000",
                elevationMiddle: "0px 2px 4px 0px #0000001f, 0px 7px 7px 0px #0000001a, 0px 16px 10px 0px #00000014, 0px 28px 11px 0px #00000005, 0px 44px 12px 0px #00000000",
                elevationClose: "0px 0px 1px 0px #00000026, 0px 2px 2px 0px #0000001a, 0px 3px 2px 0px #0000000d, 0px 6px 2px 0px #00000008, 0px 10px 3px 0px #00000000",
            },
            screens: {
                xs: "450px",
            },
            backgroundImage: {
                "hero-pattern": "url('/src/assets/herobg.png')",
            },
        },
    },
    plugins: [],
};
