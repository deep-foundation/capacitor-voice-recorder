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
import { stopRecording } from "../stop-recording.js";
import { uploadRecords } from "../upload-records.js";

export type IUseRecordingOptions = {
  deep: DeepClient;
  savingIntervalInMs?: number;
} & IStopAndUploadRecordingOptions;


export function useRecording(uploadIntervalSeconds) {
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    async function manageRecording() {
      try {
        if (abortController.signal.aborted) return;

        // Start the recording
        await startRecording();
        setIsRecording(true);

        // wait for specified interval
        await new Promise((resolve) => {
          const timeout = setTimeout(resolve, uploadIntervalSeconds * 1000);
          abortController.signal.addEventListener('abort', () => clearTimeout(timeout));
        });
        
        if (abortController.signal.aborted) return;

        // Stop and upload the recording
        await stopRecording();

        setIsRecording(false);

        // Start a new recording
        manageRecording();
      } catch (err) {
        if (!abortController.signal.aborted) {
          setError(err);
        }
      }
    }

    manageRecording();

    // Cleanup function
    return () => {
      abortController.abort();
    };
  }, [uploadIntervalSeconds]);

  return { isRecording, error };
}