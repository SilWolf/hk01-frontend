class Model_ItuneApp {
  constructor() {
    this.id = null;
    this.bundleId = null;
    this.name = null;
    this.image = { url: null };
    this.description = null;
    this.category = null;
    this.sellerName = null;
    this.sellerUrl = null
    this.screenshots = [];
    this.rating = 0.0;
    this.ratingCount = 0;
  }

  fromJson(json) {
    if (json && json.constructor === Object) { // only operate when json is an object
      
      // Check the json format and decide which method to use

      if (json['im:name']) { // Format A: RSS

        if (json['id']
          && json['id'].constructor === Object
          && json['id']['attributes']
          && json['id']['attributes'].constructor === Object
          && json['id']['attributes']['im:id']) {
            this.id = json['id']['attributes']['im:id'];
        }

        if (json['id']
          && json['id'].constructor === Object
          && json['id']['attributes']
          && json['id']['attributes'].constructor === Object
          && json['id']['attributes']['im:bundleId']) {
            this.bundleId = json['id']['attributes']['im:bundleId'];
        }

        if (json['title']
          && json['title'].constructor === Object
          && json['title']['label']) { // parse name from json
          this.name = json['title']['label'];
        }

        if (json['im:image']
          && json['im:image'].constructor === Array
          && json['im:image'].length > 0) { // parse array of images from json
          let _images = json['im:image'];
          let _image = _images[_images.length - 1]; // Get last image from array;
          this.image = {
            url: _image.label
          }
        }

        if (json['summary']
          && json['summary'].constructor === Object
          && json['summary']['label']) {
            this.description = json['summary']['label'];
        }

        if (json['category']
          && json['category'].constructor === Object
          && json['category']['attributes']
          && json['category']['attributes'].constructor === Object
          && json['category']['attributes']['label']) {
            this.category = json['category']['attributes']['label'];
        }

      } else if (json['trackName']) { // Format B: Lookup
        if (json['trackId']) { // parse name from json
          this.id = json['trackId'].toString();
        }

        if (json['trackName']) { // parse name from json
          this.name = json['trackName'];
        }
        
        if (json['bundleId']) { // parse name from json
          this.bundleId = json['bundleId'];
        }
        
        if (json['description']) { // parse name from json
          this.description = json['description'];
        }
        
        if (json['genres']) { // parse name from json
          this.category = json['genres'].join(' ');
        }

        if (json['artworkUrl512']) {
          this.image.url = json['artworkUrl512'];
        }

        if (json['screenshotUrls']) {
          this.screenshots = json['screenshotUrls'].map((url) => {
            return { url: url };
          });
        }
        if (json['sellerName']) {
          this.sellerName = json['sellerName'];
        }

        if (json['sellerUrl']) {
          this.sellerUrl = json['sellerUrl'];
        }

        if (json['averageUserRatingForCurrentVersion']) {
          this.rating = Math.round((json['averageUserRatingForCurrentVersion'] + Number.EPSILON) * 100) / 100;
        }

        if (json['userRatingCount']) {
          this.ratingCount = json['userRatingCount'];
        }
      }
    }
    return this;
  }
}

export default Model_ItuneApp;