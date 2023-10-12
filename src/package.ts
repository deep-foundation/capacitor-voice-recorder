
import {
  Package as BasePackage,
  PackageOptions as BasePackageOptions,
} from '@deep-foundation/deeplinks/imports/package.js';

/**
Represents a deep package

@remarks
Contains name of the package and all the links as the objects with id method which returns the id of the link.

@example
#### Use name field to get the name of the package
```ts
const package = new Package({deep});
const {name: packageName} = package;
```
#### Use id method to get the id of the link
```ts
const package = new Package({deep});
const 125125251TypeLinkId = await package["125125251"].id();
const 2151251251TypeLinkId = await package["2151251251"].id();
const 2362532523TypeLinkId = await package["2362532523"].id();
const 83185195713TypeLinkId = await package["83185195713"].id();
const audioRecordsTypeLinkId = await package["AudioRecords"].id();
const recordTypeLinkId = await package["Record"].id();
const endTimeTypeLinkId = await package["EndTime"].id();
const startTimeTypeLinkId = await package["StartTime"].id();
const durationTypeLinkId = await package["Duration"].id();
const deviceSupportTypeLinkId = await package["DeviceSupport"].id();
const permissionsTypeLinkId = await package["Permissions"].id();
const soundDependencyTypeLinkId = await package["SoundDependency"].id();
const deviceDependencyTypeLinkId = await package["DeviceDependency"].id();
const 32423423423TypeLinkId = await package["32423423423"].id();
```

#### Use idLocal method to get the local id of the link
```ts
const package = new Package({deep});
await package.applyMinilinks();
const 125125251TypeLinkId = package["125125251"].idLocal();
const 2151251251TypeLinkId = package["2151251251"].idLocal();
const 2362532523TypeLinkId = package["2362532523"].idLocal();
const 83185195713TypeLinkId = package["83185195713"].idLocal();
const audioRecordsTypeLinkId = package["AudioRecords"].idLocal();
const recordTypeLinkId = package["Record"].idLocal();
const endTimeTypeLinkId = package["EndTime"].idLocal();
const startTimeTypeLinkId = package["StartTime"].idLocal();
const durationTypeLinkId = package["Duration"].idLocal();
const deviceSupportTypeLinkId = package["DeviceSupport"].idLocal();
const permissionsTypeLinkId = package["Permissions"].idLocal();
const soundDependencyTypeLinkId = package["SoundDependency"].idLocal();
const deviceDependencyTypeLinkId = package["DeviceDependency"].idLocal();
const 32423423423TypeLinkId = package["32423423423"].idLocal();
```
#### Use name field to get the name of the link
```ts
const package = new Package({deep});
const 125125251 = package["125125251"].name;
const 2151251251 = package["2151251251"].name;
const 2362532523 = package["2362532523"].name;
const 83185195713 = package["83185195713"].name;
const audioRecords = package["AudioRecords"].name;
const record = package["Record"].name;
const endTime = package["EndTime"].name;
const startTime = package["StartTime"].name;
const duration = package["Duration"].name;
const deviceSupport = package["DeviceSupport"].name;
const permissions = package["Permissions"].name;
const soundDependency = package["SoundDependency"].name;
const deviceDependency = package["DeviceDependency"].name;
const 32423423423 = package["32423423423"].name;
```
*/
export class Package extends BasePackage {

  constructor(param: PackageOptions) {
    super({
      ...param,
      name: '@deep-foundation/capacitor-voice-recorder',
    });
  }


      /**
      @example
      #### Use id method to get the id of the 125125251 link
      ```ts
      const package = new Package({deep});
      const 125125251TypeLinkId = await package["125125251"].id();
      ```
      #### Use localId method to get the local id of the 125125251 link
      ```ts
      const package = new Package({deep});
      const 125125251TypeLinkId = await package["125125251"].localId();
      ```
      #### Use name field to get the name of the 125125251 link
      ```ts
      const package = new Package({deep});
      const 125125251 = await package["125125251"].name;
      ```
      */
      public "125125251" = this.createEntity("125125251");
      /**
      @example
      #### Use id method to get the id of the 2151251251 link
      ```ts
      const package = new Package({deep});
      const 2151251251TypeLinkId = await package["2151251251"].id();
      ```
      #### Use localId method to get the local id of the 2151251251 link
      ```ts
      const package = new Package({deep});
      const 2151251251TypeLinkId = await package["2151251251"].localId();
      ```
      #### Use name field to get the name of the 2151251251 link
      ```ts
      const package = new Package({deep});
      const 2151251251 = await package["2151251251"].name;
      ```
      */
      public "2151251251" = this.createEntity("2151251251");
      /**
      @example
      #### Use id method to get the id of the 2362532523 link
      ```ts
      const package = new Package({deep});
      const 2362532523TypeLinkId = await package["2362532523"].id();
      ```
      #### Use localId method to get the local id of the 2362532523 link
      ```ts
      const package = new Package({deep});
      const 2362532523TypeLinkId = await package["2362532523"].localId();
      ```
      #### Use name field to get the name of the 2362532523 link
      ```ts
      const package = new Package({deep});
      const 2362532523 = await package["2362532523"].name;
      ```
      */
      public "2362532523" = this.createEntity("2362532523");
      /**
      @example
      #### Use id method to get the id of the 83185195713 link
      ```ts
      const package = new Package({deep});
      const 83185195713TypeLinkId = await package["83185195713"].id();
      ```
      #### Use localId method to get the local id of the 83185195713 link
      ```ts
      const package = new Package({deep});
      const 83185195713TypeLinkId = await package["83185195713"].localId();
      ```
      #### Use name field to get the name of the 83185195713 link
      ```ts
      const package = new Package({deep});
      const 83185195713 = await package["83185195713"].name;
      ```
      */
      public "83185195713" = this.createEntity("83185195713");
      /**
      @example
      #### Use id method to get the id of the AudioRecords link
      ```ts
      const package = new Package({deep});
      const audioRecordsTypeLinkId = await package["AudioRecords"].id();
      ```
      #### Use localId method to get the local id of the AudioRecords link
      ```ts
      const package = new Package({deep});
      const audioRecordsTypeLinkId = await package["AudioRecords"].localId();
      ```
      #### Use name field to get the name of the AudioRecords link
      ```ts
      const package = new Package({deep});
      const audioRecords = await package["AudioRecords"].name;
      ```
      */
      public "AudioRecords" = this.createEntity("AudioRecords");
      /**
      @example
      #### Use id method to get the id of the Record link
      ```ts
      const package = new Package({deep});
      const recordTypeLinkId = await package["Record"].id();
      ```
      #### Use localId method to get the local id of the Record link
      ```ts
      const package = new Package({deep});
      const recordTypeLinkId = await package["Record"].localId();
      ```
      #### Use name field to get the name of the Record link
      ```ts
      const package = new Package({deep});
      const record = await package["Record"].name;
      ```
      */
      public "Record" = this.createEntity("Record");
      /**
      @example
      #### Use id method to get the id of the EndTime link
      ```ts
      const package = new Package({deep});
      const endTimeTypeLinkId = await package["EndTime"].id();
      ```
      #### Use localId method to get the local id of the EndTime link
      ```ts
      const package = new Package({deep});
      const endTimeTypeLinkId = await package["EndTime"].localId();
      ```
      #### Use name field to get the name of the EndTime link
      ```ts
      const package = new Package({deep});
      const endTime = await package["EndTime"].name;
      ```
      */
      public "EndTime" = this.createEntity("EndTime");
      /**
      @example
      #### Use id method to get the id of the StartTime link
      ```ts
      const package = new Package({deep});
      const startTimeTypeLinkId = await package["StartTime"].id();
      ```
      #### Use localId method to get the local id of the StartTime link
      ```ts
      const package = new Package({deep});
      const startTimeTypeLinkId = await package["StartTime"].localId();
      ```
      #### Use name field to get the name of the StartTime link
      ```ts
      const package = new Package({deep});
      const startTime = await package["StartTime"].name;
      ```
      */
      public "StartTime" = this.createEntity("StartTime");
      /**
      @example
      #### Use id method to get the id of the Duration link
      ```ts
      const package = new Package({deep});
      const durationTypeLinkId = await package["Duration"].id();
      ```
      #### Use localId method to get the local id of the Duration link
      ```ts
      const package = new Package({deep});
      const durationTypeLinkId = await package["Duration"].localId();
      ```
      #### Use name field to get the name of the Duration link
      ```ts
      const package = new Package({deep});
      const duration = await package["Duration"].name;
      ```
      */
      public "Duration" = this.createEntity("Duration");
      /**
      @example
      #### Use id method to get the id of the DeviceSupport link
      ```ts
      const package = new Package({deep});
      const deviceSupportTypeLinkId = await package["DeviceSupport"].id();
      ```
      #### Use localId method to get the local id of the DeviceSupport link
      ```ts
      const package = new Package({deep});
      const deviceSupportTypeLinkId = await package["DeviceSupport"].localId();
      ```
      #### Use name field to get the name of the DeviceSupport link
      ```ts
      const package = new Package({deep});
      const deviceSupport = await package["DeviceSupport"].name;
      ```
      */
      public "DeviceSupport" = this.createEntity("DeviceSupport");
      /**
      @example
      #### Use id method to get the id of the Permissions link
      ```ts
      const package = new Package({deep});
      const permissionsTypeLinkId = await package["Permissions"].id();
      ```
      #### Use localId method to get the local id of the Permissions link
      ```ts
      const package = new Package({deep});
      const permissionsTypeLinkId = await package["Permissions"].localId();
      ```
      #### Use name field to get the name of the Permissions link
      ```ts
      const package = new Package({deep});
      const permissions = await package["Permissions"].name;
      ```
      */
      public "Permissions" = this.createEntity("Permissions");
      /**
      @example
      #### Use id method to get the id of the SoundDependency link
      ```ts
      const package = new Package({deep});
      const soundDependencyTypeLinkId = await package["SoundDependency"].id();
      ```
      #### Use localId method to get the local id of the SoundDependency link
      ```ts
      const package = new Package({deep});
      const soundDependencyTypeLinkId = await package["SoundDependency"].localId();
      ```
      #### Use name field to get the name of the SoundDependency link
      ```ts
      const package = new Package({deep});
      const soundDependency = await package["SoundDependency"].name;
      ```
      */
      public "SoundDependency" = this.createEntity("SoundDependency");
      /**
      @example
      #### Use id method to get the id of the DeviceDependency link
      ```ts
      const package = new Package({deep});
      const deviceDependencyTypeLinkId = await package["DeviceDependency"].id();
      ```
      #### Use localId method to get the local id of the DeviceDependency link
      ```ts
      const package = new Package({deep});
      const deviceDependencyTypeLinkId = await package["DeviceDependency"].localId();
      ```
      #### Use name field to get the name of the DeviceDependency link
      ```ts
      const package = new Package({deep});
      const deviceDependency = await package["DeviceDependency"].name;
      ```
      */
      public "DeviceDependency" = this.createEntity("DeviceDependency");
      /**
      @example
      #### Use id method to get the id of the 32423423423 link
      ```ts
      const package = new Package({deep});
      const 32423423423TypeLinkId = await package["32423423423"].id();
      ```
      #### Use localId method to get the local id of the 32423423423 link
      ```ts
      const package = new Package({deep});
      const 32423423423TypeLinkId = await package["32423423423"].localId();
      ```
      #### Use name field to get the name of the 32423423423 link
      ```ts
      const package = new Package({deep});
      const 32423423423 = await package["32423423423"].name;
      ```
      */
      public "32423423423" = this.createEntity("32423423423");

}

export type PackageOptions = Omit<BasePackageOptions, 'name'>;
