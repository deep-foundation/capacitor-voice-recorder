import { useDeviceSupportStatus } from "../hooks/use-device-support-status.js";

export function WithDeviceSupport(options: IWithDeviceSupportOptions) {
  const { deviceSupport, isLoading } =
    useDeviceSupportStatus();

  if(isLoading) {
    return options.rednerIfLoading();
  } else if (deviceSupport) {
    return options.renderIfDeviceSupported();
  } else if (!deviceSupport) {
    return options.renderIfDeviceNotSupported();
  }
}

export type IWithDeviceSupportOptions = {
  renderIfDeviceSupported: () => JSX.Element;
  renderIfDeviceNotSupported: () => JSX.Element;
  rednerIfLoading: () => JSX.Element;
};
