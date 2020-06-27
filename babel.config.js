module.exports = {
  compact: true,
  comments: false,
  presets: [
    [
      '@babel/env', {
        useBuiltIns: 'usage',
        targets: {
          node: '12.18.1',
          browsers: [
            'last 2 versions'
          ]
        },
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
        root: ['./src'],
        cwd: 'babelrc',
        alias: {
          pentonville: './src',
          stories: './stories'
        }
      }
    ]
  ]
}
