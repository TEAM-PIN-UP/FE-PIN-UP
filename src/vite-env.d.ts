/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NAVER_MAPS: string;
  readonly VITE_SERVER_ADDRESS: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
