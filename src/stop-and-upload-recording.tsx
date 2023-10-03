import { DeepClient } from "@deep-foundation/deeplinks/imports/client.js";
import { stopRecording } from "./stop-recording.js";
import { uploadRecords } from "./upload-records.js";

export async function stopAndUploadRecording(options: IStopAndUploadRecordingOptions) {
  const { deep,  containerLinkId } = options;
  const {endTime,startTime, sound} = await stopRecording();
  await uploadRecords({ deep, containerLinkId, records: [{ sound, startTime: startTime, endTime: endTime }] });
}

export type IStopAndUploadRecordingOptions = {
  deep: DeepClient;
  containerLinkId: number;
};