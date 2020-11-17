(function (window) {

  /**
   * TODO LIST:
   * 1. Add correct error handling if project not exist or else;
   * @type {string}
   */
  const PICTURE_CDN = 'https://cdn.onepage.space';
  const CDN_HOST = 'http://localhost:4000';


  //const ONEPAGE_PROJECT_ID = 'Ldsk8QIQ8nTx.json';

  const ONEPAGE_PROJECT_ID = window.ONEPAGE_ID;
  console.log(ONEPAGE_PROJECT_ID);
  //const ONEPAGE_PROJECT_ID = 'AUiglKGZgmiG.json';

  const prepareElementsToAddDom = (data) => {
    if (data.foldersAndFiles) {
      const foldersAndFiles = data.foldersAndFiles;
      const resultFolders = foldersAndFiles.folders.map(folder => {

        const folderElement = document.createElement("div");

        folder.files.forEach(file => {
          const img = document.createElement('img');
          img.src = PICTURE_CDN + '/' + file.bucketRegionPrefix + '/' + file.url;
          console.log(img.src);
          folderElement.appendChild(img);
        });



        return folderElement;

        // return folder.files(file => {
        //   const img = folderElement.createElement('img');
        //   img.src = PICTURE_CDN + '/' + file.bucketRegionPrefix + '/' + file.url;
        // })
      })

      return resultFolders;
    }
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
      const elements = prepareElementsToAddDom(response);
      elements.forEach(el => {
        div.appendChild(el);
      });
    }).catch(error => {
    console.error(error);
  });
}(window));
