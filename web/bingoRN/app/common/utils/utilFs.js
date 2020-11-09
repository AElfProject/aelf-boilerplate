import RNFS from 'react-native-fs';
/**
* [saveFilePath Get file path]
* @param  {string} fileName [file name]
* @return {string}          [absolute path]
  */
function saveFilePath(fileName) {
    return RNFS.DocumentDirectoryPath + '/' + fileName
}
/**
 * [timeoutFetch]
 * @param {promise} fetchPromise executed promise
 * @param {number} timeout 
 * @return {promise}
 */
function timeoutFetch(fetchPromise, timeout = 20000) {
    //Timeout function
    const timeoutPromise = new Promise(function (resolve, reject) {
        setTimeout(() => reject(new Error('time out')), timeout)
    })
    //After timeout, a timeout promise is sent. At this time, if the request ends, the request promise is returned. If it is still requested, the timeout promise is returned.
    return Promise.race([
        fetchPromise,
        timeoutPromise
    ]);;
}
/**
 * [downloadFile]
 * @param  {string} fromUrl [File address]
 * @param  {string} toFile [Download to local path]
 * @param  {function} progressCallBack [Download progress back]
 * @param  {number} timeout 
 * @return {promise}
 */
function download(fromUrl, toFile, progressCallBack, timeout = 59000) {
    const options = {
        fromUrl,
        toFile,
        background: true,
        // begin: (res) => {
        //     console.log('contentLength:', res.contentLength / 1024 / 1024, 'M');
        // },
        progress: (res) => {
            let pro = res.bytesWritten / res.contentLength; // progress
            progressCallBack && progressCallBack(pro)
        }
    };
    const ret = RNFS.downloadFile(options);

    return timeoutFetch(ret.promise, timeout)
}

export { saveFilePath, download }