import { BatteryInfo, GetLanguageCodeResult, LanguageTag, DeviceInfo as DeviceGeneralInfo } from "@capacitor/device";

export type DeviceInfo =
  | DeviceGeneralInfo
  | BatteryInfo
  | { languageCode: GetLanguageCodeResult['value'] }
  | { languageTag: LanguageTag['value'] };