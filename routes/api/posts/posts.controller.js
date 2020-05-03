const Posts = require('./posts.schema')
 
exports.findAll = (req, res, next) => {
 const q = req.query;
 const where  = {}
 if(q.title) where['title'] = q.title;
 Posts.find(where)
 .limit(req.query.limit || 0)
 .skip(req.query.skip || 0)
 .populate('createdBy')
 .populate('updatedBy')
 .populate('tags')
 .populate('category')
 .then(posts => {
    res.json(posts);
 })
 .catch(err => next(err));
}
 
exports.findById = (req, res, next) => {
 const id = req.params.id
 Posts.findById(id)
 .populate('createdBy')
 .populate('updatedBy')
 .populate('tags')
 .populate('category')
 .then(posts => {
    res.json(posts);
 })
 .catch(err => next(err));
}
 
exports.insert = (req, res, next) => {
 let data = req.body;
 if (req.user) data.createdBy = req.user;
 Posts.create(data)
 .then(posts => {
    res.json({
      message: `New post added!`,
      data: posts
    });
 })
 .catch(err => next(err))
}
 
exports.updateById = (req, res, next) => {
 const id = req.params.id
 let data = req.body
 if (req.user) data.updatedBy = req.user;
 Posts.findByIdAndUpdate(id, data)
 .then(posts => {
    res.json({
      message: `post ${id} updated!`,
      data: posts
    });
 })
 .catch(err => next(err))
}
 
exports.remove = (req, res, next) => {
 Posts.remove()
 .then(posts => {
    res.json({
      message: 'All posts removed!',
      data: posts
    });
 })
 .catch(err => next(err))
}
 
exports.removeById = (req, res, next) => {
 const id = req.params.id
 Posts.findByIdAndRemove(id)
 .then(posts => {
    res.json({
      message: `post ${id} removed!`,
      data: posts
    });
 })
 .catch(err => next(err))
}
