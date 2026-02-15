/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                handwriting: ['"Segoe Print"', 'cursive'],
            },
            animation: {
                'float': 'float 6s infinite ease-in',
            },
            keyframes: {
                float: {
                    '0%': { transform: 'translateY(0) rotate(0deg)', opacity: '0' },
                    '20%': { opacity: '0.8' },
                    '100%': { transform: 'translateY(-100vh) rotate(360deg)', opacity: '0' },
                }
            }
        },
    },
    plugins: [],
}
