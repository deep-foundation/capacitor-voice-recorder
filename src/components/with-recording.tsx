import { IUseRecordingOptions, useRecording } from "../hooks/use-recording.js";

export function WithRecording(options: IWithRecordingOptions) {
  const { error } = useRecording(options);

  if ("render" in options) {
    return options.render({ error });
  } else {
    if (error) {
      if (options.renderIfError) {
        return options.renderIfError(error);
      } else {
        throw error;
      }
    }
  }
}

export type IWithRecordingOptions = IUseRecordingOptions &
  (
    | {
        renderChildren?: () => JSX.Element;
        renderIfError?: (error: unknown) => JSX.Element;
      }
    | {
        render: (options: { error: unknown }) => JSX.Element;
      }
  );
