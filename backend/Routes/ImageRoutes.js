const {
    getAllImages, uploadImages,
    getImageDetailById
} = require('../Controller/ImageController');

const { uploadMultiple } = require('../Middleware/FileUploader');

const routes = require('express').Router();

routes.get('/', getAllImages);

routes.get('/:id', getImageDetailById)

routes.post('/upload-images', uploadMultiple, uploadImages);

module.exports = routes;

