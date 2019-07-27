import axios from "axios";
import * as React from "react";
import Alert from "react-bootstrap/Alert";
import ReactPaginate from "react-paginate";
import MyModal from "../Modal/Modal";
import "./JsonForm.css";
// https://github.com/swagger-api/swagger-codegen/blob/master/samples/client/petstore/typescript-fetch/builds/default/api.ts

interface IParams {
  schema: object;
}

const ListItem = (props: any) => {
  const { id } = props;

  return (
    <>
      <button
        onClick={props.deleteItem(id)}
        type="button"
        className="btn btn-sm btn-outline-danger"
      >
        <i className="fa fa-trash" />
      </button>
      &nbsp; &nbsp;
      <button
        onClick={props.editItem(id)}
        type="button"
        className="btn btn-sm btn-outline-info"
      >
        <i className="fa fa-edit" />
      </button>
      &nbsp;
      <code>{JSON.stringify(props)}</code>
      <button
        onClick={props.editItem(id)}
        type="button"
        className="btn btn-sm btn-outline-default pull-right"
      >
        <i className="fa fa-paperclip" />
      </button>
    </>
  );
};
const ListItems = (props: any) => {
  return (
    <>
      <ul className="list-group" style={{ minHeight: 180 }}>
        {props.items.map((item: any, idx: number) => (
          <li key={idx} className="list-group-item list-group-item-success">
            <ListItem
              deleteItem={props.deleteItem}
              editItem={props.editItem}
              {...item}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default class Loop extends React.Component<IParams, any> {
  constructor(props: any) {
    super(props);
    const collectionName = props.schema.collectionName;
    this.state = {
      activeItem: null,
      collectionName,
      count: 0,
      errors: null,
      explorer: process.env.REACT_APP_API_EXPLORER,
      items: [],
      limit: 3,
      loading: false,
      modalShow: false,
      skip: 0,
      total: 0,
      url: process.env.REACT_APP_API_ENDPOINT + "/" + collectionName
    };
  }
  public componentDidMount = () => {
    this.fetchItems();
  };

  public countCollection = (next: any) => {
    axios.get(`${this.state.url}/count`).then((res: any) => {
      const count = Math.ceil(res.data.count / this.state.limit);
      this.setState({ count, total: res.data.count }, () => next());
    });
  };
  public fetchItems = () => {
    const { limit, skip } = this.state;
    this.countCollection(() => {
      axios
        .get(`${this.state.url}`, { params: { filter: { limit, skip } } })
        .then((response: any) => {
          // this.setState({ items: response.data }); // fix remove last
        });
    });
  };
  public deleteItem = (id: string | number) => {
    axios.delete(`${this.state.url}/${id}`).then(this.fetchItems);
  };
  public editItem = (id: any) => {
    this.setState(
      { activeItem: this.state.items.find((item: any) => item.id === id) },
      () => this.toggleModal()
    );
  };
  public handlePageClick = (data: any) => {
    const selected = data.selected;
    const skip = Math.ceil(selected * this.state.limit);
    this.setState({ skip }, () => this.fetchItems());
  };
  public toggleModal = () =>
    this.setState({ modalShow: !this.state.modalShow });

  public render() {
    const {
      items,
      count,
      skip,
      total,
      modalShow,
      activeItem,
      collectionSchema
    } = this.state;

    return (
      <>
        <div className="container">
          <h3>{total}</h3>
          {total > 0 && (
            <>
              <ListItems
                items={items}
                deleteItem={this.deleteItem}
                editItem={this.editItem}
              />

              <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
                pageCount={count}
                pageRangeDisplayed={0}
                marginPagesDisplayed={0}
                onPageChange={this.handlePageClick}
                containerClassName={"pagination"}
                activeClassName={"active"}
                pageClassName="page-item"
                previousClassName="page-item"
                nextClassName="page-item"
                pageLinkClassName="page-link"
                previousLinkClassName="page-link"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLabel={""}
              />
              <small className="pull-right">
                {JSON.stringify({ skip, pages: count, total })}
              </small>
            </>
          )}
        </div>

        <MyModal
          show={modalShow}
          onHide={this.toggleModal}
          heading="Schema-form"
        >
          <Alert variant="info">
            <Alert.Heading>Submitted for asycValidation</Alert.Heading>
            <pre>{JSON.stringify(activeItem, undefined, 4)}</pre>
            <pre>{JSON.stringify(collectionSchema, undefined, 4)}</pre>
          </Alert>
        </MyModal>
      </>
    );
  }
}
