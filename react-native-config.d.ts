declare module 'react-native-config' {
    export interface NativeConfig {
      API_URL?: string;
      API_URL_SOCKETS?: string;
      IS_DEMO_ACTIVE?: boolean;
    }
  
    export const Config: NativeConfig;
    export default Config;
  }