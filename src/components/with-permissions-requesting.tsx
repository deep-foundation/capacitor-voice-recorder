import { usePermissionsRequesting } from "../main";

export function WithPermissionsRequesting(options: IWithPermissionsRequestingOptions) {
  const {recorderPermissions,isLoading} = usePermissionsRequesting();

  if('renderIfGranted' in options) {
    if(isLoading) {
      return options.rednerIfLoading();
    } else if (recorderPermissions) {
      return options.renderIfGranted();
    } else {
      return options.renderIfNotGranted();
    }
  } else if('renderIfDeviceNotSupported' in options) {
    if(isLoading) {
      return options.rednerIfLoading();
    } else {
      return options.renderIfPermissionsNotGranted();
    }
  }
}

export type IWithPermissionsRequestingOptions =  ({
  renderIfGranted: () => JSX.Element;
  renderIfNotGranted: () => JSX.Element;
  rednerIfLoading: () => JSX.Element;
}) | ({
  renderIfDeviceNotSupported: () => JSX.Element;
  renderIfPermissionsNotGranted: () => JSX.Element;
  rednerIfLoading: () => JSX.Element;
})

