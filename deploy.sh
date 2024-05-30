#!/bin/sh
npm run generate
git add .
git commit -m "$1"
git push origin master
npm run deploy
# ./deploy.sh ""