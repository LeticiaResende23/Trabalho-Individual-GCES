function normalizeGameName(gameName) {
  return String(gameName || '').trim().toLowerCase();
}

exports.normalizeGameName = normalizeGameName;
