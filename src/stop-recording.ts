import { DeepClient } from "@deep-foundation/deeplinks/imports/client";
import { VoiceRecorder, RecordingData } from "capacitor-voice-recorder";
import { uploadRecords } from "./upload-records";


export type ISound = RecordingData['value']


export async function stopRecording(): Promise<IStopRecordingReturn> {
  const { value: sound } = await VoiceRecorder.stopRecording(); // Stop the recording and obtain the recorded sound.
  const endTime = new Date().getTime(); // Get the end time of the recording.
  
  // Calculate start time based on end time and sound's duration.
  const startTime = new Date(endTime - sound.msDuration).getTime();

  
  return {sound, startTime, endTime}; // Return the recorded sound.
}

export type IStopRecordingReturn = {
  sound: ISound;
  startTime: number;
  endTime: number;
}