import { VoiceRecorder } from 'capacitor-voice-recorder';

/**
 * Gets boolean value that determines whether the device can record voice.
 */
export const canDeviceVoiceRecord = async () => {
  const { value: deviceSupport } = await VoiceRecorder.canDeviceVoiceRecord();
  return deviceSupport as boolean;
}