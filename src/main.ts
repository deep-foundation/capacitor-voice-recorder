export {
  WithDeviceSupport,
  IWithDeviceSupportOptions as IWithDeviceSupportOptions,
} from "./components/with-device-support.js";
export {
  WithPermissionsRequesting,
  WithPermissionsRequesting as WithVoiceRecorderPermissionsRequesting,
  IWithPermissionsRequestingOptions as WithPermissionsRequestingOptions,
  IWithPermissionsRequestingOptions as WithVoiceRecorderPermissionsRequestingOptions,
} from "./components/with-permissions-requesting.js";
export {
  WithPermissionsStatus,
  IWithPermissionsStatusOptions,
  IWithPermissionsStatusOptions as WithVoiceRecorderPermissionsStatusOptions,
} from "./components/with-permissions-status.js";
export {
    WithRecording,
    WithRecording as WithVoiceRecording,
    IWithRecordingOptions,
    IWithRecordingOptions as IWithVoiceRecordingOptions,
} from './components/with-recording.js'

export {useDeviceSupportStatus} from './hooks/use-device-support-status.js'
export {usePermissionsRequesting,usePermissionsRequesting as useVoiceRecorderPermissionsRequesting} from './hooks/use-permissions-requesting.js'
export {usePermissionsStatus,usePermissionsStatus as useVoiceRecorderPermissionsStatus} from './hooks/use-permissions-status.js'
export {useRecording,useRecording as useVoiceRecording} from './hooks/use-recording.js'

export { requestPermissions } from "./request-permissions.js";
export {
  IStopAndUploadRecordingOptions,
  stopAndUploadRecording,
} from "./stop-and-upload-recording.js";

export { PACKAGE_NAME } from "./package-name.js";
export {
  getPermissionsStatus as checkPermissions,
  getPermissionsStatus as checkVoiceRecorderPermissions,
} from "./get-permissions-status.js";


export { startRecording } from "./strart-recording.js";
export { pauseRecording } from "./pause-recording.js";
export { resumeRecording } from "./resume-recording.js";
export {
  stopRecording,
  type ISound,
  type IStopRecordingReturn,
} from "./stop-recording.js";
export { getRecords as downloadRecords } from "./download-records.js";
export { useRecordingStatus } from "./hooks/use-recording-status.js";
export {
  uploadRecords,
  type IRecord,
  type IUploadRecordsOptions,
} from "./upload-records.js";
export { LinkName } from "./link-name.js";

import { startRecording } from "./strart-recording.js";
import { pauseRecording } from "./pause-recording.js";
import { resumeRecording } from "./resume-recording.js";
import { stopRecording } from "./stop-recording.js";
import { uploadRecords } from "./upload-records.js";
import { requestPermissions } from "./request-permissions.js";

export { Package, PackageOptions } from "./package.js";

const Recorder = {
  startRecording,
  pauseRecording,
  resumeRecording,
  stopRecording,
  uploadRecords,
  requestAudioRecordingPermissions: requestPermissions,
};
export default Recorder;
