import React, { Component } from 'react'
import { ImageBackground, Image } from 'react-native'
import FastImage from 'react-native-fast-image'

export default class PlacehoderImage extends Component {
    constructor() {
        super();
        this.state = {
            mDidLoad: false,
        }
    }
    render() {
        const { placeholder, style, width, height } = this.props;
        if (placeholder) {
            return (
                <ImageBackground
                    source={this.state.mDidLoad ? {uri:'clear_placeholder'} : placeholder}
                    resizeMode={FastImage.resizeMode.center}
                    style={{width: width || style.width, height: height || style.height}}
                    >
                    {this._renderImage()}      
                </ImageBackground>
            )
        } else {
            return this._renderImage();
        }
    }

    _renderImage = () => {
        const {source, style, width, height, resizeMode } = this.props;
        const ImageType = source.uri.indexOf('http') < 0 ? Image : FastImage;
        return (
            <ImageType 
                source={source}
                resizeMode={resizeMode || FastImage.resizeMode.cover}
                style={style}
                width={width}
                height={height}

                onLoadStart={this._onLoadStart}
                onProgress={this._onProgress}
                onLoad={this._onLoad}
                onError={this._onError}
                onLoadEnd={this._onLoadEnd}
                onLayout={this._onLayout}
            />
        )
    }

    _onLoadStart = () => {
        const { onLoadStart } = this.props;
        onLoadStart && onLoadStart();
    }

    _onProgress = () => {
        const { onProgress } = this.props;
        onProgress && onProgress();   
    }

    _onLoad = () => {
        this.setState({
            mDidLoad: true,
        })
        const { onLoad } = this.props;
        onLoad && onLoad();
    }

    _onError = () => {
        const { onError } = this.props;
        onError && onError();
    }

    _onLoadEnd = () => {
        const { onLoadEnd } = this.props;
        onLoadEnd && onLoadEnd();
    }

    _onLayout = () => {
        const { onLayout } = this.props;
        onLayout && onLayout();
    }
}