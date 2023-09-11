#!/bin/bash

echo 'Copying contents of ./frontend/build to ./prod/html'
cp -a ./frontend/build/. ./prod/html
echo 'Copying ./api/LAMPAPI directory to ./prod/html'
cp -r ./api/LAMPAPI ./prod/html

echo 'Removing /html directory on droplet...'
/usr/bin/expect -c '
spawn ssh root@167.71.177.197 "rm -r /var/www/html"
expect "assword:"
send "!COP4331isthebest\r"
expect eof
'

echo 'Copying local /html directory to remote /var/www ...'
/usr/bin/expect -c '
set timeout 30
spawn scp -r ./prod/html root@167.71.177.197:/var/www
expect "assword:"
send "!COP4331isthebest\r"
expect eof
'
