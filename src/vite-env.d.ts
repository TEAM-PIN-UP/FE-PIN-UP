/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_URI: string;
  readonly VITE_NAVER_MAPS: string;
  readonly VITE_SERVER_ADDRESS: string;
  readonly VITE_GOOGLE_AUTH_CLIENT_ID: string;
  readonly VITE_NAVER_AUTH_CLIENT_ID: string;

  readonly VITE_CS_ASK: string;
  readonly VITE_CS_REQUEST: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
