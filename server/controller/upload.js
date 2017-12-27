import fs from 'fs';
import request from 'request';
import config from 'config';
import compose  from 'koa-compose';
import multer from 'koa-multer';

// Save to the path: `/tmp/uploads`
const upload = multer({dest: '/tmp/uploads'});

function pushToRemote({formData, url, filePath}) {
  return new Promise((resolve, reject)=> {
    // request.post with formData, 
    // will set `Content-Type: multipart/form-data`
    request.post({
      url,
      formData
    }, function (err, httpResp, body) {
      if (err) reject(err);
      // puth to remote success, then delete local file.
      fs.unlink(filePath, () => {});
      resolve(body);
    })
  });
}
/*
 * Handle the request form:
 * Content-Type: multipart/form-data 
 * { @name: String, @file: formData}
 */
module.exports = [{
  url: '/api/file/upload',
  method: 'post',
  controller: compose([
    upload.single('file'),
    async function (ctx, next) {
    // const { name } = ctx.req.body;
    // const result =  await pushToRemote({
    //   formData: {
    //     file: fs.createReadStream(ctx.req.file.path),
    //     name
    //   },
    //   url: `http://api.example.com`,
    //   filePath: ctx.req.file.path
    // });
    // ctx.body = JSON.parse(result);
  }])
}]

