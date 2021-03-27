const express = require('express');
const router = express();
const filesController = require('../controllers/filesController');
const homeController = require('../controllers/homeController');

module.exports = () => {

  router.post('/upload', filesController.uploadFiles);

  router.get('/files', filesController.getFiles);

  router.get('/files/:fileName', filesController.deleteFile);

  router.get('/', homeController.home)

  return router;
}