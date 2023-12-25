import { useEffect, useState, useRef } from "react";
import { getPermissionsStatus } from "../get-permissions-status.js";
import { App } from '@capacitor/app';
import { emitter } from "../emitter.js";
import { packageLog } from "../package-log.js";
import { PermissionStatus } from "../permissionStatus.js";


export function usePermissionsStatus() {
  const log = packageLog.extend(usePermissionsStatus.name)
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
    const permissionsChangedListener = emitter.on(
      "permissionsChanged",
      (permissionsStatus: PermissionStatus) => {
        log(`permissionsChanged event received`, permissionsStatus);
        setPermissionsStatus(permissionsStatus);
      },
    );

    return () => {
      resumeListener.then(resumeListener => resumeListener.remove());
      emitter.off("permissionsChanged", permissionsChangedListener);
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

