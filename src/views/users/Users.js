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
import AddUser from "./AddUser";
import EditUser from "./EditUser";
import AssignedProjects from "../UserProject/AssignedProjects";
import Header from "components/Headers/Header.js";
import { toast } from "react-toastify";

const Users = () => {
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const { users } = Store();
  const updateStore = UpdateStore();
  const history = useHistory();
  const [user, setUser] = useState({
    _id: "",
    name: "",
    email: "",
    password: "",
    address: "",
    number: "",
    country: "",
    city: "",
  });

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const data = await api("get", "/investors");

    updateStore({ users: data.investors });
  };

  const handleModal = () => {
    setOpenModal((open) => !open);
    return openModal;
  };

  const handleEditModal = (item) => {
    if (item) {
      setUser({
        _id: item._id,
        first_name: item.first_name,
        last_name: item.last_name,
        phone: item.phone,
      });
    }

    setEditModal((open) => !open);
    return openModal;
  };

  const handleDelete = (item) => {
    api("delete", `/investors/${item}`).then(() => {
      toast.success("User deleted successfully");
      getUsers();
    });
  };

  const navToProjects = (item) => {
    history.push(`/admin/userProject/${item._id}`);
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
                  <h3 className="mb-0">Investors</h3>
                  <Button
                    color="primary"
                    href="#pablo"
                    onClick={handleModal}
                    size="md"
                  >
                    <i className="ni ni-fat-add"></i>
                    Add Investor
                  </Button>
                </div>
              </CardHeader>
              <Table className="align-items-center table-flush">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th cope="col">Phone</th>
                    <th scope="col">Created At</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {users?.map((item) => {
                    return (
                      <tr>
                        <td>{item.first_name}</td>
                        <td>{item.last_name}</td>
                        <td>{item.phone}</td>
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
                                onClick={() => navToProjects(item)}
                                href="#pablo"
                                className="text-success"
                              >
                                Assign Project
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
            </Card>
          </div>
        </Row>
        {openModal && (
          <AddUser
            openModal={openModal}
            handleModal={handleModal}
            getUsers={getUsers}
          />
        )}
        {editModal && (
          <EditUser
            openModal={editModal}
            handleModal={handleEditModal}
            user={user}
            setUser={setUser}
            getUsers={getUsers}
          />
        )}
      </Container>
    </>
  );
};
export default Users;
