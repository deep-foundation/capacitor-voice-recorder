import { useState, useEffect, useRef } from "react";
import { ICurrentStatus, getCurrentStatus } from "../get-current-status.js";

// Default interval for refreshing recording status
const DEFAULT_INTERVAL_MS = 1000;

export const useRecordingStatus = ({
  intervalInMs = DEFAULT_INTERVAL_MS,
}: IUseRecordingStatusOptions): IUseRecordingStatusReturn => {
  // State for recording status and any potential errors
  const [status, setStatus] = useState<ICurrentStatus | undefined>(undefined);
  const [error, setError] = useState<unknown | null>(null);
  
  // Ref to hold the interval ID, ensuring cleanup when component unmounts
  const intervalRef = useRef<number | null>(null);

  // Fetch and update the recording status
  const updateStatus = async () => {
    try {
      const currentStatus = await getCurrentStatus();
      setStatus(currentStatus);
      setError(null);  // Reset error state if successful
    } catch (err) {
      setError(err);   // Set error state on failure
    }
  };

  useEffect(() => {
    // Initialize the recording status immediately
    updateStatus();

    // Set up an interval to keep updating the recording status
    intervalRef.current = window.setInterval(updateStatus, intervalInMs);

    // Cleanup: clear the interval when the component using the hook unmounts
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [intervalInMs]);

  // Return current recording status, the update function, and any error
  return { status, updateStatus, error };
};

// Type definitions
export type IUseRecordingStatusReturn = {
  status: ICurrentStatus | undefined;
  updateStatus: () => Promise<void>;
  error: unknown | null;
};

export type IUseRecordingStatusOptions = {
  intervalInMs?: number;
};
