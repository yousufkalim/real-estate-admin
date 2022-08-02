/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// reactstrap components
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import api from 'api';
import { Store, UpdateStore } from 'StoreContext';
import moment from 'moment';
import {
  Badge,
  Card,
  CardHeader,
  Button,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Table,
  Container,
  Row,
} from 'reactstrap';

// core components
import AddNews from './AddNews';
import EditNews from './EditNews';
import Header from 'components/Headers/Header.js';
import { toast } from 'react-toastify';

const Users = () => {
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [allnews, setAllNews] = useState([]);
  const [news, setNews] = useState({
    project: '',
    pictures: '',
    delay_date: '',
    news_date: '',
    total_cost: '',
    selling_cost: '',
  });

  useEffect(() => {
    getAllNews();
  }, []);

  const disableDates = () => {
    var today, dd, mm, yyyy;
    today = new Date();
    dd = today.getDate();
    mm = today.getMonth() + 1;
    yyyy = today.getFullYear();
    if (mm < 10) {
      mm = '0' + mm;
    }
    if (dd < 10) {
      dd = '0';
    }
    return yyyy + '-' + mm + '-' + dd;
  };
  const getAllNews = async () => {
    await api('get', '/news').then((data) => {
      setAllNews(data?.news);
    });
  };
  const handleModal = () => {
    setOpenModal((open) => !open);
    return openModal;
  };

  const handleEditModal = (item) => {
    if (item) {
      // return console.log(item, "n");
      setNews({
        _id: item?._id,
        total_cost: item.total_cost ? item.total_cost : '',
        selling_price: item?.selling_price ? item.selling_price : '',
        end_date: item?.end_date ? item.end_date : '',
        news_date: item?.news_date ? item.news_date : '',
        project: item?.project?.name,
        project_id: item?.project?._id,
        pictures: item?.pictures?.map((pic) => {
          return pic;
        }),
      });
    }
    setEditModal((open) => !open);
    return openModal;
  };

  const handleDelete = (item) => {
    api('delete', `/news/${item}`).then(() => {
      toast.success('News deleted successfully');
      getAllNews();
    });
  };

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <div className="d-flex justify-content-between ">
                  <h3 className="mb-0">News</h3>
                  <Button color="primary" href="#pablo" onClick={handleModal} size="md">
                    <i className="ni ni-fat-add"></i>
                    Add News
                  </Button>
                </div>
              </CardHeader>
              <Table className="align-items-center table-flush">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Project Name </th>
                    <th cope="col">New Total Cost</th>
                    <th scope="col">New Selling Price</th>
                    <th scope="col">News Date</th>
                    <th scope="col">New End Date</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {allnews?.map((item) => {
                    return (
                      <tr>
                        <td>{item?.project?.name}</td>
                        <td>{item?.total_cost ? item.total_cost : '_'}</td>
                        <td>{item?.selling_price ? item.selling_price : '_'}</td>
                        <td>{item?.news_date ? new Date(item.news_date).toDateString() : '_'}</td>
                        <td>{item?.end_date ? new Date(item.end_date).toDateString() : '_'}</td>
                        <td className="text-right">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              className="btn-icon-only text-light"
                              href="#pablo"
                              role="button"
                              size="sm"
                              color=""
                              onClick={(e) => e.preventDefault()}
                            >
                              <i className="fas fa-ellipsis-v" />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                              <DropdownItem href="#pablo" onClick={() => handleEditModal(item)}>
                                Edit
                              </DropdownItem>
                              <DropdownItem href="#pablo" className="text-danger" onClick={() => handleDelete(item._id)}>
                                Delete
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
        {openModal && (
          <AddNews openModal={openModal} handleModal={handleModal} getNews={getAllNews} disableDates={disableDates} />
        )}
        {editModal && (
          <EditNews
            openModal={editModal}
            handleModal={handleEditModal}
            news={news}
            setNews={setNews}
            disableDates={disableDates}
            getAllNews={getAllNews}
          />
        )}
      </Container>
    </>
  );
};
export default Users;
