import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../api';
import { Select } from 'antd';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button, FormGroup, Form, Input, Row, Col } from 'reactstrap';
// core components
import { useTranslation } from 'react-i18next';

const EditAssignProject = ({ openModal, handleModal, project, setProject, getProjects, getUserProjects, investor }) => {
  const { i18n, t } = useTranslation();
  const { language } = i18n;
  const handleInput = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };
  const handleDepositeAmount = (e) => {
    if (e.target.value < 0) {
      return toast.error('Deposit amount should be greater than 0');
    }
    let shares = e.target.value / +project?.unit_share;
    shares = Math.round(shares * 100 + Number.EPSILON) / 100;
    setProject({
      ...project,
      [e.target.name]: e.target.value,
      shares: shares,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (project.shares == '') {
      return toast.error("Share's required");
    }
    if (project.deposit_amount == '') {
      return toast.error('Deposit Amount is required');
    }
    if (parseFloat(project.shares) < 0.01) {
      return toast.error("Share's required");
    }
    const total_shares = parseInt(project.shares) - parseInt(project.old_shares);
    if (total_shares > parseInt(project.remaining_shares)) {
      return toast.error('Shares should be lesser than remaining shares');
    }
    api('put', `/shares/editAssignShare/${project?._id}`, project).then(() => {
      toast.success('Project edited successfully');
      getProjects();
      getUserProjects();
      handleModal();
    });
  };

  return (
    <>
      <Modal isOpen={openModal} size="xl" centered>
        <ModalHeader charCode="X" toggle={handleModal}>
          {t('Edit Project Shares')}
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col>
              <Form>
                <div className="pl-lg-4">
                  <Row>
                    <Col lg="4" style={{ margin: 'auto' }}>
                      <FormGroup>
                        <label className="form-control-label">{t('Project')}</label>
                        <Input
                          className="form-control-alternative text-default"
                          readOnly
                          type="text"
                          value={project?.name}
                          name="name"
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="4" style={{ margin: 'auto' }}>
                      <FormGroup>
                        <label className="form-control-label">{t('Remaining Shares')}</label>
                        <Input
                          className="form-control-alternative text-default"
                          readOnly
                          type="text"
                          value={project?.remaining_shares}
                          name="name"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="4" style={{ margin: 'auto' }}>
                      <FormGroup>
                        <label className="form-control-label">
                          <span style={{ color: 'red' }}>{project?.deposit_amount ? '' : '*'} </span>
                          {t('Deposit Amount')}
                        </label>
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          type="number"
                          value={project?.deposit_amount}
                          name="deposit_amount"
                          onChange={handleDepositeAmount}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="4" style={{ margin: 'auto' }}>
                      <FormGroup>
                        <label className="form-control-label">{t('Assign Share')}</label>
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Caluclated shares"
                          type="number"
                          readOnly
                          value={project?.shares}
                          name="shares"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
              </Form>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>
            {t('Update')}
          </Button>

          <Button onClick={handleModal}>{t('Cancel')}</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default EditAssignProject;
