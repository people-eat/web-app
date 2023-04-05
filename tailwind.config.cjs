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
                hover: 'rgba(255, 100, 51, .7)',
                base: 'rgba(245, 245, 245, 1)',
                border: 'rgba(31, 31, 31, 0.1)',
                disabled: 'rgba(31, 31, 31, 0.2)',
                'header-darkness': 'rgba(7, 0, 48, 1)',
                'footer-lightness': 'rgba(253, 250, 244, 1)',
            },
            fontSize: {
                "heading-ss": ["18px", { fontWeight: "500" }],
                "heading-s": ["20px", { fontWeight: "600", lineHeight: "24px" }],
                "heading-m": ["24px", { fontWeight: "600" }],
                "heading-l": ["32px", { fontWeight: "600" }],
                "text-s": ["12px", { lineHeight: "15px" }],
                "text-sm": ["14px"],
                "text-m": ["16px"],
                "text-l": ["18px"],
                "text-l-bold": ["18px", { fontWeight: "600" }],
                "accent-l": ["18px", { fontWeight: "500" }],
            },
            filter: {
                'white-icon': 'brightness(0) invert(1)',
            },
            spacing: {
                px: "1px",
                0: "0px",
                1: '2px',
                2: '8px',
                3: '12px',
                4: '16px',
                5: '20px',
                6: '24px',
                7: '28px',
                8: '32px',
                9: '36px',
                10: '40px',
                11: '44px',
                12: '48px',
                "icon-1": "24px",
                "icon-2": "32px",
            },
            borderRadius: {
                1: '2px',
                2: '8px',
                3: '12px',
                4: '16px',
                5: '20px',
                6: '24px',
                7: '28px',
                8: '32px',
                9: '36px',
                10: '40px',
                11: '44px',
                12: '48px',
            }
        },
    },
    plugins: [],
};

module.exports = config;
