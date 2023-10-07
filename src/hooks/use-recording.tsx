import { useEffect, useRef, useState } from "react";
import { DeepClient } from "@deep-foundation/deeplinks/imports/client.js";
import { startRecording } from "../start-recording.js";
import {
  IStopAndUploadRecordingOptions,
  stopAndUploadRecording,
} from "../stop-and-upload-recording.js";
import { packageLog } from "../package-log.js";

export function useRecording(options: IUseRecordingOptions) {
  const log = packageLog.extend(useRecording.name)
  // State to capture any potential errors
  const [error, setError] = useState<unknown | null>(null);
  log({error, setError})

  // Ref to store the timeout ID, ensuring proper cleanup on unmount
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  log({timeoutRef})

  const initiateRecording = async () => {
    try {
      await startRecording();
      log("Recording started")
      const { savingIntervalInMs = 1*60*1000 } = options;

      timeoutRef.current = setTimeout(() => {
        log("Going to stop and upload recording")
        stopAndUploadRecording(options).catch(setError);
      }, savingIntervalInMs);
    } catch (error) {
      log({error: error})
      setError(error);
    }
  };

  const cleanupRecording = () => {
    log("Cleaning up recording")
    stopAndUploadRecording(options);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    initiateRecording();

    // Cleanup function to be run when the component using the hook unmounts
    return cleanupRecording;
  }, [options]);

  return { error };
}

// Type definitions
export type IUseRecordingOptions = {
  deep: DeepClient;
  savingIntervalInMs?: number;
} & IStopAndUploadRecordingOptions;
