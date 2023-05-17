import {
  NativeModules,
  NativeEventEmitter,
  EmitterSubscription,
} from 'react-native';

const NativeFtpClient = NativeModules.FtpClient;
const NativeFtpClientEventEmitter = new NativeEventEmitter(NativeFtpClient);

export const enum FtpFileType {
  Dir = 'dir',
  File = 'file',
  Link = 'link',
  Unknown = 'unknown',
}
export interface ListItem {
  name: string;
  type: FtpFileType;
  size: number;
  timestamp: Date;
}
export interface FtpSetupConfiguration {
  ip_address: string;
  port: number;
  username: string;
  password: string;
}

module FtpClient {
  function getEnumFromString(typeString: string): FtpFileType {
    switch (typeString) {
      case 'dir':
        return FtpFileType.Dir;
      case 'link':
        return FtpFileType.Link;
      case 'file':
        return FtpFileType.File;
      case 'unknown':
      default:
        return FtpFileType.Unknown;
    }
  }

  export function setup(config: FtpSetupConfiguration) {
    NativeFtpClient.setup(
      config.ip_address,
      config.port,
      config.username,
      config.password
    );
  }

  export async function list(remote_path: string): Promise<Array<ListItem>> {
    const files = await NativeFtpClient.list(remote_path);
    return files.map(
      (f: { name: string; type: string; size: number; timestamp: string }) => {
        return {
          name: f.name,
          type: getEnumFromString(f.type),
          size: +f.size,
          timestamp: new Date(f.timestamp),
        };
      }
    );
  }

  export async function uploadFile(
    local_path: string,
    remote_path: string
  ): Promise<void> {
    return NativeFtpClient.uploadFile(local_path, remote_path);
  }

  export async function cancelUploadFile(token: string): Promise<void> {
    return NativeFtpClient.cancelUploadFile(token);
  }

  export function addProgressListener(
    listener: (data: { token: string; percentage: number }) => void
  ): EmitterSubscription {
    return NativeFtpClientEventEmitter.addListener('Progress', listener);
  }

  export async function remove(remote_path: string): Promise<void> {
    return NativeFtpClient.remove(remote_path);
  }

  export const ERROR_MESSAGE_CANCELLED: string =
    NativeFtpClient.ERROR_MESSAGE_CANCELLED;

  export async function downloadFile(
    local_path: string,
    remote_path: string
  ): Promise<void> {
    return NativeFtpClient.downloadFile(local_path, remote_path);
  }

  export async function cancelDownloadFile(token: string): Promise<void> {
    return NativeFtpClient.cancelDownloadFile(token);
  }
}

export default FtpClient;
