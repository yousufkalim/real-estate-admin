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
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import api from "api";
import { Store, UpdateStore } from "StoreContext";
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
} from "reactstrap";

// core components
import AddProject from "./AddProject";
import EditProject from "./EditProject";
import Header from "components/Headers/Header.js";
import { toast } from "react-toastify";

const Projects = () => {
  const history = useHistory();
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [project, setProject] = useState({
    _id: "",
    name: "",
    total_cost: "",
    selling_price: "",
    start_date: "",
    end_date: "",
    total_shares: "",
    dispaly_picture: "",
    city: "",
  });

  const [projects, setProjects] = useState([]);
  useEffect(() => {
    getProjects();
  }, []);

  const disableDates = () => {
    var today, dd, mm, yyyy;
    today = new Date();
    dd = today.getDate();
    mm = today.getMonth() + 1;
    yyyy = today.getFullYear();
    if (mm < 10) {
      mm = "0" + mm;
    }
    if (dd < 10) {
      dd = "0";
    }
    return yyyy + "-" + mm + "-" + dd;
  };

  const getProjects = async () => {
    return await api("get", "/projects").then((data) => {
      setProjects(data.projects);
    });
  };

  const handleModal = () => {
    setOpenModal((open) => !open);
    return openModal;
  };

  const handleEditModal = (item) => {
    if (item) {
      setProject({
        _id: item?._id,
        name: item?.name,
        total_cost: item?.total_cost,
        selling_price: item?.selling_price,
        start_date: item?.start_date,
        dispaly_picture: item?.dispaly_picture,
        end_date: item?.end_date,
        city: item?.city,
        total_shares: item?.total_shares,
        remaining_shares: item?.remaining_shares,
        old_shares: item?.total_shares,
      });
    }
    setEditModal((open) => !open);
    return openModal;
  };

  const handleDelete = (id) => {
    api("delete", `/projects/${id}`).then(() => {
      toast.success("Project deleted successfully");
      getProjects();
    });
  };
  const navtoInvestors = (item) => {
    history.push(`/admin/viewInvestors/${item._id}`);
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
                  <h3 className="mb-0">Projects</h3>
                  <Button
                    color="primary"
                    href="#pablo"
                    onClick={handleModal}
                    size="md"
                  >
                    <i className="ni ni-fat-add"></i>
                    Add Project
                  </Button>
                </div>
              </CardHeader>
              <Table className="align-items-center table-flush">
                <thead className="thead-light">
                  <tr>
                    <th scope="col"> Name</th>
                    <th scope="col">Start Date</th>
                    <th scope="col">End Date</th>
                    <th scope="col">Total Cost</th>
                    <th scope="col">Selling Price</th>
                    <th scope="col">Total Shares</th>
                    <th scope="col">Created At</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {projects?.map((item) => {
                    return (
                      <tr>
                        <td>{item?.name}</td>
                        <td>{new Date(item?.start_date).toDateString()}</td>
                        <td>{new Date(item?.end_date).toDateString()}</td>
                        <td>{item?.total_cost}</td>
                        <td>{item?.selling_price}</td>
                        <td>{item?.total_shares}</td>
                        <td>{new Date(item.createdAt).toDateString()}</td>
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
                              <DropdownItem
                                onClick={() => navtoInvestors(item)}
                                href="#pablo"
                                className="text-success"
                              >
                                view investors
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                onClick={() => handleEditModal(item)}
                              >
                                Edit
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                className="text-danger"
                                onClick={() => handleDelete(item._id)}
                              >
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

              {/* ///////////     Pagination Disabled Temp     ///////////// */}

              {/* <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter> */}
            </Card>
          </div>
        </Row>
        {openModal && (
          <AddProject
            openModal={openModal}
            handleModal={handleModal}
            getProjects={getProjects}
            disableDates={disableDates}
          />
        )}
        {editModal && (
          <EditProject
            openModal={editModal}
            handleModal={handleEditModal}
            project={project}
            setProject={setProject}
            getProjects={getProjects}
            disableDates={disableDates}
          />
        )}
      </Container>
    </>
  );
};

export default Projects;
