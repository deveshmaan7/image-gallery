import React, {Component, Fragment} from 'react';
import {Button} from 'react-bootstrap';
import axios, {post} from 'axios';
import Images from './Images';

class ImageUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: '',
            fileTypes: '.jpg, .jpeg, .png',// list of file type supported
            images: []
        }
        this.handleSelectedFile = this.handleSelectedFile.bind(this);
        this.getAllImages = this.getAllImages.bind(this);
    }

    componentDidMount() {
        this.getAllImages()
    }

    getAllImages() {
        const url = "http://127.0.0.1:5000/allImages";
        axios.get(url)
            .then(res => {
                console.log("rsponse" + JSON.stringify(res))
                const imageBase64 = res.data.data.map((data) => {
                        return new Buffer(data.data, 'binary').toString('base64')
                    }
                )
                this.setState({
                    images: imageBase64
                })
            })
    }

    handleSelectedFile(event) {
        const maxSize = 100000; // max limit 100kb
        const file = event.target.files[0];
        if (Number(file.size) > maxSize) {
            alert('Max File allowed is 100kb');
            return;
        }
        let reader = new FileReader()
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            console.warn("img data ", e.target.result)
            const url = "http://127.0.0.1:5000/image";
            const formData = {file: e.target.result}
            return post(url, formData)
                .then(res => {
                    console.log(JSON.stringify(res))
                    this.getAllImages()
                })
        }
    }

    render() {
        return (
            <Fragment>
                <input type="file" name="" accept={this.state.fileTypes}
                       onChange={this.handleSelectedFile}/>
                <Images image={this.state.images}/>
            </Fragment>
        );
    }
}

export default ImageUpload;
