import React from 'react'
import { Platform, PermissionsAndroid } from 'react-native';
import { download, saveFilePath } from './utilFs';
import { captureRef } from 'react-native-view-shot';
import CameraRoll from '@react-native-community/cameraroll';
const tipMsg = React.Component.prototype.tipMsg
module.exports.sleep = time => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};
//Is it a number
const isNumber = (val) => {
  try {
    var regPos = /^\d+(\.\d+)?$/; //Integer
    var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //Floating point
    return regPos.test(val) || regNeg.test(val)
  } catch (error) {
    return false
  }
}
//Save pictures to album
const saveImagesToAlbum = (FilePath) => {
  CameraRoll.saveToCameraRoll(FilePath)
    .then(() => {
      tipMsg("Success");
    })
    .catch(() => {
      tipMsg("failure");
    });
};
//Check before saving pictures to album
const checkImageToAlbum = async (url) => {
  if (Platform.OS === "android") {
    try {
      const permissions = [
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.CAMERA
      ];
      const granteds = await PermissionsAndroid.requestMultiple(permissions);
      if (
        granteds["android.permission.CAMERA"] === "granted" &&
        granteds["android.permission.WRITE_EXTERNAL_STORAGE"] === "granted"
      ) {
        if (typeof url === "string" && url.includes("http")) {
          const downFilePath = saveFilePath(new Date().getTime() + ".png")
          download(url, downFilePath).then(() => {
            saveImagesToAlbum("file://" + downFilePath);
          })
        } else {
          saveImagesToAlbum("file://" + url);
        }
      } else {
        tipMsg("Permission denied");
      }
    } catch (err) {
      tipMsg("failure");
    }
  } else {
    saveImagesToAlbum(url);
  }
}
const screenshots = (saveView) => {
  if (saveView) {
    captureRef(saveView, { format: "jpg" })
      .then(uri => {
        if (uri) {
          checkImageToAlbum(uri);
        }
      })
      .catch(e => {
        tipMsg("failure");
      })
  }
};

export { isNumber, screenshots, checkImageToAlbum }
