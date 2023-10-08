import { DeepClient } from "@deep-foundation/deeplinks/imports/client";
import { stopRecording } from "./stop-recording";
import { uploadRecords } from "./upload-records";

export async function stopAndUploadRecording(options: IStopAndUploadRecordingOptions) {
  const { deep,  containerLinkId = deep.linkId! } = options;
  const {endTime,startTime, sound} = await stopRecording();
  await uploadRecords({ deep, containerLinkId, records: [{ sound, startTime: startTime, endTime: endTime }] });
}

export type IStopAndUploadRecordingOptions = {
  deep: DeepClient;
  containerLinkId?: number;
};