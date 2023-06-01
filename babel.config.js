module.exports = {
  compact: true,
  comments: false,
  presets: [
    [
      '@babel/env', {
        targets: {
          node: 'current',
          browsers: [
            'last 2 versions'
          ]
        },
        useBuiltIns: 'usage',
        corejs: 3
      }
    ],
    '@babel/react'
  ],
  plugins: [
    [
      '@babel/proposal-class-properties',
      {
        loose: false
      }
    ],
    [
      'module-resolver', {
        alias: {
          pentonville: './src',
          stories: './stories'
        }
      }
    ]
  ]
}
