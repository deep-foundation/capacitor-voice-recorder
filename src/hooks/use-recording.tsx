import { useEffect, useRef, useState } from "react";
import { DeepClient } from "@deep-foundation/deeplinks/imports/client.js";
import { startRecording } from "../start-recording.js";
import {
  IStopAndUploadRecordingOptions, stopAndUploadRecording,
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
  const isRecordingRef = useRef(false);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    const abortController = new AbortController();
    async function manageRecording() {
      try {
        if (abortController.signal.aborted) return;
        // Start the recording
        log("Starting recording")
        await startRecording();
        isRecordingRef.current=true;

        // Wait for the specified interval
        log(`Waiting for ${savingIntervalInMs}ms`)
        await new Promise((resolve) => {
          const timeout = setTimeout(resolve, savingIntervalInMs);
          abortController.signal.addEventListener('abort', () => clearTimeout(timeout));
        });
        log(`Interval of ${savingIntervalInMs}ms elapsed`)

        if (abortController.signal.aborted) return;

        // Stop and upload the recording
        log("Stopping recording")
        const recordingData = await stopRecording();
        log({recordingData});
        isRecordingRef.current = false;
        manageRecording();
        log("Uploading recording")
        uploadRecords({deep, containerLinkId, records: [recordingData]});

        // Start a new recording
      } catch (error) {
        log({error});
        setError(error)
      }
    }

    manageRecording();

    return () => {
      log("Unmounting");
      log("Aborting recording");
      abortController.abort();
      if(isRecordingRef.current) {
        log("Stopping and uploading recording")
        stopAndUploadRecording({deep,containerLinkId})
      }
    };
  }, [savingIntervalInMs]);

  return {error};

}