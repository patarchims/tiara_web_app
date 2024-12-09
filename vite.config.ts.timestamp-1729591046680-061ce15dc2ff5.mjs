// vite.config.ts
import { sentryVitePlugin } from "file:///C:/Users/HP-PC/Code/Work/react/rme/node_modules/@sentry/vite-plugin/dist/esm/index.mjs";
import path from "path";
import react from "file:///C:/Users/HP-PC/Code/Work/react/rme/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { defineConfig } from "file:///C:/Users/HP-PC/Code/Work/react/rme/node_modules/vite/dist/node/index.js";
import { TanStackRouterVite } from "file:///C:/Users/HP-PC/Code/Work/react/rme/node_modules/@tanstack/router-plugin/dist/esm/vite.js";
var __vite_injected_original_dirname = "C:\\Users\\HP-PC\\Code\\Work\\react\\rme";
var vite_config_default = defineConfig({
  plugins: [TanStackRouterVite(), react(), sentryVitePlugin({
    org: "vincent-core",
    project: "rme"
  })],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  build: {
    sourcemap: true
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxIUC1QQ1xcXFxDb2RlXFxcXFdvcmtcXFxccmVhY3RcXFxccm1lXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxIUC1QQ1xcXFxDb2RlXFxcXFdvcmtcXFxccmVhY3RcXFxccm1lXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9IUC1QQy9Db2RlL1dvcmsvcmVhY3Qvcm1lL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgc2VudHJ5Vml0ZVBsdWdpbiB9IGZyb20gXCJAc2VudHJ5L3ZpdGUtcGx1Z2luXCI7XHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHsgVGFuU3RhY2tSb3V0ZXJWaXRlIH0gZnJvbSAnQHRhbnN0YWNrL3JvdXRlci1wbHVnaW4vdml0ZSdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW1RhblN0YWNrUm91dGVyVml0ZSgpLCByZWFjdCgpLCBzZW50cnlWaXRlUGx1Z2luKHtcclxuICAgIG9yZzogXCJ2aW5jZW50LWNvcmVcIixcclxuICAgIHByb2plY3Q6IFwicm1lXCJcclxuICB9KV0sXHJcblxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgICdAJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjJyksXHJcbiAgICB9LFxyXG4gIH0sXHJcblxyXG4gIGJ1aWxkOiB7XHJcbiAgICBzb3VyY2VtYXA6IHRydWVcclxuICB9XHJcbn0pIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFzUyxTQUFTLHdCQUF3QjtBQUN2VSxPQUFPLFVBQVU7QUFDakIsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsb0JBQW9CO0FBQzdCLFNBQVMsMEJBQTBCO0FBSm5DLElBQU0sbUNBQW1DO0FBTXpDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxtQkFBbUIsR0FBRyxNQUFNLEdBQUcsaUJBQWlCO0FBQUEsSUFDeEQsS0FBSztBQUFBLElBQ0wsU0FBUztBQUFBLEVBQ1gsQ0FBQyxDQUFDO0FBQUEsRUFFRixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsSUFDdEM7QUFBQSxFQUNGO0FBQUEsRUFFQSxPQUFPO0FBQUEsSUFDTCxXQUFXO0FBQUEsRUFDYjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
