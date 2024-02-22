const temp = async (req, res) => {
  try {
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

module.exports = {};
