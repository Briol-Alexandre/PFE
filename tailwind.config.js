import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        screens: {
            sm: '460px',
            md: '768px',
            rg: '1024px',
            rl: '1240px',
            lg: '1440px',
            xl: '1920px',
            xxl: '2080px',
            '2xl': '2300px',
        },
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                erstoria: ['Erstoria', ...defaultTheme.fontFamily.sans],
                'just-sans': ['JUST Sans', ...defaultTheme.fontFamily.sans],
            },
            fontSize: {
                '4.5xl': '40px',
            },
            colors: {
                brand: {
                    DEFAULT: '#EAEAE5',
                    red: '#FF0000',
                },
            },
            zIndex: {
                '-1': '-1',
            },
        },
    },

    plugins: [forms],
};
