module.exports = retry = (fn, times, interval) => {
  return new Promise((resolve, reject) => {
    fn().then(() => {
      if (times <= 1) {
        console.log('end');
        return;
      }
      setTimeout(() => {
        resolve(retry(fn, times - 1, interval));
      }, interval);
    });
  });
};
