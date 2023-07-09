[![npm](https://img.shields.io/npm/v/@deep-foundation/capacitor-voice-recorder.svg)](https://www.npmjs.com/package/@deep-foundation/capacitor-voice-recorder) 
[![Gitpod](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/deep-foundation/capacitor-voice-recorder) 
[![Discord](https://badgen.net/badge/icon/discord?icon=discord&label&color=purple)](https://discord.gg/deep-foundation)

Provides links&functions based on [`capacitor-voice-recorder`](https://www.npmjs.com/package/capacitor-voice-recorder). 

[**Documentation**](https://deep-foundation.github.io/capacitor-voice-recorder/) 

[**List of links**](https://deep-foundation.github.io/capacitor-voice-recorder/enums/LinkName.html)

## Device Object Value

The [`Device`] link can have object value.  
No one field is required. You can add any fields as you want.  Only the fields that are supported by this package will be represented as links   
[Supported fields can be found in the `DeviceInfo` interface](https://deep-foundation.github.io/capacitor-device/types/DeviceInfo.html)  
[Example of Device Object Value](https://deep-foundation.github.io/capacitor-device/types/DeviceInfo.html#md:device-info-example)

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

```js
const startTime = await Recorder.startRecording(); // Start recording audio and return the start time as a string.
```

```js 
const ispaused = await Recorder.pauseRecording();; // Pause the ongoing recording and return the playback status.
```

```js
const isresumed = await Recorder.resumeRecording(); // Resume the ongoing recording and return the playback status.
```

```js
// Stop the ongoing recording, upload the recorded sound, and return the recorded sound with info.
const { recordDataBase64, msDuration, mimeType } = await Recorder.stopRecording({
  deep, // The DeepClient object
  containerLinkId, // The ID of the container link
  startTime, // The start time of the recording returned by startRecording();
});
```

4. Download records from deep database:

```js
const records = downloadRecords(deep); // Download all existing records made by this recorder as IRecord[]

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

```js
const containerLinkId = useContainer(deep); // Custom hook to get existing or create a new container link ID.
```

```js
const audioRecordingStatus = useRecordingStatus({}); // Custom hook to get audio recording status
```

```js
const sounds = useRecordingCycle({ deep, recording, containerLinkId, duration: 5000 }); // Custom hook to fire the recording cycle
// recording cycle records audiochunks of a given duration and uploads them as a links structure inside deep database
```

## Contribution

Feel free to contribute. Please fork the repository and submit a pull request for any bugs, improvements, or features.

[`Recorder`]: https://deep-foundation.github.io/capacitor-device/enums/LinkName.html#Device