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
   * Styles
   */

  const STYLES = `
    .image {
      width: 100%;
      height: auto;
    }
    .imgContainer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-flow: nowrap;
    }
    .folderImage {
      object-fit: cover;
      width: 100%;
    }
    .image:not(:last-child){
      margin-right: 20px;
    }
    `;

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

  /**
   * Create main sections with content. In our case with IMG only;
   */
  const getFoldersObjects = folders => {
    return folders.map(folder => {
      console.log('folder', folder);
      const folderElement = document.createElement("div");
      folderElement.className = 'folder';


      const imgContainer = document.createElement("div");
      imgContainer.className = 'imgContainer';

      folder.files.forEach(file => {
        const imageUrl = PICTURE_CDN + '/' + file.bucketRegionPrefix + '/' + file.publicURL;
        const image = document.createElement("div");
        image.className = 'image';
        //fileType
        const img = document.createElement('img');
        img.className = 'folderImage';
        img.src = imageUrl
        image.appendChild(img);
        imgContainer.appendChild(image);
      });


      folderElement.appendChild(imgContainer);
      const descriptionElement = document.createElement("p");
      descriptionElement.className = 'folderDescription';
      descriptionElement.innerText = folder.description;

      folderElement.appendChild(descriptionElement);

      const titleElement = document.createElement("p");
      titleElement.className = 'folderTitle';
      titleElement.innerText = folder.title;

      folderElement.appendChild(titleElement);

      return folderElement;
    });
  };

  const prepareElementsToAddToDom = (data) => {
    if (!data && !data.foldersAndFiles &&
      !data.foldersAndFiles.folders &&
      !data.files.length) return [];

    const preparedData = prepareJSON(data);
    return getFoldersObjects(preparedData.foldersAndFiles.folders);
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
      const rootContainer = document.getElementById(ONEPAGE_CONTAINER.replace('#', ''));
      const styleSheet = document.createElement('style');
      styleSheet.appendChild(document.createTextNode(STYLES));
      document.head.appendChild(styleSheet);
      const elements = prepareElementsToAddToDom(response);
      elements.forEach(el => {
        rootContainer.appendChild(el);
      });
    }).catch(error => {
    console.error(error);
  });
}(window));
