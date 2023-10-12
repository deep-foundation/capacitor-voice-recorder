import { useEffect, useRef, useState } from "react";
import { DeepClient } from "@deep-foundation/deeplinks/imports/client.js";
import { startRecording } from "../start-recording.js";
import {
  IStopAndUploadRecordingOptions,
  stopAndUploadRecording,
} from "../stop-and-upload-recording.js";
import { packageLog } from "../package-log.js";
import { getCurrentStatus } from "../get-current-status.js";

export function useRecording(options: IUseRecordingOptions) {
  const log = packageLog.extend(useRecording.name);
  const [error, setError] = useState<unknown | null>(null);
  log({ error, setError });

  const intervalRef = useRef<NodeJS.Timer | null>(null);
  log({ timeoutRef: intervalRef });

  const initiateRecording = async () => {
    try {
      await startRecording();
      log("Recording started");
      const { savingIntervalInMs = 1 * 60 * 1000 } = options;

      intervalRef.current = setInterval(async () => {
        log("Going to stop and upload recording");
        await stopAndUploadRecording(options).catch(setError);
      }, savingIntervalInMs);
    } catch (error) {
      log({ error: error });
      setError(error);
    }
  };

  async function cleanupRecording () {
    log("Cleaning up recording");
    const status = await getCurrentStatus()
    if(status === 'NONE') return;
    await stopAndUploadRecording(options)
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    initiateRecording();

    return () => {
      cleanupRecording();
    };
  }, [options]);

  return { error };
}

export type IUseRecordingOptions = {
  deep: DeepClient;
  savingIntervalInMs?: number;
} & IStopAndUploadRecordingOptions;
