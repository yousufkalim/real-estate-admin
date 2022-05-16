import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../api";
import Select from "react-select";
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
} from "reactstrap";
// core components

const AddAssignProject = ({
  openModal,
  handleModal,
  Projects,
  investor,
  getUserProjects,
  getProjects,
}) => {
  const [project, setProject] = useState({
    project: "",
    shares: "",
    remaining_shares: "",
  });
  const handleInput = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (project.project == "") {
      return toast.error("Project is required");
    }
    if (project.shares == "") {
      return toast.error("Shares Required");
    }
    if (parseInt(project.remaining_shares) < parseInt(project.shares)) {
      return toast.error("Shares should be lesser than remaining shares");
    }
    return api("put", `/investors/shares/${investor}`, project).then(() => {
      toast.success("Share has been added successfully");
      getUserProjects();
      getProjects();
      handleModal();
    });
  };

  const handleProjectChange = (e) => {
    setProject((project) => ({
      ...project,
      project: e.value,
      remaining_shares: e.r_s,
    }));
  };

  return (
    <>
      <Modal isOpen={openModal} size="xl" centered>
        <ModalHeader charCode="X" toggle={handleModal}>
          Add Project Shares
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col>
              <Form>
                <div className="pl-lg-4">
                  <Row>
                    <Col lg="3" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">Project</label>
                        <Select
                          onChange={handleProjectChange}
                          name="project"
                          className="form-control-alternative"
                          options={Projects?.map((project) => ({
                            value: project?._id,
                            label: project?.name,
                            r_s: project?.remaining_shares,
                          }))}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="3" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">
                          remaining_shares
                        </label>
                        <Input
                          readOnly
                          className="form-control-alternative text-default"
                          required={true}
                          type="number"
                          value={project?.remaining_shares}
                          name="remaining_shares"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="3" style={{ margin: "auto" }}>
                      <FormGroup>
                        <span style={{ color: "red" }}>
                          {project.shares ? "" : "*"}{" "}
                        </span>
                        <label className="form-control-label">
                          Assign Share
                        </label>
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter user's share here"
                          type="number"
                          value={project?.shares}
                          name="shares"
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
            Update
          </Button>
          <Button onClick={handleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AddAssignProject;
