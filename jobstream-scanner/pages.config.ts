export default {
  // Build configuration
  build: {
    command: 'npm run build',
    output: 'dist',
    environment: {
      NODE_VERSION: '18'
    }
  },

  // Routes configuration
  routes: [
    {
      pattern: '/api/*',
      script: 'worker/index.ts'
    },
    {
      pattern: '/*',
      script: 'dist/_worker.js'
    }
  ],

  // Environment variables
  env: {
    JOBTECH_API_URL: 'https://jobstream.api.jobtechdev.se/stream'
  }
}; 