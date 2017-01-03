/**
 * Created by pabloweremczuk on 1/1/17.
 */
'use strict';

var ImageLoader = {
    loadImages: function (sources, callback) {
        var images = {};
        var loadedImages = 0;
        var numImages = 0;
        for (var src in sources) {
            numImages++;
        }
        for (var src in sources) {
            images[src] = new Image();
            images[src].onload = function(){
                if (++loadedImages >= numImages) {
                    callback(images);
                }
            };
            images[src].src = sources[src];
        }
    }
};



module.exports = ImageLoader;