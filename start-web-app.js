const { spawn } = require('child_process');

const exec = (commands) => {
    spawn(commands, { stdio: 'inherit', shell: true });
};

exec('yarn start:web-app');
