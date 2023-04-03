/** @type {import('tailwindcss').Config} */
const config = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                orange: 'rgba(255, 100, 51, 1)',
                border: 'rgba(31, 31, 31, 0.1)',
                disabled: 'rgba(31, 31, 31, 0.2)',
            },
            backgroundColor: {
                orange: 'rgba(255, 100, 51, 1)',
                border: 'rgba(31, 31, 31, 0.1)',
                disabled: 'rgba(31, 31, 31, 0.2)',
                'header-darkness': 'rgba(7, 0, 48, 1)',
                'footer-lightness': 'rgba(253, 250, 244, 1)',
            },
            filter: {
                'white-icon': 'brightness(0) invert(1)',
            },
            borderRadius: {
                1: '2px',
                2: '8px',
                3: '12px',
                4: '16px',
            }
        },
    },
    plugins: [],
};

module.exports = config;
