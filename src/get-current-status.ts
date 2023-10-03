import { CurrentRecordingStatus, VoiceRecorder } from "capacitor-voice-recorder";

export async function getCurrentStatus(): Promise<ICurrentStatus> {
  return (await VoiceRecorder.getCurrentStatus()).status;
}

export type ICurrentStatus = CurrentRecordingStatus['status']