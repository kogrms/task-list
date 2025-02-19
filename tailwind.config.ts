/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue'
  ],
  theme: {
    fontSize: {
      t10: ['10px', '110%'],
      t12: ['12px', '16px'],
      t13: ['13px', '16px'],
      t14: ['14px', '120%'],
      t16: ['16px', '120%'],
      h1: ['24px', '29px']
      // dt: ['14px', '120%'],
      // dt10: ['10px', '130%']
    },
    fontFamily: {
      // 'inter': ['Inter', 'sans-serif']
    },
    colors: {
      // 'gray-3': '#333333',
      // 'label-red': '#ed1c24',
      'black': '#000000',
      'white': '#FFFFFF',
      'blue': '#2578F4',
      'grey-c7': '#C7CCD1',
      'grey-20': '#202427',
      'grey-8f': '#8F99A3',
      'purple': '#5D5FEF',
      'pink': '#EF5DA8'
    },
    extend: {
      screens: {
        'sm': '420px',
        'md': '500px'
        // https://tailwindcss.com/docs/responsive-design
        // sm	@media(width >= 640px)
        // md	@media(width >= 768px)
        // lg	@media(width >= 1024px)
        // xl	@media(width >= 1280px)
        // 2xl	@media(width >= 1536px)
      },
      width: {
        'content': '410px',
        'task': '450px',
        '1px': '1px'
      },
      minWidth: {
      },
      maxWidth: {
        'content': '410px',
        'task': '450px',
        '9/10': '90%',
        '8/10': '80%',
        '7/10': '70%',
        '1/2': '50%',
        '1/3': '33.333333%'
      },
      height: {
        '1px': '1px'
      },
      minHeight: {
      },
      maxHeight: {
      },
      spacing: {
        '1px': '1px',
        '2px': '2px'
      },
      gap: {
      },
      boxShadow: {
      }
    }
  }
}
