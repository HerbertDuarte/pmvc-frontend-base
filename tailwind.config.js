/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.vue', './index.html'],
    theme: {
        extend: {
            height: {
                content: 'calc(100dvh - 140px)', // Define a altura personalizada
            },
            minHeight: {
                content: 'calc(100dvh - 140px)',
            },
            maxHeight: {
                content: 'calc(100dvh - 140px)',
            },
        },
    },
};
