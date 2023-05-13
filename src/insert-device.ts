import { DeepClient } from "@deep-foundation/deeplinks/imports/client";
import { DEVICE_PACKAGE_NAME } from "./package-name";
import { Link } from "@deep-foundation/deeplinks/imports/minilinks";
import { DeviceInfo } from "./device-info";



export async function insertDevice(param: InsertDeviceParam): Promise<InsertDeviceResult> {
  const {deep, info, containerLinkId} = param;
   const deviceTypeLinkId = await deep.id(DEVICE_PACKAGE_NAME, 'Device');
          const containTypeLinkId = await deep.id(
            '@deep-foundation/core',
            'Contain'
          );
          let {
            data: [deviceLink],
          } = await deep.insert(
            {
              type_id: deviceTypeLinkId,
              in: {
                data: [
                  {
                    type_id: containTypeLinkId,
                    from_id: containerLinkId,
                  },
                ],
              },
              object: {
                data: {
                  value: info
                }
              }
            },
            { returning: deep.selectReturning }
          );

          return {deviceLink} as InsertDeviceResult
}

export interface InsertDeviceParam {
  deep: DeepClient;
  info: DeviceInfo|undefined;
  containerLinkId: number;
}

export interface InsertDeviceResult {deviceLink: Link<number>}