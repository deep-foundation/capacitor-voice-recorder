import { BatteryInfo, GetLanguageCodeResult, LanguageTag , DeviceInfo as DeviceGeneralInfo} from "@capacitor/device";

export type AllDeviceInfo = DeviceGeneralInfo &
BatteryInfo & { languageCode: GetLanguageCodeResult['value'] } & {
  languageTag: LanguageTag['value'];
};