import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../api';
import { Select } from 'antd';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button, FormGroup, Form, Input, Row, Col } from 'reactstrap';
// core components

const { Option } = Select;

const EditUser = ({ openModal, handleModal, user, setUser, getUsers }) => {
  const [phone, setPhone] = useState(user.phone);
  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const phoneChange = (e) => {
    setPhone(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (user.first_name == '') {
      return toast.error("Please enter user's first name");
    }

    if (user.last_name == '') {
      return toast.error("Please enter user's last name");
    }

    if (user.phone == '') {
      return toast.error('Contact no. is required');
    }
    if (phone.length < 9) {
      return toast.error('phone number atleast 8 characters long');
    }
    user.phone = '+' + phone;

    api('put', `/investors/${user._id}`, user).then((res) => {
      toast.success('Investor edited successfully');
      getUsers();
      handleModal();
    });
  };

  return (
    <>
      <Modal isOpen={openModal} size="xl" centered>
        <ModalHeader charCode="X" toggle={handleModal}>
          Edit a investor
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col>
              <Form>
                <div className="pl-lg-4">
                  <Row>
                    <Col lg="6" style={{ margin: 'auto' }}>
                      <FormGroup>
                        <span style={{ color: 'red' }}>{user.first_name ? '' : '*'} </span>
                        <label className="form-control-label">First Name</label>
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter user's first_name here"
                          type="text"
                          value={user.first_name}
                          name="first_name"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="6" style={{ margin: 'auto' }}>
                      <FormGroup>
                        <span style={{ color: 'red' }}>{user.last_name ? '' : '*'} </span>
                        <label className="form-control-label">Last Name</label>
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter user's last name here"
                          type="text"
                          value={user.last_name}
                          name="last_name"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="6" style={{ margin: 'auto' }}>
                      <FormGroup>
                        <label className="form-control-label">
                          <span style={{ color: 'red' }}>{phone ? '' : '*'} </span> Phone Number
                        </label>
                        <PhoneInput country={'eg'} enableSearch={true} value={phone} onChange={phoneChange} />
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

export default EditUser;
