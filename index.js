const boost = require('./lib/togu-booster');
const retry = require('./lib/retry');

retry(() => {
  return boost(process.env.npm_config_concurrency || 1).then();
}, process.env.npm_config_times || 1, process.env.npm_config_interval || 1000).catch(e => {
  console.error(e.stack);
});
