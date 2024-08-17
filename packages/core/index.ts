import makeInstaller from "./makeInstaller";
import componens from "./components";

import "@anan-ui/theme/index.css";
// 全部引入
const installer = makeInstaller(componens);
export default installer;

// 导出所有组件, 用于单独引入
export * from "@anan-ui/components";
