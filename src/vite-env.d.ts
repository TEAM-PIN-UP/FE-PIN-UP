/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NAVER_MAPS: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
