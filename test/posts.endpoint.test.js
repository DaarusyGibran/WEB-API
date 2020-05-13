const chai  = require('chai');
const chaiHttp = require('chai-http');
const server = require('../bin/www');
const expect = require('chai').expect;
 
// Configure chai
chai.use(chaiHttp);
chai.should();

describe("posts Endpoint", ()=> {
 it("should be unauthorized to get all posts without token", (done) => {
   chai.request(server)
   .get('/api/posts')
   .end((err, res) => {
     res.should.have.status(401);
     done();
   });
 });
 // ID pada posts harus ID dari data yang sudah diinsert
 it("should be unauthorized to get a certain posts without token", (done) => {
  chai.request(server)
  .get('/api/posts/5e53a1c8bb95e327dc085d1e')
  .end((err, res) => {
    res.should.have.status(401);
    done();
  });
});
 it("should be unauthorized to insert new posts without token", (done) => {
   chai.request(server)
   .post('/api/posts')
   .end((err, res) => {
     res.should.have.status(401);
     done();
   });
 });
 it("should be not found update posts without id", (done) => {
   chai.request(server)
   .put('/api/posts')
   .end((err, res) => {
     res.should.have.status(404);
     done();
   });
 });
 it("should be unauthorized to update posts without token", (done) => {
  chai.request(server)
  .put('/api/posts/5e53a1c8bb95e327dc085d1e')
  .end((err, res) => {
    res.should.have.status(401);
    done();
  });
});
 it("should be unauthorized to delete posts without token", (done) => {
   chai.request(server)
   .delete('/api/posts')
   .end((err, res) => {
     res.should.have.status(401);
     done();
   });
 });
 it("should be unauthorized to delete a certain posts without token", (done) => {
  chai.request(server)
  .delete('/api/posts/5e53a1c8bb95e327dc085d1e')
  .end((err, res) => {
    res.should.have.status(401);
    done();
  });
});
})

let token;
let edit;

describe("Login", ()=> {
 it("should return token", (done) => {
   chai.request(server)
   .get('/auth/login')
   .auth('admin', 'admin')
   .end((err, res) => {
     expect(err).to.be.null;
     res.should.have.status(200);
     token = res.body.token;
     done();
   });
 });
 it("should get all posts", (done)=> {
   chai.request(server)
   .get('/api/posts')
   .set('authorization',`Bearer ${token}`)
   .end((err, res) => {
     expect(err).to.be.null;
     res.should.have.status(200);
     done();
   });
 })
 it("should get a certain posts", (done)=> {
  chai.request(server)
  .get('/api/posts/5e53a1c8bb95e327dc085d1e')
  .set('authorization',`Bearer ${token}`)
  .end((err, res) => {
    expect(err).to.be.null;
    res.should.have.status(200);
    done();
  });
})
 it("should insert new posts", (done)=> {
   chai.request(server)
   .post('/api/posts')
   .set('authorization',`Bearer ${token}`)
   .send({ title: 'Tes Delete', description: '#Fiqih Sholat', 
   isDraft: 'true', isPublished: 'true', category: '5e5bc37d5fc3cf27e0019a70', 
   tags: '5e5bbf10fd549339300e3582', createdBy: '5e53a1c8bb95e327dc085d1e', 
   updatedBy: '5e53a1c8bb95e327dc085d1e' })
   .end((err, res) => {
     expect(err).to.be.null;
     res.should.have.status(200);
     console.log(res.body.data)
     done();
   });
 })
 it("should update a certain posts", (done)=> {
  chai.request(server)
  .put('/api/posts/5e5bc8ecc805ec4be806cab3')
  .set('authorization',`Bearer ${token}`)
  // title diganti dari Fiqh Sholat sesuai tuntunan Rasulullah menjadi Adab Makan sesuai tuntunan Rasulullah
  .send({ title: 'Adab Makan sesuai tuntunan Rasulullah' })  
  .end((err, res) => {
    expect(err).to.be.null;
    res.should.have.status(200);
    console.log(res.body.data)
    done();
  });
})
 it("the certain posts should be updated", (done)=> {
  chai.request(server)
  .get('/api/posts/5e5bc8ecc805ec4be806cab3')
  .set('authorization',`Bearer ${token}`)
  // title diganti dari Fiqh Sholat sesuai tuntunan Rasulullah menjadi Adab Makan sesuai tuntunan Rasulullah
  .end((err, res) => {
    edit = res.body.title;    
    expect(err).to.be.null;    
    expect(edit).to.equal('Adab Makan sesuai tuntunan Rasulullah');    
    res.should.have.status(200);
    console.log(edit)
    done();
  });
})
 it("should delete a certain posts", (done)=> {
  chai.request(server)
  // Setiap delete data harus diganti dengan id data yang ada
  // Bila tidak -> null -> karena data sudah terhapus    
  .delete('/api/posts/5e5be640fec60844b0cce720')
  .set('authorization',`Bearer ${token}`)    
  .end((err, res) => {
    expect(err).to.be.null;
    res.should.have.status(200);
    console.log(res.body.data)
    done();
  });
})
 it("the certain posts should be deleted", (done)=> {
  chai.request(server)
  .delete('/api/posts/5e5be640fec60844b0cce720')
  .set('authorization',`Bearer ${token}`)    
  .end((err, res) => {
    expect(err).to.be.null;
    res.should.have.status(200);
    console.log(res.body.data)
    done();
  });
})
})