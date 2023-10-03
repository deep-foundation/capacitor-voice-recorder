import { VoiceRecorder } from 'capacitor-voice-recorder';

/**
 * Request recording permissions.
 */

export const requestPermissions = async () => {
  const { value: recorderPermissions } = await VoiceRecorder.requestAudioRecordingPermission();
  return recorderPermissions as boolean;
};
