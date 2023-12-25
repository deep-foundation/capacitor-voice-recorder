import { VoiceRecorder } from 'capacitor-voice-recorder';
import { emitter } from './emitter.js';

/**
 * Request recording permissions.
 */

export const requestPermissions = async () => {
  const { value: recorderPermissions } = await VoiceRecorder.requestAudioRecordingPermission();
  emitter.emit('permissionsChanged', recorderPermissions);
  return recorderPermissions as boolean;
};
