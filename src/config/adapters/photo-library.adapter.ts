import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export class PhotoLibraryAdapter {
  static async takePicture(): Promise<string[]> {
    const response = await launchCamera({
      mediaType: 'photo',
      quality: 0.7,
      cameraType: 'back',
    });

    if (response.assets && response.assets[0].uri) {
      return [response.assets[0].uri];
    }

    return [];
  }

  static async getPictuersFromLibrary(): Promise<string[]> {
    try {
      const response = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.7,
        selectionLimit: 1,
      });

      if (response.assets && response.assets[0].uri) {
        console.log(response.assets[0].uri);
        return [response.assets[0].uri];
      }
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      }
    } catch (error) {
      console.error('Error opening image library: ', error);
    }

    return [];
  }
}
