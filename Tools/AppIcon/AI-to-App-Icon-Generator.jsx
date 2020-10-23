// Download http://cdnjs.cloudflare.com/ajax/libs/json3/3.3.2/json3.js
// and save as json3.js in the same directory as this script
//
// Move the new images and Contents.json into
// Assets.xcassets/AppIcon.appiconset/

#include "json3.js"

var manifest = [
  {
    size: 20,
    scale: 2,
    idiom: "iphone"
  },
  {
    size: 20,
    scale: 3,
    idiom: "iphone"
  },
  {
    size: 29,
    scale: 2,
    idiom: "iphone"
  },
  {
    size: 29,
    scale: 3,
    idiom: "iphone"
  },
  {
    size: 40,
    scale: 2,
    idiom: "iphone"
  },
  {
    size: 40,
    scale: 3,
    idiom: "iphone"
  },
  {
    size: 60,
    scale: 2,
    idiom: "iphone"
  },
  {
    size: 60,
    scale: 3,
    idiom: "iphone"
  },
  {
    size: 20,
    scale: 1,
    idiom: "ipad"
  },
  {
    size: 20,
    scale: 2,
    idiom: "ipad"
  },
  {
    size: 29,
    scale: 1,
    idiom: "ipad"
  },
  {
    size: 29,
    scale: 2,
    idiom: "ipad"
  },
  {
    size: 40,
    scale: 1,
    idiom: "ipad"
  },
  {
    size: 40,
    scale: 2,
    idiom: "ipad"
  },
  {
    size: 76,
    scale: 1,
    idiom: "ipad"
  },
  {
    size: 76,
    scale: 2,
    idiom: "ipad"
  },
  {
    size: 83.5,
    scale: 2,
    idiom: "ipad"
  },
  {
    size: 1024,
    scale: 1,
    idiom: "ios-marketing"
  },
];

var manifest_android = [
  {
    size: 48,
    scale: 1,
    idiom: "m"
  },
  {
    size: 72,
    scale: 1,
    idiom: "h"
  },
  {
    size: 96,
    scale: 1,
    idiom: "xh"
  },
  {
    size: 144,
    scale: 1,
    idiom: "xxh"
  },
  {
    size: 192,
    scale: 1,
    idiom: "xxxh"
  },
];

createDirectory();

exportIcons();

writeContentsJSON();

alert("Your icons and Content.json has been saved to " + appIconDirectory());

function exportIcons() {
  for (var i = manifest.length - 1; i >= 0; i--) {
    exportFileToPNG24(manifest[i].size, manifest[i].scale, manifest[i].idiom, "ios")
  }

  for (var i = manifest_android.length - 1; i >= 0; i--) {
    exportFileToPNG24(manifest_android[i].size, manifest_android[i].scale, manifest_android[i].idiom, "android")
  }
}

function exportFileToPNG24(iconSize, scale, idiom, os) {

  var activeArtboard = app.activeDocument.artboards[app.activeDocument.artboards.getActiveArtboardIndex()];

  var width = activeArtboard.artboardRect[2] - activeArtboard.artboardRect[0];

  var computedScale = iconSize / width * 100 * scale;

  var exportOptions = new ExportOptionsPNG24();
  exportOptions.verticalScale = computedScale;
  exportOptions.horizontalScale = computedScale;

  var file = "1.png";

  if(os === "android"){
    var directoryPath = new Folder(app.activeDocument.path + "/drawable-" + idiom + "dpi");

    var newFolder = new Folder(directoryPath);

    newFolder.create();

    file = new File(directoryPath + "/icon.png");
  }
  else if(os === "ios"){
    file = new File(appIconDirectory() + "/AppIcon-" + iconSize + "@" + scale + "x.png");

    if (scale == 1){
      file = new File(appIconDirectory() + "/AppIcon-" + iconSize + ".png");
    }
  }

  app.activeDocument.exportFile(file, ExportType.PNG24, exportOptions);
}

function writeContentsJSON() {
  var object = {
    images: [],
    info: {
      version: 1,
      author: "xcode"
    }
  }

  for (var i = manifest.length - 1; i >= 0; i--) {
    var file = "AppIcon-" + manifest[i].size + "@" + manifest[i].scale + "x.png";

    if (manifest[i].scale == 1){
      file = "AppIcon-" + manifest[i].size + ".png";
    }

    object.images.push({
      "idiom" : manifest[i].idiom,
      "size" : manifest[i].size + "x" + manifest[i].size,
      "scale" : manifest[i].scale + "x",
      "filename" : file
    });
  }

  var file = new File(appIconDirectory() + "/Contents.json")

  file.open("e");

  file.write(JSON.stringify(object, null, 2));

  file.close();
}

function createDirectory() {
  var newFolder = new Folder(appIconDirectory())

  newFolder.create()
}

function appIconDirectory() {
  return app.activeDocument.path + '/' + "AppIcon.appiconset"
}

function iconDirectory() {
  return app.activeDocument.path + '/' + app.activeDocument.name.replace(/\..*$/, '')
}
