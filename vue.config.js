module.exports = {
    devServer: {
      proxy: {
        '/api': {
          target: 'http://localhost:8080', // Spring Boot 서버의 주소
          changeOrigin: true,
          pathRewrite: { '^/api': '/api' }, // /api로 시작하는 요청을 /api로 변경
        },
      },
    },
  };