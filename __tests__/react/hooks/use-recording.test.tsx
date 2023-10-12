import { renderHook, act } from "@testing-library/react";
import { IUseRecordingOptions } from "../../../src/hooks/use-recording.js";
import { useRecording } from "../../../src/main.js";
import { startRecording } from "../../../src/start-recording.js";
import { stopAndUploadRecording } from "../../../src/stop-and-upload-recording.js";

jest.mock("../../../src/start-recording.js");
jest.mock("../../../src/stop-and-upload-recording.js");

(startRecording as jest.Mock).mockImplementation(jest.fn());
(stopAndUploadRecording as jest.Mock).mockImplementation(jest.fn());

describe("useRecording", () => {
  let options: IUseRecordingOptions;

  beforeEach(() => {
    options = {
      deep: {} as any,
      savingIntervalInMs: 5000,
    };
    jest.useFakeTimers();
    (startRecording as jest.Mock).mockClear();
    (stopAndUploadRecording as jest.Mock).mockClear();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  const waitForNextTick = () => new Promise(resolve => setTimeout(resolve, 0));

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

  it("should handle errors from startRecording correctly", async () => {
    (startRecording as jest.Mock).mockRejectedValue(new Error("Test Error"));
    const { result } = renderHook(() => useRecording(options));

    await act(async () => {
      await waitForNextTick(); 
    });

    expect(result.current.error).toEqual(new Error("Test Error"));
  });

  it("should handle errors from stopAndUploadRecording correctly", async () => {
    (stopAndUploadRecording as jest.Mock).mockRejectedValue(new Error("Upload Error"));
    renderHook(() => useRecording(options));

    await act(async () => {
      jest.advanceTimersByTime(5000);
      await waitForNextTick();
    });

    expect(stopAndUploadRecording).toHaveBeenCalledTimes(1);
    // Add additional assertions if necessary, e.g., expect(result.current.error).toEqual(new Error("Upload Error"));
  });

  it("should cleanup recording on unmount", () => {
    const { unmount } = renderHook(() => useRecording(options));
    
    act(() => {
      unmount();
    });
    
    expect(stopAndUploadRecording).toHaveBeenCalledTimes(1);
  });
  
});
