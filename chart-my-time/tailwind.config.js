module.exports = {
    content: [
        "./app/views/*.{html.twig,js}",
        "./app/views/**/*.{html.twig,js}",
        "./app/views/**/**/*.{html.twig,js}",
    ],
    theme: {
        extend: {
            screens: {
                'xs': '470px',
            }
        },
    },
    plugins: [],
} 