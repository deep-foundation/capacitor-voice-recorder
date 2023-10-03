import { VoiceRecorder } from "capacitor-voice-recorder";

export function startRecording() {
  return VoiceRecorder.startRecording();
}