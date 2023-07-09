import React, { useState, useEffect, useRef } from 'react';
import { DeepClient } from "@deep-foundation/deeplinks/imports/client";
import { Button, Card, CardBody, CardHeader, Heading, Stack, Text } from '@chakra-ui/react';
import { VoiceRecorder as CapacitorVoiceRecorder } from 'capacitor-voice-recorder';
import { useRecordingStatus } from '../hooks/use-recording-status';
import { useRecordingCycle } from '../hooks/use-recording-cycle';
import { useContainer } from '../hooks/use-container';
import { startRecording } from '../strart-recording';
import { stopRecording } from '../stop-recording';
import { downloadRecords } from '../download-records';

// React component for voice-recorder

export function VoiceRecorder({ deep }: { deep: DeepClient }) {
  const [recording, setRecording] = useState(false); // State variable to track recording status
  const [records, setRecords] = useState<any[]>([]); // State variable to store downloaded audio files

  const [arePermissionsGranted, setArePermissionsGranted] = useState<boolean | undefined>(undefined); // State variable to track audio recording permissions
  const [canDeviceRecord, setCanDeviceRecord] = useState<boolean | undefined>(undefined); // State variable to check if device can record

  useEffect(() => {
    new Promise(async () => {
      const { value: canDeviceRecord } = await CapacitorVoiceRecorder.canDeviceVoiceRecord(); // Check if device can record audio
      setCanDeviceRecord(canDeviceRecord);
    });
  }, []);

  const containerLinkId = useContainer(deep); // Custom hook to get container link ID
  const audioRecordingStatus = useRecordingStatus({}); // Custom hook to get audio recording status
  const sounds = useRecordingCycle({ deep, recording, containerLinkId, duration: 5000 }); // Custom hook to fire recording cycle

  const startTime = useRef(''); // Reference to store start time of recording

  return (
    <Stack>
      <Card>
        <CardHeader>
          <Heading>
            Ability to record
          </Heading>
        </CardHeader>
        <CardBody>
          <Text>{`Device is ${!canDeviceRecord ? 'not' : ''} able to record.`}</Text>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <Heading>
            Permissions
          </Heading>
        </CardHeader>
        <CardBody>
          <Text>{`Permissions are ${!arePermissionsGranted ? 'not' : ''} granted.`}</Text>
          <Button onClick={async () => {
            const { value: arePermissionsGranted } = await CapacitorVoiceRecorder.requestAudioRecordingPermission(); // Request audio recording permission
            setArePermissionsGranted(arePermissionsGranted);
          }}>
            Request permissions
          </Button>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <Heading>
            {`Audio Recording Status: ${audioRecordingStatus}`}
          </Heading>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <Heading>
            {`Container Link Id: ${containerLinkId}`}
          </Heading>
        </CardHeader>
      </Card>
      <Button onClick={async () => startTime.current = await startRecording()}>
        START RECORDING
      </Button>
      <Button onClick={async () => await stopRecording({ deep, containerLinkId, startTime: startTime.current })}>
        STOP RECORDING
      </Button>
      <Button onClick={() => setRecording(true)}>
        START RECORDING CYCLE
      </Button>
      <Button onClick={() => setRecording(false)}>
        STOP RECORDING CYCLE
      </Button>
      <Button onClick={async () => setRecords(await downloadRecords(deep))}>
        DOWNLOAD RECORDS
      </Button>
      {records?.map((r) => (
        <audio key={Math.random().toString()} controls src={`data:${r.mimetype};base64,${r.sound}`} />
      ))}
    </Stack>
  );
}