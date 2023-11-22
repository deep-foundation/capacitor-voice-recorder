import { useEffect, useState } from "react";
import { DeepClient } from "@deep-foundation/deeplinks/imports/client.js";
import { startRecording } from "../start-recording.js";
import {
  IStopAndUploadRecordingOptions,
} from "../stop-and-upload-recording.js";
import { packageLog } from "../package-log.js";
import { stopRecording } from "../stop-recording.js";
import { uploadRecords } from "../upload-records.js";

export type IUseRecordingOptions = {
  deep: DeepClient;
  savingIntervalInMs?: number;
} & IStopAndUploadRecordingOptions;


export function useRecording(options: IUseRecordingOptions) {
  const log = packageLog.extend(useRecording.name)
  const {deep,containerLinkId,savingIntervalInMs} = options
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    const abortController = new AbortController();
    async function manageRecording() {
      try {
        if (abortController.signal.aborted) return;
        // Start the recording
        await startRecording();
        setIsRecording(true);
        log("Recording started");

        // Wait for the specified interval
        await new Promise((resolve) => {
          const timeout = setTimeout(resolve, savingIntervalInMs);
          abortController.signal.addEventListener('abort', () => clearTimeout(timeout));
        });
        log(`Interval of ${savingIntervalInMs}ms elapsed`)

        if (abortController.signal.aborted) return;

        // Stop and upload the recording
        const recordingData = await stopRecording();
        log('Recording stopped', {recordingData});
        setIsRecording(false);
        manageRecording();
        uploadRecords({deep, containerLinkId, records: [recordingData]});
        log('Recording uploaded');

        // Start a new recording
      } catch (error) {
        log({error});
        setError(error)
      }
    }

    manageRecording();

    return () => {
      abortController.abort();
      if(isRecording) {
        stopRecording().then(recordingData => {
          uploadRecords({deep, containerLinkId, records: [recordingData]});
        });
      }
    };
  }, [savingIntervalInMs]);

  return {isRecording, error};

}