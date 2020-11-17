(function (window) {

  /**
   * TODO LIST:
   * 1. Add correct error handling if project not exist or else;
   * @type {string}
   */

  /**
   * OnePage CDN settings;
   */
  const PICTURE_CDN = 'https://cdn.onepage.space';
  const CDN_HOST = 'http://localhost:4000';

  /**
   * OnePage render settings;
   */
  const ONEPAGE_CONTAINER = window.ONEPAGE_CONTAINER;
  const ONEPAGE_PROJECT_ID = window.ONEPAGE_ID;


  /**
   *  Helper function for preparing JSON before render parse;
   *  In this case we just add publicURL from files array to folder.files field;
   */
  const prepareJSON = data => {
    const imageObject = {};

    data.files.forEach(file => {
      imageObject[file.gid] = file;
    });

    data.foldersAndFiles.folders.forEach(folder => {
      folder.files.forEach(file => {
        file.publicURL = imageObject[file.gid].children[0].url;
      })
    });

    return data;
  };

  const prepareElementsToAddToDom = (data) => {
    if (!data && !data.foldersAndFiles && !data.files.length) return [];

    const preparedData = prepareJSON(data);

    return preparedData.foldersAndFiles.folders.map(folder => {
      const folderElement = document.createElement("div");
      folder.files.forEach(file => {
        const img = document.createElement('img');
        img.src = PICTURE_CDN + '/' + file.bucketRegionPrefix + '/' + file.publicURL;
        folderElement.appendChild(img);
      });
      return folderElement;
    });

  };

  const request = new Request(`${CDN_HOST}/${ONEPAGE_PROJECT_ID}`);

  fetch(request)
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error('API ERROR');
      }
    })
    .then(response => {
      const div = document.getElementById(ONEPAGE_CONTAINER.replace('#', ''));
      const elements = prepareElementsToAddToDom(response);
      elements.forEach(el => {
        div.appendChild(el);
      });
    }).catch(error => {
    console.error(error);
  });
}(window));
