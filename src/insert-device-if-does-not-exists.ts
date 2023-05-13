import { useEffect } from 'react';
import { insertDevice } from './insert-device';
import { DeepClient } from '@deep-foundation/deeplinks/imports/client';
import { DeviceInfo } from './device-info';

export async function insertDeviceIfDoesNotExist(param: {
  deep: DeepClient;
  deviceLinkId: number;
  info: DeviceInfo|undefined;
  onInit: (deviceLinkId: number | undefined) => void;
  containerLinkId: number;
}) {
  const {
    deep,
    deviceLinkId,
    onInit,
    info,
    containerLinkId,
  } = param;

  if (deviceLinkId) {
    const { data: deviceLinks } = await deep.select(deviceLinkId);
    if (deviceLinks.length === 0) {
      onInit(undefined);
      return { deviceLinkId: undefined };
    }
  } else {
    const { deviceLink } = await insertDevice({
      deep,
      info,
      containerLinkId,
    });
    onInit(deviceLink.id);
    return { deviceLinkId: deviceLink.id };
  }
}
