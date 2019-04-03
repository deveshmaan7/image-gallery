import React, {Component, Fragment} from 'react';
import Webcam from "react-webcam";
import {post} from "axios";
import {Button} from 'react-bootstrap';


class WebcamCapture extends React.Component {

    setRef = webcam => {
        this.webcam = webcam;
    };

    capture = () => {
        const imageFile = this.webcam.getScreenshot();
        const url = "http://127.0.0.1:5000/image";
        const formData = {file: imageFile}
        return post(url, formData)
            .then(response => {
                console.warn("result", response)
            })

    };

    render() {
        const videoConstraints = {
            width: 1280,
            height: 720,
            facingMode: "user"
        };

        return (
            <div>
                <Webcam
                    audio={false}
                    height={350}
                    ref={this.setRef}
                    screenshotFormat="image/jpeg"
                    width={350}
                    videoConstraints={videoConstraints}
                />
                <Button onClick={this.capture}>Capture photo</Button>
            </div>
        );
    }
}

export default WebcamCapture;