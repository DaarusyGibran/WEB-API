// const chai  = require('chai');
// const chaiHttp = require('chai-http');
// const server = require('../bin/www');
// const expect = require('chai').expect;
 
// // Configure chai
// chai.use(chaiHttp);
// chai.should();

// describe("tags Endpoint", ()=> {
//  it("should be unauthorized to get all tags without token", (done) => {
//    chai.request(server)
//    .get('/api/tags')
//    .end((err, res) => {
//      res.should.have.status(401);
//      done();
//    });
//  });
//  // ID pada tags harus ID dari data yang sudah diinsert
//  it("should be unauthorized to get a certain tags without token", (done) => {
//   chai.request(server)
//   .get('/api/tags/5e53a1c8bb95e327dc085d1e')
//   .end((err, res) => {
//     res.should.have.status(401);
//     done();
//   });
// });
//  it("should be unauthorized to insert new tags without token", (done) => {
//    chai.request(server)
//    .post('/api/tags')
//    .end((err, res) => {
//      res.should.have.status(401);
//      done();
//    });
//  });
//  it("should be not found update tags without id", (done) => {
//    chai.request(server)
//    .put('/api/tags')
//    .end((err, res) => {
//      res.should.have.status(404);
//      done();
//    });
//  });
//  it("should be unauthorized to update tags without token", (done) => {
//   chai.request(server)
//   .put('/api/tags/5e53a1c8bb95e327dc085d1e')
//   .end((err, res) => {
//     res.should.have.status(401);
//     done();
//   });
// });
//  it("should be unauthorized to delete tags without token", (done) => {
//    chai.request(server)
//    .delete('/api/tags')
//    .end((err, res) => {
//      res.should.have.status(401);
//      done();
//    });
//  });
//  it("should be unauthorized to delete a certain tags without token", (done) => {
//   chai.request(server)
//   .delete('/api/tags/5e53a1c8bb95e327dc085d1e')
//   .end((err, res) => {
//     res.should.have.status(401);
//     done();
//   });
// });
// })

// let token;
// let edit;

// describe("Login", ()=> {
//  it("should return token", (done) => {
//    chai.request(server)
//    .get('/auth/login')
//    .auth('admin', 'admin')
//    .end((err, res) => {
//      expect(err).to.be.null;
//      res.should.have.status(200);
//      token = res.body.token;
//      done();
//    });
//  });
//  it("should get all tags", (done)=> {
//    chai.request(server)
//    .get('/api/tags')
//    .set('authorization',`Bearer ${token}`)
//    .end((err, res) => {
//      expect(err).to.be.null;
//      res.should.have.status(200);
//      done();
//    });
//  })
//  it("should get a certain tags", (done)=> {
//   chai.request(server)
//   .get('/api/tags/5e53a1c8bb95e327dc085d1e')
//   .set('authorization',`Bearer ${token}`)
//   .end((err, res) => {
//     expect(err).to.be.null;
//     res.should.have.status(200);
//     done();
//   });
// })
//  it("should insert new tags", (done)=> {
//    chai.request(server)
//    .post('/api/tags')
//    .set('authorization',`Bearer ${token}`)
//    .send({ name: 'Tes Delete' })
//    .end((err, res) => {
//      expect(err).to.be.null;
//      res.should.have.status(200);
//      console.log(res.body.data)
//      done();
//    });
//  })
//  it("should update a certain tags", (done)=> {
//   chai.request(server)
//   .put('/api/tags/5e5bc0c7165eec3ffcd70f79')
//   .set('authorization',`Bearer ${token}`)
//   // name diganti dari Adab Berpakaian menjadi Adab Tidur
//   .send({ name: 'Adab Tidur' })  
//   .end((err, res) => {
//     expect(err).to.be.null;
//     res.should.have.status(200);
//     console.log(res.body.data)
//     done();
//   });
// })
//  it("the certain tags should be updated", (done)=> {
//   chai.request(server)
//   .get('/api/tags/5e5bc0c7165eec3ffcd70f79')
//   .set('authorization',`Bearer ${token}`)
//   // name diganti dari Adab Berpakaian menjadi Adab Tidur
//   .end((err, res) => {
//     edit = res.body.name;    
//     expect(err).to.be.null;    
//     expect(edit).to.equal('Adab Tidur');    
//     res.should.have.status(200);
//     console.log(edit)
//     done();
//   });
// })
//  it("should delete a certain tags", (done)=> {
//   chai.request(server)
//   // Setiap delete data harus diganti dengan id data yang ada
//   // Bila tidak -> null -> karena data sudah terhapus    
//   .delete('/api/tags/5e5be294dc8b161744fa0dfb')
//   .set('authorization',`Bearer ${token}`)    
//   .end((err, res) => {
//     expect(err).to.be.null;
//     res.should.have.status(200);
//     console.log(res.body.data)
//     done();
//   });
// })
//  it("the certain tags should be deleted", (done)=> {
//   chai.request(server)
//   .delete('/api/tags/5e5be294dc8b161744fa0dfb')
//   .set('authorization',`Bearer ${token}`)    
//   .end((err, res) => {
//     expect(err).to.be.null;
//     res.should.have.status(200);
//     console.log(res.body.data)
//     done();
//   });
// })
// })