const electron = require('electron')
const ipc = electron.ipcRenderer

window.onload = function() {
    
    let username = document.getElementById('username');
    let password = document.getElementById('password');

    document.getElementById('authenticate').addEventListener('click', () => {
        if(username.value === 'admin' && password.value === 'admin'){
            // successful login
            ipc.send('login-success-dialog');
        } else {
            // failed login
            ipc.send('login-error-dialog');
            username.value = ''
            password.value = ''
        }
    })
}