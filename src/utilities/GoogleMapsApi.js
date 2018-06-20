var googleMapsClient = require('@google/maps').createClient({
  key: 'your API key here'
});

export default class GoogleMapsService {
  getDirections = (origin, destination, callBackShit) => {
    googleMapsClient.directions({
        origin: '4199 timber ln, des moines, ia 50317',
        destination: '1420 locust, des moines, ia 50309',
        mode: 'driving'
      }, function (err, response) {
        if (!err) {
          callBackShit(response.json.results);
          console.log(response.json.results);
        }
      }
    )
  }
}