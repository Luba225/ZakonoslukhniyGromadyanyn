import axios from 'axios';
import * as FileSystem from 'expo-file-system';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dxrdc27dv/upload';
const UPLOAD_PRESET = 'Violations';

export const uploadToCloudinary = async (uri) => {
  try {
    if (!uri.startsWith('file://')) {
      throw new Error('Invalid file URI');
    }

    console.log('📤 Uploading to Cloudinary:', {
      uri,
      CLOUDINARY_URL,
      UPLOAD_PRESET,
    });

    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const data = {
      file: `data:image/jpeg;base64,${base64}`,
      upload_preset: UPLOAD_PRESET,
    };

    console.log('📦 Sending data:', {
      length: base64.length,
      sample: base64.substring(0, 100),
    });

    const response = await axios.post(CLOUDINARY_URL, data);

    console.log('✅ Cloudinary Response:', response.data.secure_url);
    return response.data.secure_url;
  } catch (error) {
    console.error('❌ Cloudinary Upload Error:', error.message);
    throw error;
  }
};