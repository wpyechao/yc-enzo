import { defineConfig } from 'dumi'

export default defineConfig({
  dynamicImport: {},
  title: 'yc-enzo',
  resolve: {
    includes: [
      'src'
    ]
  },
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
      'antd',
    ]
  ]
})