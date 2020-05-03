const Categories = require('./categories.schema')
 
exports.findAll = (req, res, next) => {
 const q = req.query;
 const where  = {}
 if(q.name) where['name'] = q.name;
 Categories.find(where)
 .limit(req.query.limit || 0)
 .skip(req.query.skip || 0)
 .then(categories => {
    res.json(categories);
 })
 .catch(err => next(err));
}
 
exports.findById = (req, res, next) => {
 const id = req.params.id
 Categories.findById(id)
 .then(categories => {
    res.json(categories);
 })
 .catch(err => next(err));
}
 
exports.insert = (req, res, next) => {
 const data = req.body;
 Categories.create(data)
 .then(categories => {
    res.json({
      message: `New category added!`,
      data: categories
    });
 })
 .catch(err => next(err))
}
 
exports.updateById = (req, res, next) => {
 const id = req.params.id
 const data = req.body
 Categories.findByIdAndUpdate(id, data)
 .then(categories => {
    res.json({
      message: `category ${id} updated!`,
      data: categories
    });
 })
 .catch(err => next(err))
}
 
exports.remove = (req, res, next) => {
 Categories.remove()
 .then(categories => {
    res.json({
      message: 'All categories removed!',
      data: categories
    });
 })
 .catch(err => next(err))
}
 
exports.removeById = (req, res, next) => {
 const id = req.params.id
 Categories.findByIdAndRemove(id)
 .then(categories => {
    res.json({
      message: `category ${id} removed!`,
      data: categories
    });
 })
 .catch(err => next(err))
}
