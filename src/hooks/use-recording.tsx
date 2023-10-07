import { useEffect, useRef, useState } from "react";
import { DeepClient } from "@deep-foundation/deeplinks/imports/client.js";
import { startRecording } from "../start-recording.js";
import {
  IStopAndUploadRecordingOptions,
  stopAndUploadRecording,
} from "../stop-and-upload-recording.js";

export function useRecording(options: IUseRecordingOptions) {
  // State to capture any potential errors
  const [error, setError] = useState<unknown | null>(null);

  // Ref to store the timeout ID, ensuring proper cleanup on unmount
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const initiateRecording = async () => {
    try {
      await startRecording();
      const { savingIntervalInMs = 1*60*1000 } = options;

      timeoutRef.current = setTimeout(() => {
        stopAndUploadRecording(options).catch(setError);
      }, savingIntervalInMs);
    } catch (err) {
      setError(err);
    }
  };

  const cleanupRecording = () => {
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
