const expect = require('chai').expect;
 
// describe('Simple Math Test Using Chai', () => {
//  it('should return 2', () => {
//    expect(1 + 1).to.equal(2);
//  });
//  it('should return 9', () => {
//    expect(3 * 3).to.equal(9);
//  });
// });

describe('Simple Math Test Using Chai', () => {
 it('should return 2', () => {
   expect({a: 1}).to.have.property('a');
 });
 it('should return 9', () => {
    expect({a: 1}).to.have.lengthOf(1);
 });
 it('should return 1', () => {
  expect({a: 1}).to.have.lengthOf.above(0)
});
it('should return 3', () => {
  expect({a: 1}).to.not.be.empty;
});
it('should return 0', () => {
  expect(Object.keys({a: 1})).to.have.lengthOf(1);
});
});

// describe('Coba', () => {
//   it('1', () => {
//     expect(8*1).to.not.equal(1);
//   });
//   it('2', () => {
//     expect(8*1).to.within(8,1);
//   });  
//  });
