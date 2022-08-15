#!/usr/bin/env bash

cp package.json ./dist
cd ./dist
npm publish $*