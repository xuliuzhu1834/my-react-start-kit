/**
 * Created by brook on 2017/1/24.
 */

export const under2Camal = (obj) => {
  const str = JSON.stringify(obj)
    .replace(/"([^"]+)":/g, (_, catched) => (
      `"${catched.replace(/_+(.)/g, (__, letter) => letter.toUpperCase())}":`
      ),
    );
  return JSON.parse(str);
};
export const camel2Under = function camel2Under(target) {
  if (typeof target === 'string') {
    return target
      .replace(/([a-z])([A-Z])/g, (_, letter1, letter2) => `${letter1}_${letter2.toLowerCase()}`);
  } else if (target instanceof Array) {
    return target.map(item => camel2Under(item));
  } else if (typeof target === 'object' && target !== null) {
    const resultObj = {};
    Object.keys(target).forEach((key) => {
      const newkey = camel2Under(key);
      let value = target[key];
      if (typeof value === 'object' && !(value instanceof Array)) {
        value = camel2Under(target[key]);
      } else if (value instanceof Array && value.length > 0 && typeof value[0] !== 'string') {
        value = camel2Under(target[key]);
      }
      Object.assign(resultObj, {
        [newkey]: value,
      });
    });
    return resultObj;
  }
  return target;
};
