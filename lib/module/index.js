import { NativeModules, NativeEventEmitter } from 'react-native';
const NativeFtpClient = NativeModules.FtpClient;
const NativeFtpClientEventEmitter = new NativeEventEmitter(NativeFtpClient);
export let FtpFileType = /*#__PURE__*/function (FtpFileType) {
  FtpFileType["Dir"] = "dir";
  FtpFileType["File"] = "file";
  FtpFileType["Link"] = "link";
  FtpFileType["Unknown"] = "unknown";
  return FtpFileType;
}({});
let FtpClient;
(function (_FtpClient) {
  function getEnumFromString(typeString) {
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
  function setup(config) {
    NativeFtpClient.setup(config.ip_address, config.port, config.username, config.password);
  }
  _FtpClient.setup = setup;
  async function list(remote_path) {
    const files = await NativeFtpClient.list(remote_path);
    return files.map(f => {
      return {
        name: f.name,
        type: getEnumFromString(f.type),
        size: +f.size,
        timestamp: new Date(f.timestamp)
      };
    });
  }
  _FtpClient.list = list;
  async function uploadFile(local_path, remote_path) {
    return NativeFtpClient.uploadFile(local_path, remote_path);
  }
  _FtpClient.uploadFile = uploadFile;
  async function cancelUploadFile(token) {
    return NativeFtpClient.cancelUploadFile(token);
  }
  _FtpClient.cancelUploadFile = cancelUploadFile;
  function addProgressListener(listener) {
    return NativeFtpClientEventEmitter.addListener('Progress', listener);
  }
  _FtpClient.addProgressListener = addProgressListener;
  async function remove(remote_path) {
    return NativeFtpClient.remove(remote_path);
  }
  _FtpClient.remove = remove;
  const ERROR_MESSAGE_CANCELLED = _FtpClient.ERROR_MESSAGE_CANCELLED = NativeFtpClient.ERROR_MESSAGE_CANCELLED;
  async function downloadFile(local_path, remote_path) {
    return NativeFtpClient.downloadFile(local_path, remote_path);
  }
  _FtpClient.downloadFile = downloadFile;
  async function cancelDownloadFile(token) {
    return NativeFtpClient.cancelDownloadFile(token);
  }
  _FtpClient.cancelDownloadFile = cancelDownloadFile;
})(FtpClient || (FtpClient = {}));
export default FtpClient;
//# sourceMappingURL=index.js.map