import { useState, useEffect } from "react";
import { VoiceRecorder as CapacitorVoiceRecorder } from 'capacitor-voice-recorder';
import { getAudioRecordingPermissions, getDeviceRecordAbility } from "../get-permissions.js";

// Custom hook to check for device support and manage camera permissions.
 
export const usePermissions = () => {
	// State variables for storing camera permissions and device recording support.
	const [recorderPermissions, setCameraPermissions] = useState<boolean | undefined>(undefined);
	const [deviceSupport, setDeviceSupport] = useState<boolean | undefined>(undefined);

	useEffect(() => {
		getDeviceSupport();
		getPermissions();
	}, []);
	
	const getDeviceSupport = async () => {
		// Request ability to record from the device
		const newDeviceSupport  = await getDeviceRecordAbility();
		setDeviceSupport(newDeviceSupport); // Set the device support state.
	}
	const getPermissions = async () => {
		// Request audio recording permission
		const newRecorderPermissions = await getAudioRecordingPermissions();
		setCameraPermissions(newRecorderPermissions); // Set the recorder permissions state.
	}
	return {recorderPermissions, deviceSupport, getPermissions, getDeviceSupport}
}