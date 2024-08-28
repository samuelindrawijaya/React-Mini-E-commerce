declare module 'react-image-gallery' {
    import * as React from 'react';
  
    interface Image {
      original: string;
      thumbnail?: string;
      description?: string;
      [key: string]: any;
    }
  
    interface ImageGalleryProps {
      items: Image[];
      showThumbnails?: boolean;
      showFullscreenButton?: boolean;
      showPlayButton?: boolean;
      showBullets?: boolean;
      autoPlay?: boolean;
      infinite?: boolean;
      [key: string]: any;
    }
  
    class ImageGallery extends React.Component<ImageGalleryProps> {}
  
    export default ImageGallery;
  }