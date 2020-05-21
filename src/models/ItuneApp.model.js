class Model_ItuneApp {
  constructor() {
    this.name = '';
    this.image = { url: '' };
    this.summary = '';
    this.category = '';
  }

  fromJson(json) {
    if (!json && json.constructor === Object) { // only operate when json is an object
      if (json['title']
        && json['title'].constructor === Object
        && json['title']['label']) { // parse name from json
        this.name = json['title']['label'];
      }

      if (json['im:image']
        && json['im:image'].constructor === Array
        && json['im.image'].length > 0) { // parse array of images from json
        let _images = json['im:image'];
        let _image = _images[_images.length]; // Get last image from array;
        this.image = {
          url: _image.label
        }
      }

      if (json['summary']
        && json['summary'].constructor === Object
        && json['summary']['label']) {
          this.summary = json['summary']['label'];
      }

      if (json['category']
        && json['category'].constructor === Object
        && json['category']['attributes']
        && json['category']['attributes'].constructor === Object
        && json['category']['attributes']['label']) {
          this.category = json['category']['attributes']['label'];
      }
    }
    return this;
  }
}

export default Model_ItuneApp;