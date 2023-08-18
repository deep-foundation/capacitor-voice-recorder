import { DeepClient } from "@deep-foundation/deeplinks/imports/client.js";
import { VoiceRecorder } from "capacitor-voice-recorder";
import { uploadRecords } from "./upload-records.js";


export interface ISound { // Represents a recorded sound.
  recordDataBase64: string; // Base64-encoded audio data.
  msDuration: number; // Duration of the recording in milliseconds.
  mimeType: string; // The MIME type of the audio file.
}


export interface IStopRecordingOptions { // Represents the parameters for stopping a recording.
  deep: DeepClient; // The DeepClient object used for communication.
  /**
   * The ID of the container link.
   * 
   * @defaultValue deep.linkId
   */
  containerLinkId?: number; // The ID of the container link.
}

export async function stopRecording({
  deep,
  containerLinkId = deep.linkId!,
}: IStopRecordingOptions): Promise<ISound> {
  const { value: sound } = await VoiceRecorder.stopRecording(); // Stop the recording and obtain the recorded sound.
  const endTime = new Date(); // Get the end time of the recording.
  
  // Calculate start time based on end time and sound's duration.
  const startTime = new Date(endTime.getTime() - sound.msDuration);
  
  // Format end time to locale string to only include digits with time.
  const endTimeString = endTime.toLocaleDateString(undefined, {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).replace(/\D/g, '');

  // Format start time to locale string to only include digits with time.
  const startTimeString = startTime.toLocaleDateString(undefined, {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).replace(/\D/g, '');

  await uploadRecords({ deep, containerLinkId, records: [{ sound, startTime: startTimeString, endTime: endTimeString }] }); // Upload the recorded sound.
  
  return sound; // Return the recorded sound.
}