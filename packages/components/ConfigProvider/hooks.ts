import { ref, getCurrentInstance, inject, computed, provide, unref } from "vue";
import type { MaybeRef, Ref, App } from "vue";
import {
  configProviderContextKey,
  type ConfigProviderContext,
} from "./constants";
import { merge } from "lodash-es";
import { debugWarn } from "@anan-ui/utils";

const globalConfig = ref<ConfigProviderContext>();

export function useGlobalConfig<
  K extends keyof ConfigProviderContext,
  D extends ConfigProviderContext[K]
>(key: K, defaultVal?: D): Ref<Exclude<ConfigProviderContext[K], void>>;
export function useGlobalConfig(): Ref<ConfigProviderContext>;
export function useGlobalConfig(
  key?: keyof ConfigProviderContext,
  defaultVal = void 0
) {
  const config = getCurrentInstance()
    ? inject(configProviderContextKey, globalConfig)
    : globalConfig;

  return key ? computed(() => config.value?.[key] ?? defaultVal) : config;
}

export function provideGlobalConfig(
  config: MaybeRef<ConfigProviderContext>,
  app?: App,
  global = false
) {
  const instance = getCurrentInstance();
  const oldConfig = instance ? useGlobalConfig() : void 0;
  const provideFn = app?.provide ?? (instance ? provide : void 0);

  if (!provideFn) {
    debugWarn(
      "provideGlobalConfig",
      "provideGlobalConfig() can only be used inside setup()"
    );
    return;
  }
  const context = computed(() => {
    const cfg = unref(config);
    if (!oldConfig?.value) return cfg;
    return merge(oldConfig.value, cfg);
  });

  provideFn(configProviderContextKey, context);

  if (global || !globalConfig.value) globalConfig.value = context.value;

  return context;
}
