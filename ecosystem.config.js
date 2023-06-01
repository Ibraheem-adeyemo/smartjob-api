module.exports = {
    apps: [
      {
        name: "Smartract staging",
        script: "./build/index.js",
        instances: 2,
        max_memory_restart: "300M",
  
        // Logging
        out_file: "./out.log",
        error_file: "./error.log",
        merge_logs: true,
        log_date_format: "DD-MM HH:mm:ss Z",
        log_type: "json",
  
        // Env Specific Config
        env_production: {
          NODE_ENV: "production",
          // PORT: 8080,
          exec_mode: "cluster_mode",
        },
        env_development: {
          NODE_ENV: "development",
          // PORT: 8080,
          watch: true,
          watch_delay: 3000,
          ignore_watch: [
            "./node_modules",
            "./app/views",
            "./public",
            "./.DS_Store",
            "./package.json",
            "./yarn.lock",
            "./samples",
            "./src"
          ],
        },
      },
      // {
      //   name: 'app1',
      //   script: './build/index.js',
      //   instances: 1,
      //   exec_mode: 'cluster',
      // },
      // {
      //   name: 'app2',
      //   script: './build/index.js',
      //   instances: 1,
      //   exec_mode: 'cluster',
      // },
      // {
      //   name: 'app3',
      //   script: './build/index.js',
      //   instances: 1,
      //   exec_mode: 'cluster',
      // },
      // {
      //   name: 'app4',
      //   script: './build/index.js',
      //   instances: 1,
      //   exec_mode: 'cluster',
      // },
    ],
  };
  