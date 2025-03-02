


/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
 
  ],
  theme: {
    extend: {
      container: {
        center: true,
      },
      colors: {
        primary: '#7673c9',
        
      }
      
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}

