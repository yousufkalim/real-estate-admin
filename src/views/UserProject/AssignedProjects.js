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
import { useParams, useHistory } from 'react-router-dom';
import api from 'api';
import { Store, UpdateStore } from 'StoreContext';
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
import AddAssignProject from './AddAssignProject';
import EditAssignProject from './EditAssignProject';
import Header from 'components/Headers/Header.js';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
const AssignedProjects = () => {
  const { i18n, t } = useTranslation();
  const { language } = i18n;
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const { investorId } = useParams();
  const [project, setProject] = useState({
    projet: '',
    shares: '',
  });
  const [projects, setProjects] = useState([]);

  const [userprojects, setUserProjects] = useState([]);
  useEffect(() => {
    getUserProjects();
    getProjects();
  }, [investorId]);

  const getUserProjects = async () => {
    return await api('get', `/shares/${investorId}`).then((data) => {
      console.log(data, 'd');
      setUserProjects(data?.shares);
    });
  };

  const getProjects = async () => {
    return await api('get', '/projects').then((data) => {
      setProjects(data?.projects);
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
        project: item?.project?._id,
        name: item?.project?.name,
        remaining_shares: item?.project?.remaining_shares,
        unit_share: item?.project?.unit_share,
        shares: item?.shares,
        deposit_amount: item?.deposit_amount,
        old_shares: item?.shares,
      });
    }

    setEditModal((open) => !open);
    return openModal;
  };

  const handleDelete = (item) => {
    // return console.log(item, "i");
    return api('put', `/shares/${item._id}`, item).then(() => {
      toast.success('Project unassigned successfully');
      getUserProjects();
      getProjects();
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
                  <h3 className="mb-0">{t('Projects')}</h3>
                  <Button color="primary" href="#pablo" onClick={handleModal} size="md">
                    <i className="ni ni-fat-add"></i>

                    {t('Add Share')}
                  </Button>
                </div>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">{t('Investor Name')}</th>
                    <th scope="col">{t('Project Name')}</th>
                    <th scope="col">{t('Start Date')}</th>
                    <th scope="col">{t('End Date')}</th>
                    <th scope="col">{t('Total Cost')}</th>
                    <th scope="col">{t('Selling Price')}</th>
                    <th scope="col">{t('Investor Shares')}</th>
                    <th scope="col">{t('Deposit Amount')}</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {userprojects?.map((item) => {
                    return (
                      <tr>
                        <td>{item?.investor?.first_name}</td>
                        <td>{item?.project?.name}</td>
                        <td>{new Date(item?.project?.start_date).toDateString()}</td>
                        <td>{new Date(item?.project?.end_date).toDateString()}</td>
                        <td>{item?.project?.total_cost}</td>
                        <td>{item?.project?.selling_price}</td>
                        <td>{item?.shares}</td>
                        <td>{item?.deposit_amount}</td>
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
                                {t('Edit Shares')}
                              </DropdownItem>
                              <DropdownItem href="#pablo" className="text-danger" onClick={() => handleDelete(item)}>
                                {t('Delete')}
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
          <AddAssignProject
            openModal={openModal}
            handleModal={handleModal}
            Projects={projects}
            getProjects={getProjects}
            getUserProjects={getUserProjects}
            investor={investorId}
          />
        )}
        {editModal && (
          <EditAssignProject
            openModal={editModal}
            handleModal={handleEditModal}
            project={project}
            setProject={setProject}
            getProjects={getProjects}
            getUserProjects={getUserProjects}
            investor={investorId}
          />
        )}
      </Container>
    </>
  );
};

export default AssignedProjects;
