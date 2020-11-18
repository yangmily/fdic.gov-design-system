import typeCheckers from '../type-checkers';

/**
 * Queries for the first match unless an HTMLNode is passed
 * @param   {(HTMLNode|string)} expr HTMLNode or string to query for
 * @param   {Object}          con  The document location to query
 * @returns {HTMLNode}             The elem
 */
function queryOne( expr, con ) {
  return typeCheckers.isString( expr ) ?
    ( con || document ).querySelector( expr ) :
    expr || null;
}

/**
 * Return a list, with an element excluded.
 *
 * @param {NodeList} elems - List of DOM elements.
 * @param {HTMLNode} exclude - DOM element to exlude from elems.
 * @returns {Array} edited elems list or original elems list,
 *   if exlude was not found.
 */
function not( elems, exclude ) {
  const elemsArr = Array.prototype.slice.call( elems );
  const index = elemsArr.indexOf( exclude );

  if ( index > -1 ) {
    elemsArr.splice( index, 1 );
  }

  return elemsArr;
}

/**
 * Get the nearest parent node of an element.
 *
 * @param {HTMLNode} elem - A DOM element.
 * @param {string} selector - CSS selector.
 * @returns {HTMLNode} Nearest parent node that matches the selector.
 */
function closest( elem, selector ) {
  elem = elem.parentNode;

  const matchesSelector = _getMatchesMethod( elem );
  let match;

  try {
    while ( elem ) {
      if ( matchesSelector.bind( elem )( selector ) ) {
        match = elem;
      } else {
        elem = elem.parentNode;
      }

      if ( match ) { return elem; }
    }
  } catch ( err ) {
    return null;
  }

  return null;
}

/**
 * Search for support of the matches() method by looking at
 * browser prefixes.
 * @param {HTMLNode} elem
 *   The element to check for support of matches() method.
 * @returns {Function} The appropriate matches() method of elem.
 */
function _getMatchesMethod( elem ) {
  return elem.matches ||
         elem.webkitMatchesSelector ||
         elem.mozMatchesSelector ||
         elem.msMatchesSelector;
}

export default {
  queryOne: queryOne,
  closest: closest
};