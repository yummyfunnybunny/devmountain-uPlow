export default {
  bufferToImage: (buffer, placeholder) => {
    // console.log('=== buffer to image ===');

    // Check if buffer is null, and set the image src accordingly
    if (buffer) {
      // get the image type of the buffer
      let imageType;
      if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
        imageType = 'jpeg';
      }
      if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47) {
        imageType = 'png';
      }

      // convert the image to base64
      const base64Picture = Buffer.from(buffer).toString('base64');

      // create the dataUri of the image
      const dataUri = `data:image/${imageType};base64,${base64Picture}`;

      // return the dataUri
      return dataUri;
    } else {
      return placeholder;
    }
  },
};

// TODO - add the folowing helper scripts
// -- backend --
// hashPasswords
// comparePasswords
// -- frontend --
// getWeather
//
