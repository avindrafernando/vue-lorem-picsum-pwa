module.exports = {
  configureWebpack: {
      devServer: {
          // clientLogLevel: 'info',
          // watchOptions: {
          //     poll: true
          // }
          headers: { 'Access-Control-Allow-Origin': '*' },
          disableHostCheck: true
          // proxy: 'http://localhost:8080'  // open it if you meet a problem in docker env.
          // https: false,
      }
  }
}
