#!/bin/sh
npm run generate
git add .
git commit -m "feat"
git push origin master
npm run deploy
# ./deploy.sh 