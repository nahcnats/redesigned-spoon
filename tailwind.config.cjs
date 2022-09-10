const { join } = require("path");
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        join(
            __dirname,
            "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"
        ),
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};
