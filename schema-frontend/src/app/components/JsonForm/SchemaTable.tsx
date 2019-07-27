/* eslint max-len: 0 */
import * as React from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

const products: any = [];

function addProducts(quantity: number) {
  const startId = products.length;
  for (let i = 0; i < quantity; i++) {
    const id = startId + i;
    products.push({
      id,
      name: "Item name " + id,
      price: 2100 + i
    });
  }
}
addProducts(70);

export default class DefaultPaginationTable extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    const options = {
      page: 2, // which page you want to show as default
      sizePerPageList: [
        { text: "5", value: 5 },
        { text: "10", value: 10 },
        { text: "All", value: products.length }
      ],

      // tslint:disable-next-line: object-literal-sort-keys
      pageStartIndex: 0, // where to start counting the pages
      paginationSize: 5, // the pagination bar size.
      prePage: "Prev", // Previous page button text
      nextPage: "Next", // Next page button text
      // firstPage: 'First', // First page button text
      // lastPage: 'Last', // Last page button text
      // prePageTitle: 'Go to previous', // Previous page button title
      // nextPageTitle: 'Go to next', // Next page button title
      // firstPageTitle: 'Go to first', // First page button title
      // lastPageTitle: 'Go to Last', // Last page button title
      paginationShowsTotal: false, // Accept bool or function
      sizePerPage: 5, // which size per page you want to locate as default
      // keepSizePerPageState: true //default is false, enable will keep sizePerPage dropdown state(open/clode) when external rerender happened
      // hideSizePerPage: true > You can hide the dropdown for sizePerPage
      // alwaysShowAllBtns: true // Always show next and previous button
      withFirstAndLast: false // > Hide the going to First and Last page button
      // hidePageListOnlyOnePage: true > Hide the page list if only one page.
    };
    return (
      <div>
        <BootstrapTable data={products} options={options} pagination={true}>
          <TableHeaderColumn dataField="id" isKey={true}>
            Product ID
          </TableHeaderColumn>
          <TableHeaderColumn dataField="name">Product Name</TableHeaderColumn>
          <TableHeaderColumn dataField="price">Product Price</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}
