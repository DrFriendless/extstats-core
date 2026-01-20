cp package.json ./dist/lib
cd dist/lib
npm pack
cp *.tgz ~/projects/repo
mv *.tgz ../..
