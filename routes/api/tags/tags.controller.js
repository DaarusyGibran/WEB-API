const Tags = require('./tags.schema')
 
exports.findAll = (req, res, next) => {
 const q = req.query;
 const where  = {}
 if(q.name) where['name'] = q.name;
 Tags.find(where)
 .limit(req.query.limit || 0)
 .skip(req.query.skip || 0)
 .then(tags => {
    res.json(tags);
 })
 .catch(err => next(err));
}
 
exports.findById = (req, res, next) => {
 const id = req.params.id
 Tags.findById(id)
 .then(tags => {
    res.json(tags);
 })
 .catch(err => next(err));
}
 
exports.insert = (req, res, next) => {
 const data = req.body;
 Tags.create(data)
 .then(tags => {
    res.json({
      message: `New tag added!`,
      data: tags
    });
 })
 .catch(err => next(err))
}
 
exports.updateById = (req, res, next) => {
 const id = req.params.id
 const data = req.body
 Tags.findByIdAndUpdate(id, data)
 .then(tags => {
    res.json({
      message: `Tag ${id} updated!`,
      data: tags
    });
 })
 .catch(err => next(err))
}
 
exports.remove = (req, res, next) => {
 Tags.remove()
 .then(tags => {
    res.json({
      message: 'All tags removed!',
      data: tags
    });
 })
 .catch(err => next(err))
}
 
exports.removeById = (req, res, next) => {
 const id = req.params.id
 Tags.findByIdAndRemove(id)
 .then(tags => {
    res.json({
      message: `Tag ${id} removed!`,
      data: tags
    });
 })
 .catch(err => next(err))
}
