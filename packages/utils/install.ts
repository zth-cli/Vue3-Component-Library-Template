import type { App, Plugin, Directive } from "vue";
import { noop } from "lodash-es";

type SFCWithInstall<T> = T & Plugin;

/**
 * 创建一个带有安装功能的组件
 *
 * 此函数接受一个组件，并返回一个新的组件，该组件具有安装功能，可以轻松地将其安装到Vue应用程序中
 * 这样做可以简化组件的使用，用户只需调用`app.use`即可全局注册组件，而无需手动注册
 *
 * @param component 要包装的组件，可以是任何Vue组件
 * @returns 返回带有安装功能的组件，类型与输入组件相同
 */
export const withInstall = <T>(component: T) => {
  (component as SFCWithInstall<T>).install = (app: App) => {
    // 获取组件名称，如果组件没有名称，则默认为"UnnamedComponent"
    const name = (component as any)?.name || "UnnamedComponent";
    // 在Vue应用中注册组件
    app.component(name, component as SFCWithInstall<T>);
  };
  // 返回带有install方法的组件
  return component as SFCWithInstall<T>;
};

export const withInstallFunction = <T>(fn: T, name: string) => {
  (fn as SFCWithInstall<T>).install = (app: App) => {
    app.config.globalProperties[name] = fn;
  };
  return fn as SFCWithInstall<T>;
};

export const withInstallDirective = <T extends Directive>(
  directive: T,
  name: string
): SFCWithInstall<T> => {
  (directive as SFCWithInstall<T>).install = (app: App) => {
    app.directive(name, directive);
  };
  return directive as SFCWithInstall<T>;
};

/**
 * 为组件添加一个空操作安装方法
 *
 * 此函数的目的是为了解决在不实际安装组件的情况下，给组件添加 install 方法的需求
 * 这在一些情况下非常有用，比如在组件库中，你可能不想让终端用户直接使用这个组件，而是通过某种安装机制
 * 但是同时也需要提供一个默认的无操作（noop）安装方法以保持接口的一致性
 *
 * @param component 要处理的组件
 * @returns 返回带有 install 方法的组件，install 方法当前被设置为一个空操作函数
 */
export const withNoopInstall = <T>(component: T) => {
  // 将组件的 install 方法设置为空操作，确保它有一个 install 方法但不执行任何操作
  (component as SFCWithInstall<T>).install = noop;
  // 返回带有空操作 install 方法的组件
  return component as SFCWithInstall<T>;
};
