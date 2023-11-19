const config = {};

export function getConfig() {
  return config;
}

export function setConfig(newConfig) {
  Object.assign(config, newConfig);
}
