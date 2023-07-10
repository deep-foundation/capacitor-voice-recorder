[![npm](https://img.shields.io/npm/v/@deep-foundation/capacitor-voice-recorder.svg)](https://www.npmjs.com/package/@deep-foundation/capacitor-voice-recorder) 
[![Gitpod](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/deep-foundation/capacitor-voice-recorder) 
[![Discord](https://badgen.net/badge/icon/discord?icon=discord&label&color=purple)](https://discord.gg/deep-foundation)

Provides links&functions based on [`capacitor-voice-recorder`](https://www.npmjs.com/package/capacitor-voice-recorder). 

[**Documentation**](https://deep-foundation.github.io/capacitor-voice-recorder/) 

[**List of links**](https://deep-foundation.github.io/capacitor-voice-recorder/enums/LinkName.html)

## AudioRecords Container link

The [`AudioRecords`] link serves as a container for link structures representing records inside deep.  

## Prerequisitions
- Install this package in your deep by using npm-packager
- Provide permissions to this package

## Usage
1. Import the library into your TypeScript project:

```js
import Recorder, { createContainer } from "@deep-foundation/capacitor-voice-recorder";
```

2. Create container link of type "AudioRecords" to store Recorder data:

```js
const containerLinkId = await createContainer(deep:DeepClient)
```

You can also create it manually inside your deepcase client. Open Insert menu, search for and then insert "AudioRecords" type link.

3. Recording Audio:

Start recording audio and return the start time as a string.
```js
const startTime = await Recorder.startRecording(); 
```
Pause the ongoing recording and return the playback status.
```js 
const ispaused = await Recorder.pauseRecording();; 
```
Resume the ongoing recording and return the playback status.
```js
const isresumed = await Recorder.resumeRecording(); 
```
Stop the ongoing recording, upload the recorded sound, and return the recorded sound with info.
```js
const { recordDataBase64, msDuration, mimeType } = await Recorder.stopRecording({
  deep, // The DeepClient object
  containerLinkId, // The ID of the container link
  startTime, // The start time of the recording returned by startRecording();
});
```

4. Download records from deep database:

Download all existing records made by this recorder as array of IRecord records.
```js
const records = Recorder.downloadRecords(deep); 

export interface IRecord { 
  sound: string,
  mimetype: string,
  startTime: string,
  endTime: string,
  duration: number
}
```
## React Usage
1. Import VoiceRecorder react component or hooks:

```js
import { VoiceRecorder, useContainer, useRecordingCycle, useRecordingStatus } from "@deep-foundation/capacitor-voice-recorder";
```

2. Create VoiceRecorder component instance inside your deep app and pass a DeepClient instance.

```jsx
  <VoiceRecorder deep={deep} />
```

You will see basic ui with all package functionality.

3. Custom hooks can be used anywhere in your deep app:

useContainer hook to get existing or create a new container link ID.
```js
const containerLinkId = useContainer(deep);
```
useRecordingStatus hook to get audio recording status every second (by default).
```js
const audioRecordingStatus = useRecordingStatus({intervalInMs?}); 
```
useRecordingCycle hook to fire the recording cycle.
Recording cycle records audiochunks of a given duration and uploads them as a links structure inside deep database.
```js
const sounds = useRecordingCycle({ deep, recording, containerLinkId, duration: 5000 }); 
```

## Contribution

Feel free to contribute. Please fork the repository and submit a pull request for any bugs, improvements, or features.
