/**
 * Created by yeyangmei on 2016/12/19.
 */
export const ZERO = Symbol('zero');

const excludeArgumentValue = new Set([null, 0, '0', undefined, '']);
const SymbolToValueMap = {
  [ZERO]: 0,
};

function getRawValue(val) {
  if (Object.prototype.hasOwnProperty.call(SymbolToValueMap, val)) {
    return SymbolToValueMap[val];
  }
  return val;
}


export default (keys, paramObject) => (
  keys
    .filter(key => !excludeArgumentValue.has(paramObject[key]))
    .map(key => `${key}=${getRawValue(paramObject[key])}`)
    .join('&')
);
