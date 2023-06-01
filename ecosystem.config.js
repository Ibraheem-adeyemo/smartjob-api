module.exports = {
    apps: [
      {
        name: 'app1',
        script: './build/index.js',
        instances: 1,
        exec_mode: 'cluster',
      },
      {
        name: 'app2',
        script: './build/index.js',
        instances: 1,
        exec_mode: 'cluster',
      },
      {
        name: 'app3',
        script: './build/index.js',
        instances: 1,
        exec_mode: 'cluster',
      },
      {
        name: 'app4',
        script: './build/index.js',
        instances: 1,
        exec_mode: 'cluster',
      },
    ],
  };
  