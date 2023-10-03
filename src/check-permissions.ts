import { VoiceRecorder } from 'capacitor-voice-recorder';

/**
 * Gets boolean value that determines whether the device can record voice.
 */
export async function checkPermissions () {
  const { value: deviceSupport } = await VoiceRecorder.canDeviceVoiceRecord();
  return deviceSupport;
}