import { useState } from "react";
import { toast } from "react-toastify";
import api from "../../api";
import { Select } from "antd";
import View from "../../components/views";
import FilePicker from "../../components/FilePicker";
import { UpdateStore } from "StoreContext";
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
import moment from "moment";
const { Option } = Select;
const AddProject = ({ openModal, handleModal, getProjects, disableDates }) => {
 
  let [project, setProject] = useState({
    dispaly_picture: "",
    name: "",
    total_cost: "",
    selling_price: "",
    start_date: "",
    end_date: "",
    total_shares: "",
    city: "",
  });

  const handleInput = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (project.name == "") {
      return toast.error("Please enter project's name");
    }
    if (project.start_date == "") {
      return toast.error("Please enter start date");
    }
    if (project.end_date == "") {
      return toast.error("Please enter start date");
    }
    if (project.total_cost == "") {
      return toast.error("Please enter total cost");
    }
    if (project.selling_price == "") {
      return toast.error("Please enter selling_price ");
    }
    let formData = new FormData();
    formData.append("name", project.name);
    formData.append("start_date", project.start_date);
    formData.append("end_date", project.end_date);
    formData.append("total_cost", project.total_cost);
    formData.append("selling_price", project.selling_price);
    if (project.dispaly_picture) {
      formData.append("file", project.dispaly_picture);
    }
    if (project.city) {
      formData.append("city", project.city);
    }
    if (project.total_shares) {
      formData.append("total_shares", project.total_shares);
    }
    api("post", "/projects", formData).then((res) => {
      toast.success("Project added successfully");
      getProjects();
      handleModal();
    });
  };
  return (
    <>
      <Modal isOpen={openModal} size="xl" centered>
        <ModalHeader charCode="X" toggle={handleModal}>
          Add a Project
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col>
              <Form>
                <div className="pl-lg-4">
                  <Row>
                    <Col lg="12">
                      <FormGroup style={{ width: "60%" }}>
                        <label className="form-control-label">
                          Add Main Picture{" "}
                          {/* <View url={project?.dispaly_picture} /> */}
                        </label>
                        <FilePicker
                          lableClassName="form-control-label"
                          htmlFor="input-image"
                          InputClassName="form-control-file form"
                          InputId="input-image"
                          InputName="dispaly_picture"
                          value={project?.dispaly_picture}
                          onChange={handleFileChange}
                        ></FilePicker>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="3" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">
                          {" "}
                          <span style={{ color: "red" }}>
                            {project.name ? "" : "*"}{" "}
                          </span>
                          Name
                        </label>{" "}
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter project's name here"
                          type="text"
                          value={project.name}
                          name="name"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="3" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">
                          Total Share
                        </label>{" "}
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter project's total shares here"
                          type="number"
                          value={project.total_shares}
                          name="total_shares"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="3" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">
                          {" "}
                          <span style={{ color: "red" }}>
                            {project.city ? "" : "*"}{" "}
                          </span>
                          City
                        </label>{" "}
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter project's city here"
                          type="city"
                          value={project.city}
                          name="city"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="6" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-date"
                        >
                          <span style={{ color: "red" }}>
                            {project.start_date ? "" : "*"}{" "}
                          </span>
                          Start Date
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-date"
                          placeholder={"Select Dates"}
                          type="date"
                          value={moment(project?.start_date).format(
                            "YYYY-MM-DD"
                          )}
                          name="start_date"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="6" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">
                          <span style={{ color: "red" }}>
                            {project.end_date ? "" : "*"}{" "}
                          </span>{" "}
                          End Date
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-date"
                          placeholder={"Select Dates"}
                          type="date"
                          value={moment(project?.end_date).format("YYYY-MM-DD")}
                          name="end_date"
                          min={disableDates()}
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="6" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">Total Cost</label>
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter project's total_cost here"
                          type="number"
                          value={project.total_cost}
                          name="total_cost"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="6" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">
                          Selling Price
                        </label>
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter project's selling_price here"
                          type="number"
                          value={project.selling_price}
                          name="selling_price"
                          onChange={handleInput}
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

export default AddProject;
