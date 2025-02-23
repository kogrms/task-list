/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue'
  ],
  darkMode: 'class',
  theme: {
    fontSize: {
      t10: ['10px', '110%'],
      t12: ['12px', '16px'],
      t13: ['13px', '16px'],
      t14: ['14px', '120%'],
      t16: ['16px', '120%'],
      t20: ['20px', '120%'],
      h1: ['24px', '29px']
    },
    colors: {
      'black': '#000000',
      'white': '#FFFFFF',
      'blue': '#2578F4',
      'grey-c7': '#C7CCD1',
      'grey-20': '#202427',
      'grey-8f': '#8F99A3',
      'purple': '#5D5FEF',
      'pink': '#EF5DA8',
      'red': '#EC3535'
    },
    extend: {
      screens: {
        sm: '420px',
        md: '500px'
      },
      width: {
        'content': '410px'
      },
      maxWidth: {
        '1/3': '33.333333%'
      }
    }
  }
}
