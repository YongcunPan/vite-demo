import init from "react-intl-universal";

export function t(id, opts = {}) {
  return init.get(id, opts);
}
