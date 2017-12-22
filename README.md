#Remote Linux Server Restart
Run npm install
Add ip to remote servers in the format user@ip in server.js in ips array. user must have root privileges
Add rsa file location to keyless_location that corresponds to the ip in ips
Run npm start
Navigate to localhost:8888 in browser and click the Restart button

NOTE: Requires passwordless ssh setup to remote servers to work, otherwise password must be entered in console. User must have root permissions as well

Steps to setup passwordless ssh access for root user (only need to follow part 1): https://askubuntu.com/questions/115151/how-to-set-up-passwordless-ssh-access-for-root-user

REALLY insecure but works according to specs

Tested with a VirtualBox Ubuntu 32-bit server

DISCLAIMER: Not really knowledgable on Linux so this is a very bad solution