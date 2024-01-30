function forwardGeocode(address) {
  const mapboxToken =
    'pk.eyJ1IjoieXVtbXlmdW5ueWJ1bm55IiwiYSI6ImNrODZwNzQydDA1bjEzZW15NTRqa2NpdnEifQ.6y8NFU2qjw6mTgINZYaRyg';

  const encodedAddress = encodeURI(`${newPropertyStreet} ${newPropertyCity} ${newPropertyState} ${newPropertyZipcode}`);
  console.log(encodedAddress);

  const mapBoxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?proximity=ip&access_token=${mapboxToken}`;

  axios.get(mapBoxUrl).then((res) => {
    console.log('== 1st then ==');
    console.log(res.data);
    const coordinates = res.data.features[0].center;
    // console.log(coordinates);
    createProperty.coordinates = coordinates;
    console.log(createProperty);
    return axios.post('/properties', createProperty);
  });
}
