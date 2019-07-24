module.exports = {
  compact: true,
  comments: false,
  presets: [
    [
      '@babel/env', {
        useBuiltIns: 'entry',
        targets: {
          node: 'current',
          browsers: [
            'last 2 versions'
          ]
        },
        corejs: '3.1.2'
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
          pentonville: './src'
        }
      }
    ]
  ]
}
