# Responsive table

Most front end projects involving tables require
some sort of responsive behavior, and not all of it
the same. Responsive table aims to be a hyper flexible
front end library for dealing with responsive tables.

It comes in three modules and is written in vanilla ES6.

## Table Component Controller
This is the main module for dealing with tables. All other modules
are used to power this.

### Options

- `element` : table wrapper element
- `breakPoint`: number of pixels wide to switch to mobile view
- `mobileCallback`: function to substitute the default mobile view
- `desktopCallback`: function to substitute the default desktop view

```javascript
import ResponsiveTable from '../src/responsive_table';

let breakPoint  = 800,
    element = document.getElementById('better-table'),

new ResponsiveTable.TableComponentController({
  breakPoint: breakPoint,
  element: element
});
```

```html
<div id='table'>
  <table>
    <thead>
      <tr>
        <th scope='col'>header 1</th>
        <th scope='col'>header 2</th>
        <th scope='col'>header 3</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>data 1</td>
        <td>data 2</td>
        <td>data 3</td>
      </tr>
      <tr>
        <td>data 1</td>
        <td>data 2</td>
        <td>data 3</td>
      </tr>
      <tr>
        <td>data 1</td>
        <td>data 2</td>
        <td>data 3</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td>foot 1</td>
        <td>foot 2</td>
        <td>foot 3</td>
      </tr>
    </tfoot>
  </table>
</div>
```

## TableComponentViews
We can use the view module on it's own like so.

- `cards(element)` : returns and sets the transformed markup for card formatting
- `cached(element, cached)` : returns and sets the cached markup

```javascript
import ResponsiveTable from 'responsive-table';

let tableElement = document.getElementById('responsive-table');
ResponsiveTable.TableComponentViews.cards(tableElement);
```

## ScreenCalculator
We can use the screen calculator on it's own like so.

- `width()`  : Returns the width of your screen at any given point
- `height()` : Returns the height of your screen at any given point

```javascript
import ResponsiveTable from 'responsive-table';

ResponsiveTable.ScreenCalulator.width(); // Your current width
ResponsiveTable.ScreenCalulator.height(); // Your current height
```
