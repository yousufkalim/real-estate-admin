import { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../api';
import { Select } from 'antd';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button, FormGroup, Form, Input, Row, Col, Label } from 'reactstrap';
// core components

const { Option } = Select;

const AddUser = ({ openModal, handleModal, getUsers }) => {
  let [user, setUser] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    country_code: '',
  });
  const [phone, setPhone] = useState('');
  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.first_name == '') {
      return toast.error("Please enter user's name");
    }
    if (user.last_name == '') {
      return toast.error("Please enter user's name");
    }
    if (phone == '') {
      return toast.error('country code is required');
    }
    if (user.phone == '') {
      return toast.error('Contact no. is required');
    }
    user.country_code = phone;
    api('post', '/investors', user).then((res) => {
      toast.success('User added successfully');
      getUsers();
      handleModal();
    });
  };

  const phoneChange = (e) => {
    setPhone(e);
  };
  // validate value
  const numberHandler = (e) => {
    const validatedValue = e.target.value.replace(/[^0-9]/g, '');
    setUser({ ...user, phone: validatedValue });
  };

  return (
    <>
      <Modal isOpen={openModal} size="xl" centered>
        <ModalHeader charCode="X" toggle={handleModal}>
          Add a Investor
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col>
              <Form>
                <div className="pl-lg-4">
                  <Row>
                    <Col lg="6" style={{ margin: 'auto' }}>
                      <FormGroup>
                        <label className="form-control-label">
                          {' '}
                          <span style={{ color: 'red' }}>{user.first_name ? '' : '*'} </span>
                          First Name
                        </label>{' '}
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter investor's first name here"
                          type="text"
                          value={user.first_name}
                          name="first_name"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="6" style={{ margin: 'auto' }}>
                      <FormGroup>
                        <label className="form-control-label">
                          {' '}
                          <span style={{ color: 'red' }}>{user.last_name ? '' : '*'} </span>
                          Last Name
                        </label>{' '}
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter investor's last name here"
                          type="text"
                          value={user.last_name}
                          name="last_name"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="4" style={{ margin: 'auto' }}>
                      <FormGroup>
                        <label className="form-control-label">
                          <span style={{ color: 'red' }}>{phone ? '' : '*'} </span> country code
                        </label>
                        <PhoneInput country={'eg'} enableSearch={true} value={phone} onChange={phoneChange} />
                      </FormGroup>
                    </Col>

                    <Col lg="4" style={{ margin: 'auto' }}>
                      <FormGroup>
                        <label className="form-control-label">
                          <span style={{ color: 'red' }}>{user.phone ? '' : '*'} </span> Contact no.
                        </label>
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter user's contact here"
                          type="tel"
                          value={user.phone}
                          name="phone"
                          onChange={(e) => numberHandler(e)}
                          maxLength="13"
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
            Save
          </Button>

          <Button onClick={handleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AddUser;
