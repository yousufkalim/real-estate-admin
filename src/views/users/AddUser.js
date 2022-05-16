import { useState } from "react";
import { toast } from "react-toastify";
import api from "../../api";
import { Select } from "antd";
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Label,
} from "reactstrap";
// core components

const { Option } = Select;

const AddUser = ({ openModal, handleModal, getUsers }) => {
  let [user, setUser] = useState({
    first_name: "",
    last_name: "",
    phone: "",
  });

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.first_name == "") {
      return toast.error("Please enter user's name");
    }
    if (user.last_name == "") {
      return toast.error("Please enter user's name");
    }
    if (user.phone == "") {
      return toast.error("Contact no. is required");
    }

    api("post", "/investors", user).then((res) => {
      toast.success("User added successfully");
      getUsers();
      handleModal();
    });
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
                    <Col lg="6" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">
                          {" "}
                          <span style={{ color: "red" }}>
                            {user.first_name ? "" : "*"}{" "}
                          </span>
                          First Name
                        </label>{" "}
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
                    <Col lg="6" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">
                          {" "}
                          <span style={{ color: "red" }}>
                            {user.last_name ? "" : "*"}{" "}
                          </span>
                          Last Name
                        </label>{" "}
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
                    <Col lg="6" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">
                          <span style={{ color: "red" }}>
                            {user.phone ? "" : "*"}{" "}
                          </span>{" "}
                          Contact no.
                        </label>
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter user's contact here"
                          type="phone"
                          value={user.phone}
                          name="phone"
                          onChange={handleInput}
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
