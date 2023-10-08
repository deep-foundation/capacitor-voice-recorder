import { useEffect, useState, useRef } from "react";
import { getPermissionsStatus } from "../get-permissions-status";
import { usePermissionsStatus } from "../hooks/use-permissions-status";

export function WithPermissionsStatus(options: IWithPermissionsStatusOptions) {
  const {error,permissionsStatus,isLoading} = usePermissionsStatus()

  if(isLoading) {
    return options.rednerIfLoading();
  } else if (permissionsStatus) {
    return options.renderIfPermissionsGranted();
  } else if (!permissionsStatus) {
    return options.renderIfPermissionsNotGranted();
  }
}

export type IWithPermissionsStatusOptions = {
  renderIfPermissionsGranted: () => JSX.Element;
  renderIfPermissionsNotGranted: () => JSX.Element;
  rednerIfLoading: () => JSX.Element;
}
