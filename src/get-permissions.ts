import { VoiceRecorder } from 'capacitor-voice-recorder';

/**
 * Get recording permissions.
 */

export const getAudioRecordingPermissions = async () => {
  const { value: recorderPermissions } = await VoiceRecorder.requestAudioRecordingPermission();
  return recorderPermissions as boolean;
}

/**
 * Get device ability to record.
 */

export const getDeviceRecordAbility = async () => {
  const { value: deviceSupport } = await VoiceRecorder.canDeviceVoiceRecord();
  return deviceSupport as boolean;
}