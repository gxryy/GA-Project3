module.exports = (req, res, next) => {
    if (req.session.userId) {
      console.log(`logged in as ${req.session.username}`);
      next();
    } else {
      console.log(`not logged in`);
      res.status(403).json({ status: "error", message: "please login" });
    }
  };