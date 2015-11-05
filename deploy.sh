#!/bin/bash

REMOTE=root@188.166.231.38
APP=currency-api
ARCHIVE=$APP.tar.gz
DIRECTORY="$PWD"

tar -zcf $ARCHIVE -C $DIRECTORY .
ssh $REMOTE "mkdir -p /home/builds"
scp $ARCHIVE $REMOTE:/home/builds/
ssh $REMOTE "mkdir -p /home/apps/$APP"
ssh $REMOTE "tar -zxf /home/builds/$ARCHIVE -C /home/apps/$APP"
ssh $REMOTE ". /root/.nvm/nvm.sh; pm2 reload /home/apps/$APP"
