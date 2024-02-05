import { Property, Job } from '../database/model.js';

export default {
  myProperties: async (req, res) => {
    // console.log('my properties route');
    const userId = req.session.user_id;

    let myProperties;
    try {
      myProperties = await Property.findAll({
        where: { user_id: userId },
      });
      // console.log(myProperties);
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
    // console.log('== create property route ==');
    console.log(req.body);
    const { name, street, city, state, zipcode, coordinates } = req.body;

    try {
      await Property.create({
        name: name,
        picture: 'img1',
        street: street,
        city: city,
        state: state,
        zipcode: zipcode,
        coordinates: coordinates,
        user_id: req.session.user_id,
      });
    } catch (err) {
      console.log(err);
    }

    res.status(200).send({
      success: true,
      message: 'Property was created successfully',
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
        success: true,
        message: 'property updated successfully',
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
