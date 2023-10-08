import { useState } from "react";
import { getDeviceSupportStatus } from "../get-device-support-status";

/**
 * Custom hook to manage device support status.
 */
export function useDeviceSupportStatus() {
  // State variables for device support, loading state, and potential errors
  const [deviceSupport, setDeviceSupport] = useState<boolean | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown | null>(null);

  // Function to check device support and update the state accordingly
  const checkDeviceSupport = async () => {
    setIsLoading(true);
    try {
      const supportStatus = await getDeviceSupportStatus();
      setDeviceSupport(supportStatus);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { deviceSupport, checkDeviceSupport, isLoading, error };
}
