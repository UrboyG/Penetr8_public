/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // "./node_modules/flowbite/**/*.js",
  ],
  plugins: [
    // require("flowbite/plugin"),
    // require("flowbite/plugin")({
    //   charts: true,
    // }),
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      colors: {
        Fuchsia_pink_1: "#EDD6E1",
        Fuchsia_pink_5: "#A3346B",
        dark_purple_5: "#632C61",
        dark_purple_6: "#4F234E",
        dark_kpurple_7: "#3B1A3A",
        Black_text_5: "#3D3D3D",
        Black_text_4: "#5B5B5B",
        Black_text_3: "#787878",
        blue_2: "#7E7FAC",
        blue_0: "#BCBDE5",
        blue_4: "#414273",

        dark_purple_8_5: "#1E0D1D",
        black_text_7: "#252525",
        grey_7: "#B3B8C1",
        grey_5: "#F4F5F7",
        grey_3: " #F8F9FA",
        grey_1: " #FDFDFD",
        grey_2: " #FBFBFC",
        light_error: " #Fce9ed",
        error: " #e5254b",
        warning: " #ea7000",
        light_warning: " #fdf1e5",
        light_firm: "#e6f2e5",
        firm: " #038100",
        Noti: "#e5f8ff",
        pur: "#654ea3",
        pik: "#eaafc8",
      },
      backgroundImage: {
        "gradient-button": "linear-gradient(to right, #A3346B, #632C61)",
      },
      boxShadow: {
        gradient:
          "0 2px 5px rgba(65, 66, 115, 0.2), 0 2px 10px rgba(99, 44, 97, 0.2), 0 2px 15px rgba(163, 52, 107, 0.2)",
      },
    },
  },
  plugins: [],
};
