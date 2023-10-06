import { useEffect, useState, useRef } from "react";
import { getPermissionsStatus } from "../get-permissions-status.js";
import { App } from '@capacitor/app';


export function usePermissionsStatus() {
  const [permissionsStatus, setPermissionsStatus] = useState<boolean | undefined>(undefined);
  const [error, setError] = useState<unknown | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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

    const resumeListener = App.addListener('resume', () => {
      updatePermissionsStatus();
    });

    return () => {
      resumeListener.remove();
    };
  }, []); 


  return { permissionsStatus, updatePermissionsStatus, error, isLoading };
}

export type IUsePermissionsStatusReturn = {
  permissionsStatus: boolean | undefined;
  updatePermissionsStatus: () => Promise<void>;
  error: unknown | null;
  isLoading: boolean; 
};

