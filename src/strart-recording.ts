import { VoiceRecorder } from "capacitor-voice-recorder";

// Starts the recording process.

export async function startRecording(): Promise<boolean> {
  const { value: isrecording } = await VoiceRecorder.startRecording(); // Start the recording.
  return isrecording; // return recording status.
}