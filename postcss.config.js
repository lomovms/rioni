const fs = require('fs');

module.exports = {
  syntax: 'postcss-scss',
  parser: 'postcss-scss',
  plugins: [
    require('postcss-easy-import')({
      extensions: '.scss',
    }),
    require('autoprefixer'),
    // require('postcss-nested'),
    require('postcss-rgb'),
    require('postcss-inline-svg')({
      removeFill: true,
      path: './app/assets/images/svg'
    }),
    // require('postcss-arithmetic'),
    require('css-mqpacker'),
    require('cssnano')({
      preset: [
        'default', {
          discardComments: {
            removeAll: true
          }
        }
      ]
    }),
  ]
};
