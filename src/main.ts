export {WithPermissions,WithPermissionsOptions} from './components/with-permissions.js'

export { PACKAGE_NAME } from "./package-name.js";
export { requestAudioRecordingPermissions , canDeviceVoiceRecord  } from './get-permissions.js';
export { createContainer } from './create-container.js';
export { startRecording } from './strart-recording.js';
export { pauseRecording } from "./pause-recording.js";
export { resumeRecording } from "./resume-recording.js";
export { stopRecording, type ISound, type IStopRecordingOptions } from "./stop-recording.js";
export { VoiceRecorder } from "./components/voice-recorder.js";
export { downloadRecords } from "./download-records.js";
export { useContainer } from "./hooks/use-container.js";
export { usePermissions } from "./hooks/use-permissions.js";
export { useRecordingCycle, type IUseRecordingCycle } from "./hooks/use-recording-cycle.js";
export { useRecordingStatus } from "./hooks/use-recording-status.js";
export { uploadRecords, type IRecord, type IUploadRecordsOptions } from "./upload-records.js";
export { LinkName } from './link-name.js';

import { startRecording } from './strart-recording.js';
import { pauseRecording } from "./pause-recording.js";
import { resumeRecording } from "./resume-recording.js";
import { stopRecording } from "./stop-recording.js";
import { uploadRecords } from "./upload-records.js";
import { requestAudioRecordingPermissions } from "./get-permissions.js"

export { Package, PackageOptions } from './package.js'


const Recorder = {
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording,
    uploadRecords,
    requestAudioRecordingPermissions
};
export default Recorder;