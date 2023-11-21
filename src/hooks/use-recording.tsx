import { useEffect, useRef, useState } from "react";
import { DeepClient } from "@deep-foundation/deeplinks/imports/client.js";
import { startRecording } from "../start-recording.js";
import {
  IStopAndUploadRecordingOptions,
  stopAndUploadRecording,
} from "../stop-and-upload-recording.js";
import { packageLog } from "../package-log.js";
import { getCurrentStatus } from "../get-current-status.js";
import { useReducer } from 'react';

export type IUseRecordingOptions = {
  deep: DeepClient;
  savingIntervalInMs?: number;
} & IStopAndUploadRecordingOptions;


type State = {
  isRecording: boolean;
  uploadInterval: number | null;
}

type Action =
  | { type: 'START_RECORDING' }
  | { type: 'STOP_AND_UPLOAD_RECORDING', uploadInterval: number };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'START_RECORDING':
      return { ...state, isRecording: true };
    case 'STOP_AND_UPLOAD_RECORDING':
      return { ...state, uploadInterval: action.uploadInterval };
    default:
      throw new Error();
  }
}

export function useRecording(options: IUseRecordingOptions) {
  const {deep,containerLinkId,savingIntervalInMs} = options
  const [state, dispatch] = useReducer(reducer, {
    isRecording: false,
    uploadInterval: null
  });

  useEffect(() => {
    async function startAndUploadRecording() {
      try {
        await startRecording();
        console.log("Recording started");
        dispatch({ type: 'START_RECORDING' });
      } catch (error) {
        console.error('Error starting recording:', error);
      }
    }

    startAndUploadRecording();
  }, []);

  useEffect(() => {
    if (state.isRecording) {
      const intervalId = setInterval(async () => {
        try {
          await stopAndUploadRecording({deep, containerLinkId});
          console.log('Recording uploaded');
        } catch (error) {
          console.error('Error uploading recording:', error);
        }
      }, savingIntervalInMs);

      return () => clearInterval(intervalId);
    }
  }, [state.isRecording, savingIntervalInMs]);

}