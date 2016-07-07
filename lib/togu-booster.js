'use strict';

const Nightmare = require('nightmare');

const booster = (url) => {
  return new Nightmare({
    gotoTimeout: 30000,
    waitTimeout: 30000,
    x: Math.ceil(Math.random() * 1280),
    y: Math.ceil(Math.random() * 1024),
    show: true,
    webPreferences: {
      partition: Math.random() + ''
    } 
  })
    .goto(url)
    .wait(() => {
      if (document.querySelector('.preloader-mask').getAttribute('style').indexOf('none') > -1) {
        return true;
      }
    })
    .wait('[href="#day1_auditorium3"]')
    .click('[href="#day1_auditorium3"]')
    .wait('#day1_auditorium1_time20')
    .click('[href="iine?iine_id=20"]')
    .wait(() => {
      if (document.querySelector('.preloader-mask').getAttribute('style').indexOf('none') > -1) {
        return true;
      }
    })
    .end();
};

module.exports = (concurrency) => {
  return Promise.all(Array.prototype.map.call(new Buffer(concurrency), _ => {
    return booster(process.env.npm_config_target_url);
  })).then();
};
