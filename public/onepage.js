;(function (window) {

  /**
   * OnePage CDN config;
   * Can be changed by init method:
   * for example OnePage.init({PICTURE_CDN: 'cnd.onepage.com', CDN_HOST: 'cnd.onepage.com'});
   */

  let onePageConfig = {
    PICTURE_CDN: 'https://cdn.onepage.space',
    CDN_HOST: 'http://localhost:4000',
  };

  /**
   * Styles
   */

  const STYLES = `
    .one-page-plugin-image {
      width: 100%;
      height: auto;
    }
    .one-page-plugin-imgContainer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-flow: nowrap;
    }
    .one-page-plugin-folderImage {
      object-fit: cover;
      width: 100%;
    }
    .one-page-plugin-image:not(:last-child){
      margin-right: 20px;
    }
    p.one-page-plugin-folderTitle {
      font-size: small;
      text-transform: uppercase;
    }
    p.one-page-plugin-folderDescription {
      margin-top: 10px;
      margin-bottom: 5px;
    }`;

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

  const createImageElement = (URL) => {
    const imageDiv = document.createElement("div");
    imageDiv.className = 'one-page-plugin-image';

    const img = document.createElement('img');
    img.className = 'one-page-plugin-folderImage';
    img.src = URL;
    imageDiv.appendChild(img);
    return imageDiv;
  }

  /**
   * Create main sections with content. In our case with IMG only;
   */
  const getFoldersObjects = folders => {
    return folders.map(folder => {
      const folderElement = document.createElement("div");
      folderElement.className = 'one-page-plugin-folder';


      const imgContainer = document.createElement("div");
      imgContainer.className = 'one-page-plugin-imgContainer';

      folder.files.forEach(file => {
        if (file.fileType !== 'image') return;
        const imageUrl = onePageConfig.PICTURE_CDN + '/' + file.bucketRegionPrefix + '/' + file.publicURL;
        const imageDiv = createImageElement(imageUrl);
        imgContainer.appendChild(imageDiv);
      });

      folderElement.appendChild(imgContainer);

      const descriptionElement = document.createElement("p");
      descriptionElement.className = 'one-page-plugin-folderDescription';
      descriptionElement.innerText = folder.description;

      folderElement.appendChild(descriptionElement);

      const titleElement = document.createElement("p");
      titleElement.className = 'one-page-plugin-folderTitle';
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

  const appendStyles = () => {
    const styleSheet = document.createElement('style');
    styleSheet.appendChild(document.createTextNode(STYLES));
    document.head.appendChild(styleSheet);
  };

  const loadContent = (projectId, callback) => {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open('GET', encodeURI(`${onePageConfig.CDN_HOST}/${projectId}`), true);
    xmlHttp.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          // Success!
          try {
            const response = JSON.parse(this.responseText);
            callback(response);
          } catch (pErr) {
            console.error("Error parsing JSON data:", pErr);
            callback("NotSet");
          }
        } else {
          console.error("Error getting JSON data");
          callback("NotSet");
        }
      }
    };
    xmlHttp.send();
  };

  const render = (projectId, rootContainerId) => {
    const rootContainer = document.getElementById(rootContainerId.replace('#', ''));

    if (!rootContainer) {
      console.error('Cannot find root element');
      return;
    }

    loadContent(projectId, (response) => {
      if (response === 'NotSet') return;
      appendStyles();
      const elements = prepareElementsToAddToDom(response);
      elements.forEach(el => {
        rootContainer.appendChild(el);
      });
    });
  };

  /**
   * Method for updating CDN and host config variables;
   * @param configObj
   */
  const init = (configObj) => {
    onePageConfig = Object.assign({...onePageConfig, ...configObj});
  };

  if (typeof (window.OnePage) === 'undefined') {
    window.OnePage = {
      render,
      init,
    }
  }
}(window));
