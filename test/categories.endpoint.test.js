const chai  = require('chai');
const chaiHttp = require('chai-http');
const server = require('../bin/www');
const expect = require('chai').expect;
 
// Configure chai
chai.use(chaiHttp);
chai.should();

describe("categories Endpoint", ()=> {
 it("should be unauthorized to get all categories without token", (done) => {
   chai.request(server)
   .get('/api/categories')
   .end((err, res) => {
     res.should.have.status(401);
     done();
   });
 });
 // ID pada categories harus ID dari data yang sudah diinsert
 it("should be unauthorized to get a certain categories without token", (done) => {
  chai.request(server)
  .get('/api/categories/5e53a1c8bb95e327dc085d1e')
  .end((err, res) => {
    res.should.have.status(401);
    done();
  });
});
 it("should be unauthorized to insert new categories without token", (done) => {
   chai.request(server)
   .post('/api/categories')
   .end((err, res) => {
     res.should.have.status(401);
     done();
   });
 });
 it("should be not found update categories without id", (done) => {
   chai.request(server)
   .put('/api/categories')
   .end((err, res) => {
     res.should.have.status(404);
     done();
   });
 });
 it("should be unauthorized to update categories without token", (done) => {
  chai.request(server)
  .put('/api/categories/5e53a1c8bb95e327dc085d1e')
  .end((err, res) => {
    res.should.have.status(401);
    done();
  });
});
 it("should be unauthorized to delete categories without token", (done) => {
   chai.request(server)
   .delete('/api/categories')
   .end((err, res) => {
     res.should.have.status(401);
     done();
   });
 });
 it("should be unauthorized to delete a certain categories without token", (done) => {
  chai.request(server)
  .delete('/api/categories/5e53a1c8bb95e327dc085d1e')
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
 it("should get all categories", (done)=> {
   chai.request(server)
   .get('/api/categories')
   .set('authorization',`Bearer ${token}`)
   .end((err, res) => {
     expect(err).to.be.null;
     res.should.have.status(200);
     done();
   });
 })
 it("should get a certain categories", (done)=> {
  chai.request(server)
  .get('/api/categories/5e53a1c8bb95e327dc085d1e')
  .set('authorization',`Bearer ${token}`)
  .end((err, res) => {
    expect(err).to.be.null;
    res.should.have.status(200);
    done();
  });
})
 it("should insert new categories", (done)=> {
   chai.request(server)
   .post('/api/categories')
   .set('authorization',`Bearer ${token}`)
   .send({ name: 'Tes Delete' })
   .end((err, res) => {
     expect(err).to.be.null;
     res.should.have.status(200);
     console.log(res.body.data)
     done();
   });
 })
 it("should update a certain categories", (done)=> {
  chai.request(server)
  .put('/api/categories/5e5bc3aed65da439bced31ca')
  .set('authorization',`Bearer ${token}`)
  // name diganti dari Tauhid menjadi Keutamaan Ibadah
  .send({ name: 'Keutamaan Ibadah' })  
  .end((err, res) => {
    expect(err).to.be.null;
    res.should.have.status(200);
    console.log(res.body.data)
    done();
  });
})
 it("the certain categories should be updated", (done)=> {
  chai.request(server)
  .get('/api/categories/5e5bc3aed65da439bced31ca')
  .set('authorization',`Bearer ${token}`)
  // name diganti dari Tauhid menjadi Keutamaan Ibadah
  .end((err, res) => {
    edit = res.body.name;    
    expect(err).to.be.null;    
    expect(edit).to.equal('Keutamaan Ibadah');    
    res.should.have.status(200);
    console.log(edit)
    done();
  });
})
 it("should delete a certain categories", (done)=> {
  chai.request(server)
  // Setiap delete data harus diganti dengan id data yang ada
  // Bila tidak -> null -> karena data sudah terhapus    
  .delete('/api/categories/5e5be3c24d852c45745b01b9')
  .set('authorization',`Bearer ${token}`)    
  .end((err, res) => {
    expect(err).to.be.null;
    res.should.have.status(200);
    console.log(res.body.data)
    done();
  });
})
 it("the certain categories should be deleted", (done)=> {
  chai.request(server)
  .delete('/api/categories/5e5be3c24d852c45745b01b9')
  .set('authorization',`Bearer ${token}`)    
  .end((err, res) => {
    expect(err).to.be.null;
    res.should.have.status(200);
    console.log(res.body.data)
    done();
  });
})
})