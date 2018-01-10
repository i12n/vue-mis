#!/usr/bin/env bash

NODE_ENV=development npm  --registry https://registry.npm.taobao.org install
NODE_ENV=production npm run build