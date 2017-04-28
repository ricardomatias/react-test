const forEach = require('lodash/collection/forEach');

const INTERVAL = 3,
      PLACEHOLDER = '..';

module.exports.createPageHandles = function createPageHandles(pages, currentPage) {
  const pagesLength = pages.length,
        handles = [];

  // nav handle
  if (currentPage > 1) {
    handles.push('prev');
  }

  // MIDDLE
  if (currentPage <= INTERVAL) {
    // f.ex  [ 'prev', 1, 2, 3, 'next' ] or
    // f.ex: [ 'prev', 1, 2, 3, '..', 8, 'next' ]
    for (let index = 1; index <= pagesLength - 1; index++) {
      handles.push(index);

      if (index >= INTERVAL) {
        break;
      }
    }

    if (pagesLength > INTERVAL) {
      handles.push(PLACEHOLDER);
    }

    // END
    // last number
    handles.push(pagesLength);
  } else {
    handles.push(1, PLACEHOLDER);

    if (currentPage + INTERVAL > pagesLength) {
      // f.ex: [ 'prev', 1, '..', 6, 7, 8, 'next' ]
      for (let index = pagesLength - INTERVAL + 1; index <= pagesLength; index++) {
        handles.push(index);
      }
    } else {
      // f.ex: [ 'prev', 1, '..', 3, 4, 5, '..', 8, 'next' ]
      for (let index = currentPage - 1; index <= currentPage + 1; index++) {
        handles.push(index);
      }

      handles.push(PLACEHOLDER, pagesLength);
    }
  }

  // nav handle
  if (currentPage !== pagesLength) {
    handles.push('next');
  }

  return handles;
}

module.exports.convertListToPages = function convertListToPages(list) {
  const pages = {};

  let pageNr = 1,
      index = 1;

  forEach(list, function(item) {
    if (!pages[pageNr]) {
      pages[pageNr] = [];
    }

    pages[pageNr].push(item);

    if (index % 2 === 0) {
      pageNr++;
    }

    index++;
  });

  pages.length = Object.keys(pages).length;

  return pages;
}
