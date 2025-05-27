import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { addPhoto, fetchPhotos, removePhoto } from '../../redux/photos/actions';
// import store from '../../redux';

/*
* Update: Decided to do a lot of the styled-components in this index.js file in particular. Here's why:
* Album/index.js handles most of the project’s logic, such as displaying photo data, interacting with Redux, and cycling through photos.
* It is the primary user-facing feature component, while App.js and redux/index.js concentrates only on high-level app setup and store creation. 
*/

// Styled components that are used as easier and less messy alternatives to glamorous-native.
const AlbumText = styled.Text`
  font-size: 18px;
  color: black;
  margin-bottom: 8px;
`;

const TitleText = styled.Text`
  font-size: 24px;
  color: darkblue;
  margin-bottom: 8px;
`;

const URLText = styled.Text`
  font-size: 12px;
  color: gray;
  margin-bottom: 8px;
`;

const ThumbnailURLText = styled.Text`
  font-size: 12px;
  color: green;
  margin-bottom: 8px;
`;

const Button = styled.TouchableOpacity`
  background-color: #3498db;
  padding: 15px;
  border-radius: 5px;
  margin-top: 20px;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 18px;
  text-align: center;
`;

const Container = styled.View`
  flex: 1;
  align-items: center;
  padding: 20px;
`;

// Added Photo map for more photos to be added to the album.
// These are free public domain images I discovered from placeholder.com 
// to play it safe and avoid potential copyright issues for certain images.
const photoMap = {
    photo1: {
      albumId: 1,
      title: 'Sunset Over the Hills',
      url: 'https://via.placeholder.com/600/24f355',
      thumbnailUrl: 'https://via.placeholder.com/150/24f355'
    },
    photo2: {
      albumId: 2,
      title: 'City Lights at Night',
      url: 'https://via.placeholder.com/600/771796',
      thumbnailUrl: 'https://via.placeholder.com/150/771796'
    },
    photo3: {
      albumId: 3,
      title: 'Ocean Breeze',
      url: 'https://via.placeholder.com/600/d32776',
      thumbnailUrl: 'https://via.placeholder.com/150/d32776'
    }
  };

class Album extends Component {
  constructor(props) {
    super(props);
    this.photoKeys = Object.keys(photoMap);
    this.currentPhotoIndex = 0;
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.fetchPhotos();
    }, 2000);
  }

  addNextPhoto = () => {
    const nextKey = this.photoKeys[this.currentPhotoIndex];
    const nextPhoto = photoMap[nextKey];
    this.props.addPhoto(nextPhoto);
    this.currentPhotoIndex = (this.currentPhotoIndex + 1) % this.photoKeys.length;
  };

  render() {
    const latestPhoto = this.props.latestPhoto || {};
  
    return (
      <ScrollView>
        <Container>
            <AlbumText>Album ID: {latestPhoto.albumId}</AlbumText>
            <TitleText>Title: {latestPhoto.title}</TitleText>
            <URLText>URL: {latestPhoto.url}</URLText>
            <ThumbnailURLText>Thumbnail URL: {latestPhoto.thumbnailUrl}</ThumbnailURLText>

            {latestPhoto.url && (
                <Image
                source={{ uri: latestPhoto.url }}
                style={{ width: 300, height: 300, marginVertical: 20 }}
                resizeMode="cover"
                />
            )}

            <Button onPress={this.addNextPhoto}>
                <ButtonText>Next Photo</ButtonText>
            </Button>
        </Container>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  const photos = state.photos.photos;
  return {
    latestPhoto: photos.length > 0 ? photos[photos.length - 1] : {}
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPhotos: () => dispatch(fetchPhotos()),
    addPhoto: (photo) => dispatch(addPhoto(photo)),
    removePhoto: (photo) => dispatch(removePhoto(photo))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Album);