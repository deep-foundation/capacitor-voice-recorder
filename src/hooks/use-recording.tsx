import { useEffect, useRef, useState } from "react";
import { DeepClient } from "@deep-foundation/deeplinks/imports/client";
import { startRecording } from "../start-recording";
import {
  IStopAndUploadRecordingOptions,
  stopAndUploadRecording,
} from "../stop-and-upload-recording";
import { packageLog } from "../package-log";

export function useRecording(options: IUseRecordingOptions) {
  const log = packageLog.extend(useRecording.name);
  const [error, setError] = useState<unknown | null>(null);
  log({ error, setError });

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  log({ timeoutRef });

  const initiateRecording = async () => {
    try {
      await startRecording();
      log("Recording started");
      const { savingIntervalInMs = 1 * 60 * 1000 } = options;

      timeoutRef.current = setInterval(async () => {
        log("Going to stop and upload recording");
        await stopAndUploadRecording(options).catch(setError);
      }, savingIntervalInMs);
    } catch (error) {
      log({ error: error });
      setError(error);
    }
  };

  const cleanupRecording = () => {
    log("Cleaning up recording");
    stopAndUploadRecording(options);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    initiateRecording();

    return cleanupRecording;
  }, [options]);

  return { error };
}

export type IUseRecordingOptions = {
  deep: DeepClient;
  savingIntervalInMs?: number;
} & IStopAndUploadRecordingOptions;
