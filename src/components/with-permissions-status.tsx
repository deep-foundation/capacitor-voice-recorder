import { useEffect, useState, useRef } from "react";
import { getPermissionsStatus } from "../get-permissions-status.js";
import { usePermissionsStatus } from "../hooks/use-permissions-status.js";

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
