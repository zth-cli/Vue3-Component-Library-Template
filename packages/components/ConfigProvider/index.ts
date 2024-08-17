import ConfigProvider from "./ConfigProvider.vue";
import { withInstall } from "@anan-ui/utils";

export const AnConfigProvider = withInstall(ConfigProvider);

export * from "./types";
export * from "./hooks";
