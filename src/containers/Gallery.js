import React, {Component, Fragment} from 'react';
import ImageUpload from '../components/ImageUpload';
import WebcamCapture from '../components/Webcam';

class Gallery extends Component {
    render() {
        return (
            <Fragment>
                <WebcamCapture/>
                <ImageUpload/>
            </Fragment>
        );
    }
}

export default Gallery;
