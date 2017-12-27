# Remote Linux Server Restart
For v1:
1. Run npm install
2. Add ip to remote servers in the format user@ip in server.js in ips array. user must have root privileges
3. Add rsa file location to keyless_location that corresponds to the ip in ips
4. Run npm start
5. Navigate to localhost:8888 in browser and click the Restart button

NOTE: Requires passwordless ssh setup to remote servers to work, otherwise password must be entered in console. User must have root permissions as well

Steps to setup passwordless ssh access for root user on ubuntu (only need to follow part 1): https://askubuntu.com/questions/115151/how-to-set-up-passwordless-ssh-access-for-root-user

Steps for Linux: https://stackoverflow.com/questions/15351491/passwordless-ssh-to-remote-system-as-root

Tested with a VirtualBox Ubuntu 32-bit server

For v2:

On the server that wants to be able to be shutdown/restarted:
1. Enable passwordless sudo shutdown and sudo reboot
2. Run npm install in v2/back
3. Run npm start in v2/back

On the local machine:
1. Run npm install in v2/front
2. Run npm start in v2/front
