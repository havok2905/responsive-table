function _thead(element) {
  return element.getElementsByTagName('thead')[0];
}

function _tbody(element) {
  return element.getElementsByTagName('tbody')[0];
}

function _tfoot(element) {
  return element.getElementsByTagName('tfoot')[0];
}

function _rows(tbody) {
  return tbody.getElementsByTagName('tr');
}

function _card(thead, row) {
  let card     = document.createElement('table'),
      tbody    = document.createElement('tbody'),
      headers  = thead.getElementsByTagName('th'),
      data     = row.getElementsByTagName('td'),
      x        = 0;

  for(x; x<data.length; x++) {
    let newRow  = document.createElement('tr'),
        newData = data[x].cloneNode(true),
        header  = headers[x].cloneNode(true);

    header.setAttribute('scope', 'row');
    newRow.appendChild(header);
    newRow.appendChild(newData);
    tbody.appendChild(newRow);
  }

  card.setAttribute('class', 'table');
  card.appendChild(tbody);

  return card;
}

let TableComponentViews =  {
  cached: (element, cached)=> {
    element.innerHTML = cached.innerHTML;
  },

  cards: (element)=> {
    let thead = _thead(element),
    tbody     = _tbody(element),
    rows      = _rows(tbody),
    x;

    element.innerHTML = '';

    for(x=0; x<rows.length; x++) {
      element.appendChild(_card(thead, rows[x]));
    }
  }
}

export default TableComponentViews;
