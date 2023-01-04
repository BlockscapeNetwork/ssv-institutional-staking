module.exports = {
  apps : [{
    instances : "max",
    exec_mode : "cluster",
    name: "app",
    script: "./dist/index.js",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}
