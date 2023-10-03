import { VoiceRecorder } from 'capacitor-voice-recorder';

/**
 * Request recording permissions.
 */
export const requestAudioRecordingPermissions = async () => {
  const { value: recorderPermissions } = await VoiceRecorder.requestAudioRecordingPermission();
  return recorderPermissions as boolean;
}

/**
 * Gets boolean value that determines whether the device can record voice.
 */
export const canDeviceVoiceRecord = async () => {
  const { value: deviceSupport } = await VoiceRecorder.canDeviceVoiceRecord();
  return deviceSupport as boolean;
}