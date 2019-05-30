import Delimiter from '@editorjs/delimiter';
import Embed from '@editorjs/embed';
import Header from '@editorjs/header';
import Image from '@editorjs/image';
import List from '@editorjs/list';
import Paragraph from '@editorjs/paragraph';
import Quote from '@editorjs/quote';
import Table from '@editorjs/table';
import uploadFile from '../../helpers/imageUpload';
import { getUser } from '../../helpers/token';

export default {
  header: Header,
  delimiter: Delimiter,
  list: List,
  image: {
    class: Image,
    config: {
      // https://github.com/editor-js/image
      uploader: {
        uploadByFile(file) {
          return uploadFile(file, getUser()).then(res => {
            return res;
          });
        },
        uploadByUrl(file) {
          return new Promise(resolve => {
            resolve({
              success: 1,
              file: {
                url: file,
              },
            });
          });
        },
      },
    },
  },
  embed: {
    class: Embed,
    config: {
      // todo: enable all services supported by other steem dApps.
      // Implement dtube with regex!
      // https://github.com/editor-js/embed
      services: {
        youtube: true,
        vimeo: true,
        twitchVideo: true,
        // TODO: make gmaps work
        // gmaps: {
        //   // Google maps
        //   regex: /<iframe src="https:\/\/www\.google\.com\/maps\/embed\?pb=(.*)" width="600" height="450" frameborder="0" style="border:0" allowfullscreen><\/iframe>/,
        //   embedUrl: "https://www.google.com/maps/embed?pb=<%= remote_id %>",
        //   html:
        //     "<iframe height='450' scrolling='no' frameborder='0' allowtransparency='true' allowfullscreen style='width: 100%;'></iframe>"
        // },
        dtubeID: {
          // Dtube from url
          // regex: https://github.com/steemit/condenser/blob/fd58e1d526925e048e44ea19d6d91e11a157235e/src/app/utils/Links.js
          // eslint-disable-next-line no-useless-escape
          regex: /(?:d\.tube\/#!\/(?:v\/)?([a-zA-Z0-9\-\.\/]*))+/,
          embedUrl: 'https://emb.d.tube/#!/<%= remote_id %>',
          html:
            "<iframe height='300' scrolling='no' frameborder='0' allowtransparency='true' allowfullscreen style='width: 100%;'></iframe>",
        },
        dtube: {
          // Dtube embed snippet
          // regex: https://github.com/steemit/condenser/blob/fd58e1d526925e048e44ea19d6d91e11a157235e/src/app/utils/Links.js
          // eslint-disable-next-line no-useless-escape
          regex: /https:\/\/(?:emb\.)?(?:d.tube\/\#\!\/(?:v\/)?)([a-zA-Z0-9\-\.\/]*)/,
          embedUrl: 'https://emb.d.tube/#!/<%= remote_id %>',
          html:
            "<iframe height='300' scrolling='no' frameborder='0' allowtransparency='true' allowfullscreen style='width: 100%;'></iframe>",
        },
      },
    },
  },
  quote: Quote,
  //   link: Link,
  table: {
    class: Table,
    inlineToolbar: true,
  },
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
  },
};
