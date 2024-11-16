/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        // Primary Colors
        'primary-color': '#000000',  // Cool Blue for main actions
        'primary-color-hover': '#1a1a1a', // Slightly darker for hover effects

        // Secondary Colors
        'secondary-color': '#50E3C2',  // Teal for secondary actions
        'secondary-color-hover': '#39BBA7', // Darker teal for hover effects

        // Alert/Status Colors
        'cancel-color': '#E74C3C', // Red for cancel buttons or error states
        'cancel-color-hover': '#C0392B', // Darker red for hover on cancel buttons
        'warning-color': '#F5A623', // Amber for warnings
        'success-color': '#2ECC71', // Green for success messages or confirmations
        'info-color': '#3498DB', // Light blue for information messages

        // Backgrounds
        'background-color': '#F7FAFC', // Light gray for page background
        'card-background-color': '#FFFFFF', // White for card backgrounds
        'card-background-hover-color': '#F0F4F8', // Very light gray for card hover

        // Input Fields and Buttons
        'input-background-color': '#EDF2F7', // Light gray for inputs
        'btn-background-color': '#4A90E2', // Use primary color for main buttons
        'btn-background-hover-color': '#357ABD', // Use primary-color-hover for button hover
        'btn-background-disabled-color': '#A0AEC0', // Muted gray for disabled buttons

        // Text
        'text-primary': '#1A202C', // Dark gray for primary text
        'text-secondary': '#4A5568', // Medium gray for secondary text
        'text-muted': '#718096', // Light gray for muted text

        // Borders
        'border-color': '#CBD5E0', // Soft gray for borders
      },
    },
  },
  plugins: [],
};