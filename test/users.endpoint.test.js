const chai  = require('chai');
const chaiHttp = require('chai-http');
const server = require('../bin/www');
const expect = require('chai').expect;
 
// Configure chai
chai.use(chaiHttp);
chai.should();

describe("users Endpoint", ()=> {
 it("should be unauthorized to get all users without token", (done) => {
   chai.request(server)
   .get('/api/users')
   .end((err, res) => {
     res.should.have.status(401);
     done();
   });
 });
 // ID pada users harus ID dari data yang sudah diinsert
 it("should be unauthorized to get a certain users without token", (done) => {
  chai.request(server)
  .get('/api/users/5e53a1c8bb95e327dc085d1e')
  .end((err, res) => {
    res.should.have.status(401);
    done();
  });
});
 it("should be unauthorized to insert new users without token", (done) => {
   chai.request(server)
   .post('/api/users')
   .end((err, res) => {
     res.should.have.status(401);
     done();
   });
 });
 it("should be not found update users without id", (done) => {
   chai.request(server)
   .put('/api/users')
   .end((err, res) => {
     res.should.have.status(404);
     done();
   });
 });
 it("should be unauthorized to update users without token", (done) => {
  chai.request(server)
  .put('/api/users/5e53a1c8bb95e327dc085d1e')
  .end((err, res) => {
    res.should.have.status(401);
    done();
  });
});
 it("should be unauthorized to delete users without token", (done) => {
   chai.request(server)
   .delete('/api/users')
   .end((err, res) => {
     res.should.have.status(401);
     done();
   });
 });
 it("should be unauthorized to delete a certain users without token", (done) => {
  chai.request(server)
  .delete('/api/users/5e53a1c8bb95e327dc085d1e')
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
 it("should get all users", (done)=> {
   chai.request(server)
   .get('/api/users')
   .set('authorization',`Bearer ${token}`)
   .end((err, res) => {
     expect(err).to.be.null;
     res.should.have.status(200);
     done();
   });
 })
 it("should get a certain user", (done)=> {
  chai.request(server)
  .get('/api/users/5e53a1c8bb95e327dc085d1e')
  .set('authorization',`Bearer ${token}`)
  .end((err, res) => {
    expect(err).to.be.null;
    res.should.have.status(200);
    done();
  });
})
 it("should insert new users", (done)=> {
   chai.request(server)
   .post('/api/users')
   .set('authorization',`Bearer ${token}`)
   .send({ username: 'admin4', email:'admin4@localhost', 
   displayName: 'Awesome Admin', password: 'admin4', 
   users: '5e53ab0d08830f2114318655' })
   .end((err, res) => {
     expect(err).to.be.null;
     res.should.have.status(200);
     console.log(res.body.data)
     done();
   });
 })
 it("should update a certain users", (done)=> {
  chai.request(server)
  .put('/api/users/5e5bb9050ca4763ca8a501b9')
  .set('authorization',`Bearer ${token}`)
  // displayName diganti dari Awesome Admin menjadi Amazing Admin
  .send({ displayName: 'Amazing Admin' })  
  .end((err, res) => {
    expect(err).to.be.null;
    res.should.have.status(200);
    console.log(res.body.data)
    done();
  });
})
 it("the certain users should be updated", (done)=> {
  chai.request(server)
  .get('/api/users/5e5bb9050ca4763ca8a501b9')
  .set('authorization',`Bearer ${token}`)
  // displayName diganti dari Awesome Admin menjadi Amazing Admin
  .end((err, res) => {
    edit = res.body.displayName;    
    expect(err).to.be.null;    
    expect(edit).to.equal('Amazing Admin');    
    res.should.have.status(200);
    console.log(edit)
    done();
  });
})
 it("should delete a certain users", (done)=> {
  chai.request(server)
  // Setiap delete data harus diganti dengan id data yang ada
  // Bila tidak -> null -> karena data sudah terhapus    
  .delete('/api/users/5e5bdc3152a9fc1eb0b64761')
  .set('authorization',`Bearer ${token}`)    
  .end((err, res) => {
    expect(err).to.be.null;
    res.should.have.status(200);
    console.log(res.body.data)
    done();
  });
})
 it("the certain users should be deleted", (done)=> {
  chai.request(server)
  .delete('/api/users/5e5bdc3152a9fc1eb0b64761')
  .set('authorization',`Bearer ${token}`)    
  .end((err, res) => {
    expect(err).to.be.null;
    res.should.have.status(200);
    console.log(res.body.data)
    done();
  });
})
})