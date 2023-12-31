/** @type {import('tailwindcss').Config} */

const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
        './node_modules/flowbite-react/**/*.js',
        './pages/**/*.{ts,tsx}',
        './public/**/*.html',
    ],
    theme: {
        extend: {},
    },
    plugins: [require('flowbite/plugin')],
});
