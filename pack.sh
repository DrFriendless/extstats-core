./build.sh
cp package.json ./dist
cd dist
npm pack
mv *.tgz ..