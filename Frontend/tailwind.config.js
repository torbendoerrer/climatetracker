/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx}'],
    theme: {
        extend: {
            animation: {
                'slow-pulse':
                    'pulse 3s cubic-bezier(0.2, 0.2, 0.6, 1) infinite',
            },
            colors: {
                green: {
                    350: '#8ddb97',
                },
                lime: {
                    550: '#06ed06',
                },
            },
            height: {
                18: '4.5rem',
            },
            maxWidth: {
                0.8: '80%',
            },
            transitionDuration: {
                250: '250ms',
            },
            width: {
                18: '4.5rem',
                112: '28rem',
            },
        },
        screens: {
            sm: '384px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
        },
    },
}
