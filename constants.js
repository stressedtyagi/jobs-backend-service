const EVENTS = {
  ON_CONNECTION: "connection",
  ON_SERVICE_POST_UPDATE: "post_update",
  CLIENT_POST_UPDATE: "update_client",
};

module.exports = {
  ROOMS: {
    0: "UPDATES",
    1: "CLIENT",
  },
  EVENTS: Object.freeze(EVENTS),
};
