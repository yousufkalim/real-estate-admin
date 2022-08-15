import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../api';
import Select from 'react-select';
import moment from 'moment';
import View from '../../components/views';
import FilePicker from '../../components/FilePicker';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button, FormGroup, Form, Input, Row, Col } from 'reactstrap';
import { useTranslation } from 'react-i18next';

// core components

const { Option } = Select;

const EditNews = ({ openModal, handleModal, news, setNews, getAllNews, disableDates }) => {
  const [projects, setProjects] = useState([]);
  const [pictures, setPictures] = useState({
    files: [],
  });
  const { i18n, t } = useTranslation();
  const { language } = i18n;
  const handleInput = (e) => {
    setNews({ ...news, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setPictures({
      ...pictures,
      files: [...pictures.files, ...e.target.files],
    });
  };
  const numberHandler = (e) => {
    const validatedValue = e.target.value.replace(/[^0-9]/g, '');
    setNews({ ...news, [e.target.name]: validatedValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('project', news.project_id);
    if (news.news_date) {
      formData.append('news_date', news.news_date);
    }
    if (news.end_date) {
      formData.append('end_date', news.end_date);
    }
    if (news.end_date && news.news_date) {
      if (news.end_date < news.news_date) {
        return toast.error(`${t('End date can never be earlier than start date')}`);
      }
    }
    if (news.selling_price) {
      if (parseInt(news.selling_price) < 1) {
        return toast.error(`${t('Selling price should be greater than 1')}`);
      }
      formData.append('selling_price', news.selling_price);
    }
    if (news.total_cost) {
      if (parseInt(news.total_cost) < 1) {
        return toast.error(`${t('Total Cost should be greater than 1')}`);
      }
      formData.append('total_cost', news.total_cost);
    }
    if (news.pictures.length > 0) {
      news.pictures.map((e) => {
        formData.append('files', e);
      });
    }
    api('put', `/news/${news?._id}`, formData).then((res) => {
      toast.success(`${t('News edited successfully')}`);
      getAllNews();
      handleModal();
    });
  };

  return (
    <>
      <Modal isOpen={openModal} size="xl" centered>
        <ModalHeader charCode="X" toggle={handleModal}>
          {t('Edit news')}
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col>
              <Form>
                <div className="pl-lg-4">
                  <Row>
                    <Col lg="12">
                      {news?.pictures?.length > 0 ? (
                        <>
                          <FormGroup style={{ width: '100%' }}>
                            <label className="form-control-label">{t('News Pictures')}</label>
                            <br></br>
                            <label className="form-control-label" style={{ display: 'flex' }}>
                              {news.pictures.map((file) => (
                                <>
                                  <h5>
                                    {file.split('-').pop()}
                                    {''}
                                  </h5>
                                  <View url={file} />
                                </>
                              ))}
                            </label>
                          </FormGroup>
                        </>
                      ) : (
                        <label className="form-control-label">{t('No Picture Selected')}</label>
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="4" style={{ margin: 'auto' }}>
                      <FormGroup>
                        <label className="form-control-label">
                          {' '}
                          <span style={{ color: 'red' }}>{news.project ? '' : '*'} </span>
                          {t('Select Project')}
                        </label>{' '}
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          type="text"
                          value={news.project}
                          name="project"
                          readOnly
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="4" style={{ margin: 'auto' }}>
                      <FormGroup>
                        <label className="form-control-label">
                          {' '}
                          <span style={{ color: 'red' }}>{news.news_date ? '' : '*'} </span>
                          {t('News Date')}
                        </label>{' '}
                        <Input
                          className="form-control-alternative"
                          id="input-date"
                          placeholder={'Select Dates'}
                          type="date"
                          value={news?.news_date?.split('T')[0]}
                          name="news_date"
                          min={disableDates()}
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="4" style={{ margin: 'auto' }}>
                      <FormGroup>
                        <label className="form-control-label">End Date</label>
                        <Input
                          className="form-control-alternative"
                          id="input-date"
                          placeholder={'Select Dates'}
                          type="date"
                          value={news?.end_date?.split('T')[0]}
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
                        <label className="form-control-label">{t('Total Cost')}</label>
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder={t('Enter total cost here')}
                          type="number"
                          value={news?.total_cost}
                          name="total_cost"
                          onChange={numberHandler}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="4" style={{ margin: 'auto' }}>
                      <FormGroup>
                        <label className="form-control-label">{t('Selling Price')}</label>
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder={t('Enter selling price here')}
                          type="number"
                          value={news?.selling_price}
                          name="selling_price"
                          onChange={numberHandler}
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

export default EditNews;
