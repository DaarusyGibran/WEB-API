const chai  = require('chai');
const chaiHttp = require('chai-http');
const server = require('../bin/www');
const expect = require('chai').expect;
 
// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Roles Endpoint", ()=> {
 it("should be unauthorized to get all roles without token", (done) => {
   chai.request(server)
   .get('/api/roles')
   .end((err, res) => {
     res.should.have.status(401);
     done();
   });
 });
 // ID pada roles harus ID dari data yang sudah diinsert
 it("should be unauthorized to get a certain role without token", (done) => {
  chai.request(server)
  .get('/api/roles/5e53ab0d08830f2114318655')
  .end((err, res) => {
    res.should.have.status(401);
    done();
  });
});
 it("should be unauthorized to insert new roles without token", (done) => {
   chai.request(server)
   .post('/api/roles')
   .end((err, res) => {
     res.should.have.status(401);
     done();
   });
 });
 it("should be not found update roles without id", (done) => {
   chai.request(server)
   .put('/api/roles')
   .end((err, res) => {
     res.should.have.status(404);
     done();
   });
 });
 it("should be unauthorized to update roles without token", (done) => {
  chai.request(server)
  .put('/api/roles/5e53ab0d08830f2114318655')
  .end((err, res) => {
    res.should.have.status(401);
    done();
  });
});
 it("should be unauthorized to delete roles without token", (done) => {
   chai.request(server)
   .delete('/api/roles')
   .end((err, res) => {
     res.should.have.status(401);
     done();
   });
 });
 it("should be unauthorized to delete a certain role without token", (done) => {
  chai.request(server)
  .delete('/api/roles/5e53ab0d08830f2114318655')
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
 it("should get all roles", (done)=> {
   chai.request(server)
   .get('/api/roles')
   .set('authorization',`Bearer ${token}`)
   .end((err, res) => {
     expect(err).to.be.null;
     res.should.have.status(200);
     done();
   });
 })
 it("should get a certain role", (done)=> {
  chai.request(server)
  .get('/api/roles/5e53ab0d08830f2114318655')
  .set('authorization',`Bearer ${token}`)
  .end((err, res) => {
    expect(err).to.be.null;
    res.should.have.status(200);
    done();
  });
})
 it("should insert new roles", (done)=> {
   chai.request(server)
   .post('/api/roles')
   .set('authorization',`Bearer ${token}`)
   .send({ name: 'admin', name_long:'Admin Chai', 
   priority: 1, description: 'Admin Chai' })
   .end((err, res) => {
     expect(err).to.be.null;
     res.should.have.status(200);
     console.log(res.body.data)
     done();
   });
 })
 it("should update a certain role", (done)=> {
  chai.request(server)
  .put('/api/roles/5e54e0d7d8054a43344b9aba')
  .set('authorization',`Bearer ${token}`)
  // description diganti dari Admin Chai menjadi All Access
  .send({ description: 'All Access' })  
  .end((err, res) => {
    expect(err).to.be.null;
    res.should.have.status(200);
    console.log(res.body.data)
    done();
  });
})
 it("the certain role should be updated", (done)=> {
  chai.request(server)
  .get('/api/roles/5e54e0d7d8054a43344b9aba')
  .set('authorization',`Bearer ${token}`)
  // description diganti dari Admin Chai menjadi All Access    
  .end((err, res) => {
    edit = res.body.description;
    // description = res.body.data(description);    
    expect(err).to.be.null;    
    expect(edit).to.equal('All Access');
    res.should.have.status(200);
    console.log(edit)
    done();
  });
})
 it("should delete a certain role", (done)=> {
  chai.request(server)
  // Setiap delete data harus diganti dengan id data yang ada
  // Bila tidak -> null -> karena data sudah terhapus    
  .delete('/api/roles/5e5bd7325b533a20107e1078')
  .set('authorization',`Bearer ${token}`)    
  .end((err, res) => {
    expect(err).to.be.null;
    res.should.have.status(200);
    console.log(res.body.data)
    done();
  });
})
 it("the certain role should be deleted", (done)=> {
  chai.request(server)
  .delete('/api/roles/5e5bd7325b533a20107e1078')
  .set('authorization',`Bearer ${token}`)    
  .end((err, res) => {
    expect(err).to.be.null;
    res.should.have.status(200);
    console.log(res.body.data)
    done();
  });
})
})


