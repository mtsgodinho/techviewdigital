
// Fix: Instead of relying on the 'vite/client' reference which may fail if the package is missing,
// we manually declare the necessary environment interfaces.

interface ImportMetaEnv {
  readonly [key: string]: any;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
