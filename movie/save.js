const loadPost = require('../loadPostBody');
const movie = require('./main');

module.exports = function (req, res, url) {
	if (req.method != 'POST' || url.path != '/goapi/saveMovie/') return;
	loadPost(req, res).then(data => {
		if (data.is_triggered_by_autosave && data.noAutosave) return res.end('0');

		var body = Buffer.from(data.body_zip, 'base64');
		var thumb = data.thumbnail_large &&
			Buffer.from(data.thumbnail_large, 'base64');
		movie.save(body, thumb, data.movieId, data.presaveId).then(nId => res.end('0' + nId));
	});
	return true;
}