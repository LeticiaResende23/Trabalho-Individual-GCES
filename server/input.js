function normalizeGameName(gameName) {
  try {
    return String(gameName || '').trim().toLowerCase();
  } catch (error) {
    return '';
  }
}

exports.normalizeGameName = normalizeGameName;
