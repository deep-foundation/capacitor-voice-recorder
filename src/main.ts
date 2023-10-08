export {
  WithDeviceSupport,
  type IWithDeviceSupportOptions as IWithDeviceSupportOptions,
} from "./components/with-device-support";
export {
  WithPermissionsRequesting,
  WithPermissionsRequesting as WithVoiceRecorderPermissionsRequesting,
  type IWithPermissionsRequestingOptions as WithPermissionsRequestingOptions,
  type IWithPermissionsRequestingOptions as WithVoiceRecorderPermissionsRequestingOptions,
} from "./components/with-permissions-requesting";
export {
  WithPermissionsStatus,
  type IWithPermissionsStatusOptions,
  type IWithPermissionsStatusOptions as WithVoiceRecorderPermissionsStatusOptions,
} from "./components/with-permissions-status";
export {
    WithRecording,
    WithRecording as WithVoiceRecording,
    type IWithRecordingOptions,
    type IWithRecordingOptions as IWithVoiceRecordingOptions,
} from './components/with-recording'

export {useDeviceSupportStatus} from './hooks/use-device-support-status'
export {usePermissionsRequesting,usePermissionsRequesting as useVoiceRecorderPermissionsRequesting} from './hooks/use-permissions-requesting'
export {usePermissionsStatus,usePermissionsStatus as useVoiceRecorderPermissionsStatus} from './hooks/use-permissions-status'
export {useRecording,useRecording as useVoiceRecording} from './hooks/use-recording'

export {
  type IStopAndUploadRecordingOptions,
  stopAndUploadRecording,
} from "./stop-and-upload-recording";

export { PACKAGE_NAME } from "./package-name";
export {
  getPermissionsStatus as checkPermissions,
  getPermissionsStatus as checkVoiceRecorderPermissions,
} from "./get-permissions-status";


export { startRecording } from "./strart-recording";
export { pauseRecording } from "./pause-recording";
export { resumeRecording } from "./resume-recording";
export {
  stopRecording,
  type ISound,
  type IStopRecordingReturn,
} from "./stop-recording";
export { getRecords as downloadRecords } from "./download-records";
export { useRecordingStatus } from "./hooks/use-recording-status";
export {
  uploadRecords,
  type IRecord,
  type IUploadRecordsOptions,
} from "./upload-records";
export { LinkName } from "./link-name";
export { requestPermissions, requestPermissions as requestVoiceRecorderPermissions } from "./request-permissions";

import { startRecording } from "./strart-recording";
import { pauseRecording } from "./pause-recording";
import { resumeRecording } from "./resume-recording";
import { stopRecording } from "./stop-recording";
import { uploadRecords } from "./upload-records";
import { requestPermissions } from "./request-permissions";

export { Package, type PackageOptions } from "./package";

const Recorder = {
  startRecording,
  pauseRecording,
  resumeRecording,
  stopRecording,
  uploadRecords,
  requestAudioRecordingPermissions: requestPermissions,
};
export default Recorder;
