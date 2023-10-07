import { renderHook, act } from "@testing-library/react";
import { useRecording, IUseRecordingOptions } from "./use-recording.js";
import { startRecording } from "../start-recording.js"; // Adjust the path accordingly
import { stopAndUploadRecording } from "../stop-and-upload-recording.js";

// Mock the imported functions
jest.mock("../start-recording.js");
jest.mock("../stop-and-upload-recording.js");

(startRecording as jest.Mock).mockImplementation(jest.fn());
(stopAndUploadRecording as jest.Mock).mockImplementation(jest.fn());

describe("useRecording", () => {
  let options: IUseRecordingOptions;

  beforeEach(() => {
    options = {
      deep: {} as any, // mock the DeepClient
      savingIntervalInMs: 5000,
      // ... any other required options
    };
    jest.useFakeTimers();
    (startRecording as jest.Mock).mockClear();
    (stopAndUploadRecording as jest.Mock).mockClear();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should initiate recording on mount", () => {
    renderHook(() => useRecording(options));

    expect(startRecording).toHaveBeenCalledTimes(1);
  });

  it("should stop and upload recording at the specified interval", () => {
    renderHook(() => useRecording(options));

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(stopAndUploadRecording).toHaveBeenCalledTimes(1);
  });

  it("should handle errors from startRecording correctly", () => {
    (startRecording as jest.Mock).mockRejectedValue(new Error("Test Error"));

    const { result } = renderHook(() => useRecording(options));

    expect(result.current.error).toEqual(new Error("Test Error"));
  });

  it("should handle errors from stopAndUploadRecording correctly", () => {
    (stopAndUploadRecording as jest.Mock).mockRejectedValue(new Error("Upload Error"));

    renderHook(() => useRecording(options));

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    // Adjust as per your hook's error handling logic
    expect(stopAndUploadRecording).toHaveBeenCalledTimes(1);
  });

  it("should cleanup recording on unmount", () => {
    const { unmount } = renderHook(() => useRecording(options));

    unmount();

    expect(stopAndUploadRecording).toHaveBeenCalledTimes(1);
    // You might also want to check if clearTimeout was called, but since it's a built-in function, you might need some setup for it.
  });
});
