import {
  DeepClient,
  SerialOperation,
} from '@deep-foundation/deeplinks/imports/client';
import { Link } from '@deep-foundation/deeplinks/imports/minilinks';
import { createSerialOperation } from '@deep-foundation/deeplinks/imports/gql';
import {
  MutationInputValue,
} from '@deep-foundation/deeplinks/imports/client_types';
import { DeviceInfo } from './device-info';
import { getAllDeviceInfo } from './get-all-device-info';

export async function saveDeviceInfo(param: GetDeviceParam) {
  const { deep, info: data } = param;

  const deviceLink = await getDeviceLink();

  const value = await getValue({
    deviceLink,
    data,
  });

  const serialOperations = await getSerialOperations({
    deviceLink,
    value,
  });

  await deep.serial({
    operations: serialOperations,
  });

  async function getDeviceLink() {
    let deviceLink: Link<number>;

    if ('deviceLinkId' in param) {
      if (!param.deviceLinkId) {
        throw new Error(`deviceLinkId is undefined`);
      }
      const { data } = await deep.select({
        id: param.deviceLinkId,
      });
      deviceLink = data[0];
    } else if ('deviceLink' in param) {
      if (!param.deviceLink) {
        throw new Error(`deviceLink is undefined`);
      }
      deviceLink = param.deviceLink;
    } else {
      throw new Error(`Either deviceLink or deviceLinkId must be passed`);
    }

    return deviceLink;
  }

  async function getValueInsertSerialOperation({
    deviceLink,
    value,
  }: {
    deviceLink: Link<number>;
    value: MutationInputValue<object>['value'];
  }) {
    return createSerialOperation({
      table: 'objects',
      type: 'insert',
      objects: {
        link_id: deviceLink.id,
        value: value,
      },
    });
  }

  async function getValueUpdateSerialOperation({
    deviceLink,
    value,
  }: {
    deviceLink: Link<number>;
    value: MutationInputValue<object>['value'];
  }) {
    return createSerialOperation({
      table: 'objects',
      type: 'update',
      exp: {
        link_id: deviceLink.id,
      },
      value: {
        value: value,
      },
    });
  }

  async function getValue({
    deviceLink,
    data,
  }: {
    deviceLink: Link<number>;
    data: DeviceInfo | undefined;
  }) {
    return {
      ...(deviceLink.value?.value ?? {}),
      ...(data ?? (await getAllDeviceInfo())),
    } as MutationInputValue<object>['value'];
  }

  async function getSerialOperations({
    deviceLink,
    value,
  }: {
    deviceLink: Link<number>;
    value: MutationInputValue<object>['value'];
  }) {
    let serialOperations: Array<SerialOperation> = [];
    if (!deviceLink.value) {
      serialOperations.push(
        await getValueUpdateSerialOperation({
          deviceLink,
          value,
        })
      );
    } else {
      serialOperations.push(
        await getValueInsertSerialOperation({
          deviceLink,
          value,
        })
      );
    }
    return serialOperations;
  }
}

export type GetDeviceParam = { deep: DeepClient; info?: DeviceInfo } & (
  | { deviceLinkId: number }
  | { deviceLink: Link<number> }
);