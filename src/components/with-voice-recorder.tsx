import React, { ReactElement, useState, useEffect } from 'react';
import { DeepClient } from '@deep-foundation/deeplinks/imports/client.js';
import { 
    useContainer, 
    usePermissions, 
    useRecordingStatus, 
    useRecordingCycle,
    downloadRecords 
} from '../main.js'; 

export type WithVoiceRecorderProps = {
    deep: DeepClient;
    containerLinkId?: number;
    children: ReactElement;
};

export const WithVoiceRecorder: React.FC<WithVoiceRecorderProps> = ({ deep, containerLinkId: passedContainerLinkId, children }) => {
    const containerLinkIdFromHook = useContainer(deep);
    const [containerLinkId, setContainerLinkId] = useState<number>(passedContainerLinkId || containerLinkIdFromHook);
    const [recording, setRecording] = useState(false);
    const [records, setRecords] = useState<any[]>([]);

    useEffect(() => {
        setContainerLinkId(passedContainerLinkId || containerLinkIdFromHook);
    }, [deep, passedContainerLinkId, containerLinkIdFromHook]);

    const { recorderPermissions, deviceSupport, getPermissions } = usePermissions();
    const audioRecordingStatus = useRecordingStatus({});
    const sounds = useRecordingCycle({ deep, recording, containerLinkId, duration: 5000 });

    const startRecordingCycle = () => setRecording(true);
    const stopRecordingCycle = () => setRecording(false);
    const fetchRecords = async () => {
        const fetchedRecords = await downloadRecords(deep);
        setRecords(fetchedRecords);
    };

    const childWithProps = React.cloneElement(children, {
        recorderPermissions,
        deviceSupport,
        getPermissions,
        audioRecordingStatus,
        sounds,
        startRecordingCycle,
        stopRecordingCycle,
        fetchRecords,
        records,
        containerLinkId
    });

    return childWithProps;
};