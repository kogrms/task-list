// @ts-check
import antfu from '@antfu/eslint-config'
// import withNuxt from './.nuxt/eslint.config.mjs'
// export default withNuxt(
// )
export default antfu({
  // Disable stylistic formatting rules
  stylistic: false,
  // Or customize the stylistic rules
  // stylistic: {
  //   indent: 2, // 4, or 'tab'
  //   quotes: 'single', // or 'double'
  // },
  typescript: true,
  vue: true,
  // Disable jsonc and yaml support
  jsonc: false,
  yaml: false,
  // `.eslintignore` is no longer supported in Flat config, use `ignores` instead
  ignores: [
    '**/fixtures',
    // ...globs
  ],

  // Override some antfu's rules
  rules: {
    'vue/block-order': ['error', {
      order: ['template', 'script', 'style'],
    }],
    'vue/max-attributes-per-line': ['error', {
      singleline: {
        max: 1,
      },
      multiline: {
        max: 1,
      },
    }],
    'vue/script-indent': [
      'error',
      2,
      { baseIndent: 1 },
    ],
  },
})
