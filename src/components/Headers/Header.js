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
import api from 'api';
import { useEffect, useState } from 'react';
import { Store, UpdateStore } from 'StoreContext';
import { Card, CardBody, CardTitle, Container, Row, Col } from 'reactstrap';
import { useTranslation } from 'react-i18next';
const Header = () => {
  const updateStore = UpdateStore();
  const store = Store();
  const { i18n, t } = useTranslation();
  const { language } = i18n;
  useEffect(async () => {
    await api('get', '/projects').then((data) => {
      updateStore({
        projects: data?.projects.length,
      });
    });
    await api('get', '/investors').then((data) => {
      updateStore({
        investors: data?.investors.length,
      });
    });
  }, []);

  // useEffect(() => {
  //   updateStore({
  //     projects: projects,
  //     investors: investors,
  //   });
  // }, [projects, investors]);
  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row style={{ justifyContent: 'center' }}>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                          {t('Total Investors')}
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{store.investors}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                          {t('Total Projects')}
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{store.projects}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-chart-pie" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
