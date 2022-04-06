/* eslint-disable */
import Sirv from './Sirv';

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
      // $smv: Record<string, unknown>;
      $smv?: Record<Sirv>;
  }
}
