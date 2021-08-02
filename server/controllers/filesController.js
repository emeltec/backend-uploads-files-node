const multer = require('multer');
const fs = require('fs');
const shortid = require('shortid');

const DIR_FILES = __dirname+'.../../uploads/';

const configuracionMulter = {
  storage: fileStorage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, __dirname + '../../uploads')
    },
    filename: (req, file, callback) => {
      //callback(null, file.originalname);
      const extension = file.mimetype.split('/')[1];
      callback(null, `${shortid.generate()}.${extension}`);
    }
  })
}

// pasar la configuracion y el campo
const upload = multer(configuracionMulter).single('file');

exports.uploadFiles = (req, res, next) => {
  upload(req, res, function (error) {
    if (error) {
      res.json({
        mensaje: error
      })
    }
    res.json({
      mensaje: 'Archivo cargado exitosamente'
    })
  })
}

exports.getFiles = (req, res) => {
  fs.readdir(__dirname+'../../uploads', (err, files) => {
    if(err) {
      res.json({
        mensaje: 'Error al leer archivos'
      })
      return;
    }
    res.json({
      mensaje: 'Archivos leidos correctamente',
      files
    })
  })
}

exports.deleteFile = (req, res) => {
  const fileName = req.params.fileName;
  try {
    fs.unlinkSync(__dirname+'../../uploads/'+fileName)
    res.json({mensaje: 'Archivo eliminado'})
    return;
  } catch (error) {
    res.json({mensaje: 'Error al eliminar el archivo'})
  }
}

exports.renameFileGet = (req, res) => {
  const {fileName, newName} = req.params;
  console.log(fileName, newName);

  try {
    fs.renameSync(DIR_FILES+fileName, DIR_FILES+newName);
      res.json({mensaje: 'El archivo fue renombrado'});
      return;
  } catch (error) {
    res.json({mensaje: 'Error al renombrar el archivo'})
  }
}

exports.renameFilePut = (req, res) => {
  const {fileName, newName,} = req.body;
  console.log(newName, fileName);

  try {
    fs.renameSync(DIR_FILES+fileName, DIR_FILES+newName);
      res.json({mensaje: 'El archivo fue renombrado'});
      return;
  } catch (error) {
    res.json({mensaje: 'Error al renombrar el archivo'})
  }
}