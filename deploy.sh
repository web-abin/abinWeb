#!/bin/sh
npm run generate
git add .
git commit -m "feat"
git push
npm run deploy
# ./deploy.sh 