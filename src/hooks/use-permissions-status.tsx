import { useEffect, useState, useRef } from "react";
import { getPermissionsStatus } from "../get-permissions-status.js";

const DEFAULT_INTERVAL_MS = 1000;

export function usePermissionsStatus(options: IUsePermissionsStatusOptions = {}) {
  const [permissionsStatus, setPermissionsStatus] = useState<boolean | undefined>(undefined);
  const [error, setError] = useState<unknown | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const intervalRef = useRef<number | null>(null);

  const updatePermissionsStatus = async () => {
    setIsLoading(true); 
    try {
      const status = await getPermissionsStatus();
      setPermissionsStatus(status);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false); 
    }
  };

  useEffect(() => {
    updatePermissionsStatus();
    intervalRef.current = window.setInterval(updatePermissionsStatus, options.intervalInMs || DEFAULT_INTERVAL_MS);

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [options.intervalInMs]);

  return { permissionsStatus, updatePermissionsStatus, error, isLoading };
}

export type IUsePermissionsStatusReturn = {
  permissionsStatus: boolean | undefined;
  updatePermissionsStatus: () => Promise<void>;
  error: unknown | null;
  isLoading: boolean; 
};

export type IUsePermissionsStatusOptions = {
  intervalInMs?: number;
};
