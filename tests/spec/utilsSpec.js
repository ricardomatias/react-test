var { createPageHandles, convertListToPages } = require('../../src/utils');

describe('utils', function() {

  describe('createPageHandles', function() {

    it('first page selected', function() {
      var pages = {
        1: 1,
        2: 2,
        3: 3,
        length: 3
      };

      var result = [ 1, 2, 3, 'next' ];

      expect(createPageHandles(pages, 1)).to.eql(result);
    });

    it('last page selected', function() {
      var pages = {
        1: 1,
        2: 2,
        3: 3,
        length: 3
      };

      var result = [ 'prev', 1, 2, 3 ];

      expect(createPageHandles(pages, 3)).to.eql(result);
    });

    it('second page selected', function() {
      var pages = {
        1: 1,
        2: 2,
        3: 3,
        length: 3
      };

      var result = [ 'prev', 1, 2, 3, 'next' ];

      expect(createPageHandles(pages, 2)).to.eql(result);
    });

    it('big list', function() {
      var pages = {
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        length: 8
      };

      var result = [ 'prev', 1, 2, 3, '..', 8, 'next' ];

      expect(createPageHandles(pages, 3)).to.eql(result);
    });

    it('big list, higher interval, middle selection', function() {
      var pages = {
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        length: 8
      };

      var result = [ 'prev', 1, '..', 3, 4, 5, '..', 8, 'next' ];

      expect(createPageHandles(pages, 4)).to.eql(result);
    });

    it('big list, higher interval, last part selection', function() {
      var pages = {
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        length: 8
      };

      var result = [ 'prev', 1, '..', 6, 7, 8, 'next' ];

      expect(createPageHandles(pages, 6)).to.eql(result);
    });

  });


  describe('convertListToPages', function() {

    it('even number', function() {
      var list = {
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6
      };

      var result = { 1: [ 1, 2 ], 2: [ 3, 4 ], 3: [ 5, 6 ], length: 3 };

      expect(convertListToPages(list)).to.eql(result);
    });

    it('odd number', function() {
      var list = {
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7
      };

      var result = { 1: [ 1, 2 ], 2: [ 3, 4 ], 3: [ 5, 6 ], 4: [ 7 ], length: 4 };

      expect(convertListToPages(list)).to.eql(result);
    });

  });

});
