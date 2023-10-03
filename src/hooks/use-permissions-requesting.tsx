import { useState, useEffect } from "react";
import { VoiceRecorder as CapacitorVoiceRecorder } from 'capacitor-voice-recorder';
import { getPermissionsStatus } from "../get-permissions-status.js";
import { requestPermissions } from '../request-permissions.js';

/**
 * Custom hook to manage voice recording permissions.
 */
export function usePermissionsRequesting() {
    // State variables for storing recording permissions and loading state
    const [recorderPermissions, setRecorderPermissions] = useState<boolean | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<unknown | null>(null);  // State to store any potential errors

    // Initial request for permissions when the hook is used
    useEffect(() => {
        requestRecorderPermissions();
    }, []);

    // Function to request permissions and update the state accordingly
    const requestRecorderPermissions = async () => {
        setIsLoading(true);
        try {
            const permissionsStatus = await requestPermissions();
            setRecorderPermissions(permissionsStatus);
        } catch (err) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    }

    return { recorderPermissions, requestPermissions: requestRecorderPermissions, isLoading, error };
}
