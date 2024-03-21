import { Property, Job } from '../database/model.js';
import multer from 'multer';
import sharp from 'sharp';
import helpers from './helpers.js';

const { bufferToImage } = helpers;

export default {
  myProperties: async (req, res) => {
    console.log('=== my properties route ===');
    const userId = req.session.user_id;

    let myProperties;
    try {
      // find all the users properties
      myProperties = await Property.findAll({
        where: { user_id: userId },
        order: [['created_at', 'ASC']],
      });

      // turn all the picture buffers into dataURIs
      await Promise.all(
        myProperties.map(async (property) => {
          property.picture = bufferToImage(property.picture, '../../../public/property_placeholder.jpg');
        })
      );

      // console.log(myProperties);

      // send the properties as the response
      res.status(200).send({
        success: true,
        message: 'properties retrieved successfully',
        properties: myProperties,
      });
    } catch (err) {
      console.log(err);
    }
  },
  getPropertyBySubscription: async (req, res) => {
    console.log('== Get Property By Subscription Route ==');
    console.log(req.params.job_id);
    try {
      const job = await Job.findByPk(req.params.job_id);
      const property = await job.getProperty();
      res.status(200).send({
        success: true,
        message: 'property successfully retrieved',
        property: property,
      });
    } catch (err) {
      console.log(err);
    }
  },
  createProperty: async (req, res) => {
    console.log('== create property route ==');
    const { name, street, city, state, zipcode, coordinates } = req.body;

    // turn the coordinates from a string into an array
    const coordinatesArray = coordinates.split(',');

    // obtain the file buffer and set the imagebuffer
    let imageBuffer = null;
    if (req.file) {
      imageBuffer = req.file.buffer;
    }

    try {
      // create the new property
      await Property.create({
        name: name,
        picture: imageBuffer,
        street: street,
        city: city,
        state: state,
        zipcode: zipcode,
        coordinates: coordinatesArray,
        user_id: req.session.user_id,
      });
    } catch (err) {
      console.log(err);
    }

    // send the success response
    res.status(200).send({
      toast: {
        color: 'green',
        message: 'Your property has been created!',
      },
    });
  },
  editProperty: async (req, res) => {
    console.log('== edit Property Route ==');
    console.log(req.body);
    const editProperty = req.body;

    // turn the coordinates from a string into an array
    editProperty.coordinates = editProperty.coordinates.split(',');

    // obtain the file buffer and set the imagebuffer
    editProperty.picture = null;
    if (req.file) {
      // imageBuffer = req.file.buffer;
      editProperty.picture = req.file.buffer;
    }

    try {
      await Property.update(
        { ...editProperty },
        {
          where: {
            property_id: editProperty.property_id,
          },
        }
      );
      res.status(200).send({
        property: editProperty,
        toast: {
          color: 'green',
          message: 'Your property has been updated!',
        },
      });
    } catch (err) {
      console.log(err);
    }
  },
  deleteProperty: async (req, res) => {
    console.log('== edit Property Route ==');
    console.log(req.params);
    const { property_id } = req.params;

    try {
      // delete jobs associated with this property
      await Job.destroy({
        where: {
          property_id: property_id,
        },
      });

      // delete the property
      await Property.destroy({
        where: {
          property_id: property_id,
        },
      });

      res.status(200).send({
        success: true,
        message: 'Property was successfully deleted',
        toast: {
          color: 'green',
          message: 'Your property has been deleted!',
        },
      });
    } catch (err) {
      console.log(err);
    }
  },
};
