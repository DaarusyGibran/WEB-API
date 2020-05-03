// KODE : 1 >> TANDA SEBELUM MENGGUNAKAN MONGOOSE
// let Roles = [{
//     id: 'admin',
//     name: 'Administrator'
//    }, {
//     id: 'guest',
//     name: 'Guest'
//    }]

// KODE : 2 >> TANDA SETELAH MENGGUNAKAN MONGOOSE
   const Roles = require('./roles.scheme')

   // KODE : 1
   // Untuk nenampilkan semua data dalam array
   // Method : GET
//    exports.findAll = (req, res, next) => {
//     const q = req.query;
//     let data = Roles;
    
//     if (q.id) data = Roles.filter(row => row.id == q.id)
//     if (q.name) data = Roles.filter(row =>  row.name == q.name)
    
//     res.json({ data });
//    }

    // KODE : 2
    exports.findAll = (req, res, next) => {
        const q = req.query;
        const where  = {}
        if(q.name) where['name'] = q.name;
        if(q.name_long) where['name_long'] = q.name_long;
        
        Roles.find(where)
        .limit(req.query.limit || 0)
        .skip(req.query.skip || 0)
        .then(roles => {
        res.json(roles);
        })
        .catch(err => next(err));
    }
   

   // KODE : 1
   // Untuk nenampilkan data based on id dalam array
   // Method : GET
//    exports.findById = (req, res, next) => {
//     const id = req.params.id
//     const data = Roles.filter( row =>  row.id == id);
//     res.json({ id, data })
//    }

    // KODE : 2
   exports.findById = (req, res, next) => {
    const id = req.params.id
    Roles.findById(id)
    .then(roles => {
       res.json(roles);
    })
    .catch(err => next(err));
   }
   

   // KODE : 1
   // Untuk menambah data dalam array
   // Method : POST
//    exports.insert = (req, res, next) => {
//     const data = req.body;
//     Roles.push(data);
//     res.json({ data: Roles});
//    }

   // KODE : 2
   exports.insert = (req, res, next) => {
    const data = req.body;
    Roles.create(data)
    .then(roles => {
       res.json({
         message: `New role added!`,
         data: roles
       });
    })
    .catch(err => next(err))
   }
   

   // KODE : 1
   // Untuk mengedit data dalam array
   // Method : PUT
//    exports.updateById = (req, res, next) => {
//     const id = req.params.id
//     let data = Roles;
//     const index = Roles.findIndex(row => row.id == id)
//     if (req.body.name) data[index].name = req.body.name;
//     res.json({ message: `${id} updated!`, data});
//    }

    // KODE : 2
   exports.updateById = (req, res, next) => {
    const id = req.params.id
    const data = req.body
    Roles.findByIdAndUpdate(id, data)
    .then(roles => {
       res.json({
         message: `Role ${id} updated!`,
         data: roles
       });
    })
    .catch(err => next(err))
   }
   
   
   // KODE : 1
   // Untuk mendelete data dalam array berdasar ID
   // Method : DELETE
//    exports.removeById = (req, res, next) => {
//     const id = req.params.id
//     const index  = Roles.findIndex(row => row.id == id)
//     Roles.splice(index, 1)
//     res.json({ message: `${id} deleted!`, data: Roles});
//    }

    // KODE : 2
   exports.removeById = (req, res, next) => {
    const id = req.params.id
    Roles.findByIdAndRemove(id)
    .then(roles => {
       res.json({
         message: `Role ${id} removed!`,
         data: roles
       });
    })
    .catch(err => next(err))
   }
   

   // KODE : 1
   // Untuk menghapus semua data dalam array
   // Method : DELETE
//    exports.remove = (req, res, next) => {
//     Roles = []
//     res.json({ message: `All Roles removed!`, data: Roles });
//    }

   // KODE : 2
   exports.remove = (req, res, next) => {
    Roles.remove()
    .then(roles => {
       res.json({
         message: 'All roles removed!',
         data: roles
       });
    })
    .catch(err => next(err))
   }

   exports.cekRolesId = (id) => {
      return Roles.findById(id)
   }
     