export default function handler(req, res) {
  if (req.query.token !== 'kang' || !req.query.post) {
    return res.status(401).json({ message: 'Invalid Token' });
  }
  res.setPreviewData({});
  res.redirect(`/posts/${req.query.post}`);
}
