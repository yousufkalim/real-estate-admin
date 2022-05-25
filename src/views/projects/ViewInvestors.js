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
import { useParams, useHistory } from "react-router-dom";
import api from "api";
import { Store, UpdateStore } from "StoreContext";
import {
  Modal,
  ModalBody,
  ModalHeader,
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
import Header from "components/Headers/Header.js";
import { toast } from "react-toastify";

const ViewInvestors = () => {
  const [project, setProject] = useState([]);
  const { projectId } = useParams();
  useEffect(async () => {
    return await api("get", `/shares/getByProject/${projectId}`).then(
      (data) => {
        setProject(data.reports);
      }
    );
  }, [projectId]);
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <div className="d-flex justify-content-between ">
                  <h2 className="mb-0">
                    Project
                    <span style={{ TextColor: "green" }}> {project?.name}</span>
                  </h2>
                </div>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Investor Name</th>
                    <th scope="col">Investor's Shares</th>
                    <th scope="col">Deposit Amount</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {project?.map((item) => {
                    return (
                      <tr>
                        <td>
                          {item?._id?.first_name}
                          {item?._id?.last_name}
                        </td>
                        <td>{item?.shares}</td>
                        <td>{item?.deposit_amount}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default ViewInvestors;
