import ResponsiveTable from '../src/responsive_table';

let breakPoint  = 800,
    element = document.getElementById('better-table'),
    table = new ResponsiveTable.TableComponentController({
      breakPoint: breakPoint,
      element: element
    });
