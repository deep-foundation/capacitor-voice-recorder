import { useEffect, useRef, useState } from "react";
import { DeepClient } from "@deep-foundation/deeplinks/imports/client.js";
import { startRecording } from "../start-recording.js";
import {
  IStopAndUploadRecordingOptions,
  stopAndUploadRecording,
} from "../stop-and-upload-recording.js";
import { packageLog } from "../package-log.js";
import { getCurrentStatus } from "../get-current-status.js";
import { useReducer } from 'react';
import delay from "delay";

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
    async function manageRecording() {
      try {
        // Start the recording
        await startRecording();
        setIsRecording(true);
        log("Recording started");

        // Wait for the specified interval
        await delay(savingIntervalInMs);

        // Stop and upload the recording
        await stopAndUploadRecording({deep, containerLinkId});
        setIsRecording(false);
        log('Recording uploaded');

        // Start a new recording
        manageRecording();
      } catch (error) {
        log({error});
        setError(error)
      }
    }

    manageRecording();
  }, [savingIntervalInMs]);

  return {isRecording, error};

}