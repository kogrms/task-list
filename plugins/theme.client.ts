export default defineNuxtPlugin(() => {
  const theme = localStorage.getItem('theme')
    || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')

  document.documentElement.classList.toggle('dark', theme === 'dark')
})
