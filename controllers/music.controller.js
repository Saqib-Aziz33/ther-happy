const { MUSIC_PATH } = require("../utils/constants");

const getAll = async (req, res) => {
  try {
    res.json({ success: true, data: MUSIC_PATH });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

const temp = async (req, res) => {
  try {
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

module.exports = { getAll };
