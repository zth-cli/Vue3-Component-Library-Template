import type { App, Plugin } from "vue";
import { each, get, set } from "lodash-es";
import {
  provideGlobalConfig,
  type ConfigProviderProps,
} from "@anan-ui/components";

export const INSTALLED_KEY = Symbol("INSTALLED_KEY");
/**
 * @description 构建一个安装器函数，用于批量安装插件
 * @param components 插件数组，每个插件是一个对象
 * @returns 返回一个安装函数，该函数可以被用于将所有插件安装到Vue应用中
 */
export default function makeInstaller(components: Plugin[]) {
  /**
   * @description 安装函数
   * @param app Vue应用实例
   * @param options 可选的配置参数，用于配置全局设置
   */
  const install = (app: App, options?: ConfigProviderProps) => {
    // 检查应用是否已经安装过插件，避免重复安装
    if (get(app, INSTALLED_KEY)) return;
    set(app, INSTALLED_KEY, true);
    // 遍历插件数组，逐个安装插件,全量引入
    each(components, (c) => {
      app.use(c);
    });
    // 如果有提供配置参数，则设置全局配置
    if (options) provideGlobalConfig(options, app, true);
  };

  return install;
}
