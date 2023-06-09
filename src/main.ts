export { PACKAGE_NAME } from "./package-name";
export { createContainer } from './create-container';
export { startRecording } from './strart-recording';
export { pauseRecording } from "./pause-recording";
export { resumeRecording } from "./resume-recording";
export { stopRecording, type ISound, type IStopRecordingOptions } from "./stop-recording";
export { VoiceRecorder } from "./components/voice-recorder";
export { downloadRecords } from "./download-records";
export { useContainer } from "./hooks/use-container";
export { usePermissions } from "./hooks/use-permissions";
export { useRecordingCycle, type IUseRecordingCycle } from "./hooks/use-recording-cycle";
export { useRecordingStatus } from "./hooks/use-recording-status";
export { uploadRecords, type IRecord, type IUploadRecordsOptions } from "./upload-records";
export { LinkName } from './link-name';

import { startRecording } from './strart-recording';
import { pauseRecording } from "./pause-recording";
import { resumeRecording } from "./resume-recording";
import { stopRecording } from "./stop-recording";
import { uploadRecords } from "./upload-records";

const Recorder = {
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording,
    uploadRecords
};
export default Recorder;