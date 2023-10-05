import { VoiceRecorder } from 'capacitor-voice-recorder';

/**
 * Gets boolean value that determines whether the device can record voice.
 */
export async function getPermissionsStatus () {
  const { value: deviceSupport } = await VoiceRecorder.hasAudioRecordingPermission();
  return deviceSupport;
}