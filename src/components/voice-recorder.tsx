import React, { useState, useRef } from 'react';
import { DeepClient } from "@deep-foundation/deeplinks/imports/client.js";
import { Button, Card, CardBody, CardHeader, Heading, Stack, Text } from '@chakra-ui/react';
import { useRecordingStatus } from '../hooks/use-recording-status.js';
import { useRecordingCycle } from '../hooks/use-recording-cycle.js';
import { useContainer } from '../hooks/use-container.js';
import { startRecording } from '../strart-recording.js';
import { stopRecording } from '../stop-recording.js';
import { downloadRecords } from '../download-records.js';
import { usePermissions } from '../hooks/use-permissions.js';

/**
 * React component for using the voice recorder.
 * @param {DeepClient} deep - The DeepClient object instance.
 */
export function VoiceRecorder({ deep }: { deep: DeepClient }) {
  const [recording, setRecording] = useState(false); // State variable to track recording status
  const [records, setRecords] = useState<any[]>([]); // State variable to store downloaded audio files


  const { recorderPermissions, deviceSupport, getPermissions, getDeviceSupport } = usePermissions(); // Custom hook to get permissions
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
          <Text>{`Device is ${!deviceSupport ? 'not' : ''} able to record.`}</Text>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <Heading>
            Permissions
          </Heading>
        </CardHeader>
        <CardBody>
          <Text>{`Permissions are ${!recorderPermissions ? 'not' : ''} granted.`}</Text>
          <Button onClick={async () => await getPermissions()}>
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