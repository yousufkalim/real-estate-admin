import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../api';
import { Select } from 'antd';
import View from '../../components/views';
import FilePicker from '../../components/FilePicker';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button, FormGroup, Form, Input, Row, Col } from 'reactstrap';
// core components
import moment from 'moment';
import { useTranslation } from 'react-i18next';
const { Option } = Select;
const EditProject = ({ openModal, handleModal, project, setProject, getProjects, disableDates }) => {
  const { i18n, t } = useTranslation();
  const { language } = i18n;
  const handleInput = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };
  const numberHandler = (e) => {
    const validatedValue = e.target.value.replace(/[^0-9]/g, '');
    setProject({ ...project, [e.target.name]: validatedValue });
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.includes('image')) {
      toast.error('Only image can be selected');
      return;
    }
    setProject({ ...project, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (project.name == '') {
      return toast.error("Please enter project's name");
    }
    if (project.start_date == '') {
      return toast.error('Please enter start date');
    }
    if (project.end_date == '') {
      return toast.error('Please enter start date');
    }
    if (project.end_date < project.start_date) {
      return toast.error('End date can never be earlier than start date');
    }
    if (project.total_cost == '') {
      return toast.error('Please enter total cost');
    }
    if (project.selling_price == '') {
      return toast.error('Please enter selling_price ');
    }
    if (project?.total_shares == '') {
      return toast.error('Total shares required');
    }
    if (parseInt(project?.total_shares) < parseInt(project?.old_shares)) {
      const remaining_shares = parseInt(project?.old_shares) - parseInt(project?.total_shares);
      if (parseInt(project.remaining_shares) < remaining_shares) {
        return toast.error('All shares has been  assigned you cant decrease shares now');
      }
    }
    let formData = new FormData();
    formData.append('projectId', project._id);
    formData.append('name', project.name);
    formData.append('start_date', project.start_date);
    formData.append('end_date', project.end_date);
    formData.append('total_cost', project.total_cost);
    formData.append('selling_price', project.selling_price);
    if (project.dispaly_picture) {
      formData.append('file', project.dispaly_picture);
    }
    if (project.city) {
      formData.append('city', project.city);
    }
    if (project.total_shares) {
      formData.append('total_shares', project.total_shares);
    }

    api('put', '/projects/update', formData).then((res) => {
      toast.success('project edited successfully');
      getProjects();
      handleModal();
    });
  };
  return (
    <>
      <Modal isOpen={openModal} size="xl" centered>
        <ModalHeader charCode="X" toggle={handleModal}>
          {t('Edit a Project')}
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col>
              <Form>
                <div className="pl-lg-4">
                  <Row>
                    <Col lg="12">
                      <FormGroup style={{ width: '60%' }}>
                        <label className="form-control-label">
                          {t('Add Main Picture')} <View url={project?.dispaly_picture} />
                        </label>
                        <FilePicker
                          lableClassName="form-control-label"
                          htmlFor="input-image"
                          InputClassName="form-control-file form"
                          InputId="input-image"
                          accept="image/png, image/jpeg"
                          InputName="dispaly_picture"
                          value={project?.dispaly_picture}
                          onChange={handleFileChange}
                        ></FilePicker>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="3" style={{ margin: 'auto' }}>
                      <FormGroup>
                        <label className="form-control-label">
                          {' '}
                          <span style={{ color: 'red' }}>{project.name ? '' : '*'} </span>
                          {t('Name')}
                        </label>{' '}
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder={t('Enter project name here')}
                          type="text"
                          value={project.name}
                          name="name"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="3" style={{ margin: 'auto' }}>
                      <FormGroup>
                        <label className="form-control-label">
                          {' '}
                          <span style={{ color: 'red' }}>{project.total_shares ? '' : '*'} </span>
                          {t('Total Shares')}
                        </label>{' '}
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder={t('Enter project total shares here')}
                          type="tel"
                          value={project?.total_shares}
                          name="total_shares"
                          onChange={numberHandler}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="3" style={{ margin: 'auto' }}>
                      <FormGroup>
                        <label className="form-control-label">
                          {' '}
                          <span style={{ color: 'red' }}>{project.city ? '' : '*'} </span>
                          {t('City')}
                        </label>{' '}
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder={t('Enter project city here')}
                          type="city"
                          value={project.city}
                          name="city"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="6" style={{ margin: 'auto' }}>
                      <FormGroup>
                        <label className="form-control-label" htmlFor="input-date">
                          <span style={{ color: 'red' }}>{project?.start_date ? '' : '*'} </span>
                          {t('Start Date')}
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-date"
                          placeholder={'Select Dates'}
                          type="date"
                          value={project?.start_date?.split('T')[0]}
                          name="start_date"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="6" style={{ margin: 'auto' }}>
                      <FormGroup>
                        <label className="form-control-label">
                          <span style={{ color: 'red' }}>{project?.end_date ? '' : '*'} </span> {t('End Date')}
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-date"
                          placeholder={'Select Dates'}
                          type="date"
                          value={project?.end_date?.split('T')[0]}
                          name="end_date"
                          min={disableDates()}
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="4" style={{ margin: 'auto' }}>
                      <FormGroup>
                        <label className="form-control-label">
                          {' '}
                          <span style={{ color: 'red' }}>{project.total_cost ? '' : '*'} </span>
                          {t('Total Cost')}
                        </label>{' '}
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder={t('Enter project total cost here')}
                          type="tel"
                          value={project?.total_cost}
                          name="total_cost"
                          onChange={numberHandler}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="4" style={{ margin: 'auto' }}>
                      <FormGroup>
                        <label className="form-control-label">
                          {' '}
                          <span style={{ color: 'red' }}>{project.selling_price ? '' : '*'} </span>
                          {t('Selling Price')}
                        </label>{' '}
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder={t('Enter project selling price here')}
                          type="tel"
                          value={project?.selling_price}
                          name="selling_price"
                          onChange={numberHandler}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="4" style={{ margin: 'auto' }}>
                      <FormGroup>
                        <label className="form-control-label"> {t('Remaining Share')}</label>
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          readOnly
                          type="number"
                          value={project?.remaining_shares}
                          name="remaining_shares"
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
            Update
          </Button>

          <Button onClick={handleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default EditProject;
