const { description } = require('../../package')

// https://v1.vuepress.vuejs.org/config
module.exports = {
  title: 'babel-udf-heleprs',
  description: description,
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: 'yukihirop/babel-udf-helpers',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: true,
    prevLinks: true,
    nextLinks: true,
    nav: [
      {
        text: 'Home',
        link: '/',
      },
    ],
    sidebar: [
      ['/', 'Home', { collapsable: false }],
      ['/motivation/', 'Motivation', { collapsable: false }],
      ['/usage/', 'Usage', { collapsable: false }],
      ['/define-udf-helpers/', 'Define UDF Helpers', { collapsable: false }],
      ['/error-handling/', 'Error Handling', { collapsable: false }],
    ],
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ],

  base: '/babel-udf-helpers/'
}
