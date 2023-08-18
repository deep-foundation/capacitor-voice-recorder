import { VoiceRecorder } from "capacitor-voice-recorder";

// Starts the recording process.

export async function startRecording(): Promise<boolean> {
  const { value: isRecording } = await VoiceRecorder.startRecording(); // Start the recording.
  return isRecording; // return recording status.
}