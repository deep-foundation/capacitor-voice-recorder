import { VoiceRecorder } from "capacitor-voice-recorder";

export async function getDeviceSupportStatus() {
  return (await VoiceRecorder.canDeviceVoiceRecord()).value;
}