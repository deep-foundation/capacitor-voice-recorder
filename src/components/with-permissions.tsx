import { usePermissions } from "../main.js";

export function WithPermissions(options: WithPermissionsOptions) {
  const {deviceSupport,recorderPermissions,isLoading} = usePermissions();

  if('renderIfGranted' in options) {
    if(isLoading) {
      return options.rednerIfLoading();
    } else if (deviceSupport && recorderPermissions) {
      return options.renderIfGranted();
    } else {
      return options.renderIfNotGranted();
    }
  } else if('renderIfDeviceNotSupported' in options) {
    if(isLoading) {
      return options.rednerIfLoading();
    } else if (deviceSupport) {
      return options.renderIfDeviceNotSupported();
    } else {
      return options.renderIfPermissionsNotGranted();
    }
  }
}

export type WithPermissionsOptions =  ({
  renderIfGranted: () => JSX.Element;
  renderIfNotGranted: () => JSX.Element;
  rednerIfLoading: () => JSX.Element;
}) | ({
  renderIfDeviceNotSupported: () => JSX.Element;
  renderIfPermissionsNotGranted: () => JSX.Element;
  rednerIfLoading: () => JSX.Element;
})

