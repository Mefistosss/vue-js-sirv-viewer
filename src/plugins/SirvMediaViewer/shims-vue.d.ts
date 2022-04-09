/* eslint-disable */
import SMV from './types/SMV';
import Vue, { VNode } from 'vue';
export {};

declare global {
  interface Window {
      Sirv: typeof SMV,
      Vue: Vue
  }
}
// let Sirv = window.Sirv;

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
      $smv?: Record<SMV>;
  }
}

// declare module '*.vue' {
//   import type { DefineComponent } from 'vue'
//   const component: DefineComponent<{}, {}, any>
//   export default component
// }
