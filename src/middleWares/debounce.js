/**
 * Created by brook on 2017/1/5.
 */
import debounce from 'lodash.debounce';
import mapValues from 'lodash.mapvalues';

/**
 * action: {
 *  meta: { debounce: string},
 *  cancel: {status: bool},
 *  value,
 *  type,
 * }
 */
const debounceMiddleware = (config = {}) => () => (next) => {
  const debouncers = mapValues(config, (option) => {
    if (typeof option === 'number') {
      return debounce(next, option);
    }

    const { wait = 0 } = option;

    return debounce(next, wait, option);
  });

  return (action) => {
    const { meta = {} } = action;
    const { cancel = { status: false } } = action;
    const debouncer = debouncers[meta.debounce];
    if (cancel.status) {
      return debouncer.cancel();
    }
    if (debouncer) {
      return debouncer(action);
    }
    return next(action);
  };
};

export default debounceMiddleware;

