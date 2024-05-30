#!/bin/sh
npm run build
git add .
git commit -m "$1"
git push origin master
npm run deploy
# ./deploy.sh ""