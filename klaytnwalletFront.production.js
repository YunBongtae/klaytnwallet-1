require('./config')
const path = require('path')
const express = require('express')
const uuid = require('uuid')

const logger = require('./src/utils/logger')

const port = process.env.PORT || 9000
const instanceId = process.env.NODE_APP_INSTANCE || 0;
const instanceUuid = uuid.v4();
const app = express()


// this middleware serves all js files as gzip
app.use(function (req, res, next) {
  const originalPath = req.path

  if (!originalPath.startsWith('/bundle')) {
    next()
    return
  }

  try {
    if (originalPath.endsWith('.css')) {
      res.set('Content-Type', 'text/css')
    }
    if (originalPath.endsWith('.js')) {
      res.set('Content-Type', 'text/javascript')
    }
    res.append('Content-Encoding', 'gzip')
    res.setHeader('Vary', 'Accept-Encoding')
    res.setHeader('Cache-Control', 'public, max-age=512000')
    req.url = `${req.url}.gz`
  } catch (e) {
    console.log(e)
  }

  next()
})

app.use(express.static(path.join(__dirname, '/dist')))

app.get('*', function response(req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'))
});

app.use((err, req, res, next) => {
  logger.log(err)
})

app.listen(port, '0.0.0.0', (err) => {
    if (err) {
        logger.log(err);
    }
    
    const env = process.env.NODE_ENV
    logger.info(`==> 🌎 KLAYTN WALLET FRONT ${env} running --> ID : ${instanceId} / UUID : ${instanceUuid} / BIND : ${port}.`);
});
