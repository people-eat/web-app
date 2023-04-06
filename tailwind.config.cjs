/** @type {import('tailwindcss').Config} */
const config = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    corePlugins: {
        preflight: false,
    },
    theme: {
        extend: {
            colors: {
                orange: 'rgba(255, 100, 51, 1)',
                orangeActive: '#FF4C13',
                border: 'rgba(31, 31, 31, 0.1)',
                disabled: 'rgba(31, 31, 31, 0.2)',
                gray: 'rgba(188, 188, 188, 1)',
                midBlack: 'rgba(31, 31, 31, 0.4)',
                '60black': 'rgba(31, 31, 31, 0.6)',
                preBlack: 'rgba(31, 31, 31, 0.8)',
                lightBlack: 'rgba(31, 31, 31, 1)',
                midBlackHover: 'rgba(31, 31, 31, 0.05)',
                darkBlue: 'rgba(7, 0, 48, 1)',
                green: '#34A853',
            },
            boxShadow: {
                primary: '0px 1px 24px rgba(0, 0, 0, 0.08)',
                active: '0px 5px 24px rgba(0, 0, 0, 0.16)',
                orange: '0px 1px 12px rgba(255, 100, 51, 0.7)',
            },
            backgroundColor: {
                orange: 'rgba(255, 100, 51, 1)',
                orangePlus: 'rgba(255, 90, 38, 1)',
                hover: 'rgba(255, 100, 51, .7)',
                base: 'rgba(245, 245, 245, 1)',
                border: 'rgba(31, 31, 31, 0.1)',
                disabled: 'rgba(31, 31, 31, 0.2)',
                footer: 'rgba(253, 250, 244, 1)',
                separator: 'rgba(0, 0, 0, 0.2)',
                pagination: 'rgba(24, 24, 24, 0.5)',
                'header-darkness': 'rgba(7, 0, 48, 1)',
                'footer-lightness': 'rgba(253, 250, 244, 1)',
            },
            backgroundImage: {
                yellowLight: 'linear-gradient(180deg, #FFFCF3 0%, #FFFDF7 100%)',
            },
            borderColor: {
                orange: 'rgba(255, 100, 51, 1)',
                border: 'rgba(31, 31, 31, 0.1)',
                disabled: 'rgba(31, 31, 31, 0.2)',
            },
            fontSize: {
                'heading-ss': ['18px', { fontWeight: '500' }],
                'heading-ss-bold': ['18px', { fontWeight: '700' }],
                'heading-s': ['20px', { fontWeight: '600', lineHeight: '24px' }],
                'heading-m': ['24px', { fontWeight: '600' }],
                'heading-xm': ['28px', { fontWeight: '600' }],
                'rem-heading-xm': ['1.5rem', { fontWeight: '600' }],
                'heading-l': ['32px', { fontWeight: '600' }],
                'heading-xl': ['38px', { fontWeight: '600' }],
                'heading-xxl': ['52px', { fontWeight: '600' }],
                'text-s': ['12px', { lineHeight: '15px' }],
                'text-s-height': ['12px', { lineHeight: '20px' }],
                'text-sm': ['14px', { lineHeight: '18px' }],
                'text-sm-bold': ['14px', { lineHeight: '18px', fontWeight: '700' }],
                'text-m': ['16px', { lineHeight: '20px' }],
                'text-m-bold': ['16px', { fontWeight: '700' }],
                'text-l': ['18px', { lineHeight: '22px' }],
                'text-l-bold': ['18px', { fontWeight: '600' }],
                'accent-l': ['18px', { fontWeight: '500' }],
            },
            filter: {
                'white-icon': 'brightness(0) invert(1)',
            },
            spacing: {
                px: '1px',
                0: '0px',
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
                '10_': '42px',
                11: '44px',
                12: '48px',
                13: '52px',
                14: '56px',
                15: '60px',
                'icon-1': '24px',
                'icon-2': '32px',
            },
            screens: {
                big: { min: '1023px', max: '1279px' },
                // => @media (max-width: 1279px) { ... }

                lg: { max: '1023px' },
                // => @media (max-width: 1023px) { ... }

                lg_min: { min: '767px', max: '1023px' },

                md: { max: '767px' },
                // => @media (max-width: 767px) { ... }

                md_min: { min: '639px', max: '767px' },

                sm_max: { min: '640px' },

                sm: { max: '639px' },

                sm_min: { min: '518px', max: '639px' },

                minn: { min: '318px', max: '518px' },
                // => @media (max-width: 639px) { ... }
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
                13: '52px',
                14: '56px',
                15: '60px',
            },
            fontFamily: {
                manrope: '"Manrope", sans-serif',
            },
        },
    },
    plugins: [],
};

module.exports = config;
