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
        'primary-color': '#2563EB',  // Blue-600 for main actions
        'primary-color-hover': '#1D4ED8', // Slightly darker blue for hover effects

        // Secondary Colors
        'secondary-color': '#4F46E5',  // Indigo-600 for secondary actions
        'secondary-color-hover': '#4338CA', // Slightly darker indigo for hover effects

        // Alert/Status Colors
        'cancel-color': '#E74C3C', // Red for cancel buttons or error states
        'cancel-color-hover': '#C0392B', // Darker red for hover on cancel buttons
        'warning-color': '#F5A623', // Amber for warnings
        'success-color': '#2ECC71', // Green for success messages or confirmations
        'info-color': '#3498DB', // Light blue for information messages

        // Backgrounds
        'background-color': '#F9FAFB', // Neutral light gray with a slightly modern touch for page background.
        'card-background-color': '#FFFFFF', // Pure white for card backgrounds for a clean and sharp look.
        'card-background-hover-color': '#fff', // Slightly darker neutral tone for card hover, enhancing accessibility.
        'highlight-background-color': '#EDF2F7', // Cool, soft blue-gray for hover effects, creating a modern feel.
        'accent-background-color': '#E5E7EB', // Neutral gray for headers or secondary elements, ensuring subtle separation.

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