import React from 'react';
import '../assets/css/Images.css';

const Images = (props) => {
    return (
        <div className="tiles">
            {
                props.image.map((data) => {
                    return (
                        <Tile data={data} key={data.id}/>
                    )
                })
            }
        </div>
    );
}

class Tile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            mouseOver: false
        };
        // Bind properties to class instance
        this._clickHandler = this._clickHandler.bind(this);
        this._mouseEnter = this._mouseEnter.bind(this);
        this._mouseLeave = this._mouseLeave.bind(this);
    }

    // Event handlers to modify state values
    _mouseEnter(e) {
        e.preventDefault();
        if (this.state.mouseOver === false) {
            console.log(this.props.data.name);
            this.setState({
                mouseOver: true
            })
        }
    }

    _mouseLeave(e) {
        e.preventDefault();
        if (this.state.mouseOver === true) {
            this.setState({
                mouseOver: false
            })
        }
    }

    _clickHandler(e) {
        e.preventDefault();
        if (this.state.open === false) {
            this.setState({
                open: true
            });
        } else {
            this.setState({
                open: false
            });
        }
    }

    render() {
        // Modify styles based on state values
        let tileStyle = {};

        // When tile clicked
        if (this.state.open) {
            tileStyle = {
                width: '62vw',
                height: '62vw',
                position: 'absolute',
                top: '50%',
                left: '50%',
                margin: '0',
                marginTop: '-31vw',
                marginLeft: '-31vw',
                boxShadow: '0 0 40px 5px rgba(0, 0, 0, 0.3)',
                transform: 'none'
            };
        } else {
            tileStyle = {
                width: '18vw',
                height: '18vw'
            };
        }

        return (
            <div className="tile">
                <img
                    onMouseEnter={this._mouseEnter}
                    onMouseLeave={this._mouseLeave}
                    onClick={this._clickHandler}
                    src={`data:image/jpeg;base64,${this.props.data}`}
                    style={tileStyle}
                />
            </div>
        );
    }
}

export default Images;
