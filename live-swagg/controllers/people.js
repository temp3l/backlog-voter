exports.getList = function(req, res, next) {
  res.send([
    { name: "step", id: 1 },
    { name: "step", id: 2 },
    { name: "step", id: 3 }
  ]);
};
