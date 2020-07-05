let axios = require('axios')
var ROOT_URL = 'https://www.googleapis.com/youtube/v3/videos';

module.exports = function () {
  //console.log('getting start')
  var params = {
    chart:'mostPopular',
    part: 'snippet,statistics',
    maxResults: 40,
    key: 'AIzaSyDrtW5dLU5FZwf-DV4ixXrIfeWDhZ1iB4c'
  };
  return axios.get(ROOT_URL, { params: params })
    .then(function(response) {
      console.log('return')
    return response.data.items;
    })
    .catch(function(error) {
      console.error(error);
    });
    //console.log(result+' result in end')
}
