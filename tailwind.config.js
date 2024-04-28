/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    colors: {
        "waikawa-gray": {
            50: "#f2f7fb",
            100: "#e7f0f8",
            200: "#d3e2f2",
            300: "#b9cfe8",
            400: "#9cb6dd",
            500: "#839dd1",
            600: "#6a7fc1",
            700: "#6374ae",
            800: "#4a5989",
            900: "#414e6e",
            950: "#262c40",
        },
    },
    theme: {
        extend: {},
    },
    plugins: [],
};
