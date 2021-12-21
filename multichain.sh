#!/usr/bin/env sh

set -e

# 调用接口
curl -H 'Content-Type:text/plain'  "https://vercel-serverless-geekdao.vercel.app/api/addTest"
