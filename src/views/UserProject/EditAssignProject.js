import { useEffect, useState } from "react";
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
} from "reactstrap";
// core components

const EditAssignProject = ({
  openModal,
  handleModal,
  project,
  setProject,
  getProjects,
  getUserProjects,
  investor,
}) => {
  const handleInput = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (project.shares == "") {
      return toast.error("Share's required");
    }
    if (parseInt(project.shares) < 1) {
      return toast.error("Share's required");
    }
    const total_shares =
      parseInt(project.shares) - parseInt(project.old_shares);
    if (total_shares > parseInt(project.remaining_shares)) {
      return toast.error("Shares should be lesser than remaining shares");
    }
    api("put", `/investors/editAssignShare/${investor}`, project).then(() => {
      toast.success("Project edited successfully");
      getProjects();
      getUserProjects();
      handleModal();
    });
  };

  return (
    <>
      <Modal isOpen={openModal} size="xl" centered>
        <ModalHeader charCode="X" toggle={handleModal}>
          Edit Project Shares
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col>
              <Form>
                <div className="pl-lg-4">
                  <Row>
                    <Col lg="4" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">Project</label>
                        <Input
                          className="form-control-alternative text-default"
                          readOnly
                          type="text"
                          value={project?.name}
                          name="name"
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="4" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">
                          remaining_shares
                        </label>
                        <Input
                          className="form-control-alternative text-default"
                          readOnly
                          type="text"
                          value={project?.remaining_shares}
                          name="name"
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="4" style={{ margin: "auto" }}>
                      <FormGroup>
                        <span style={{ color: "red" }}>
                          {project.shares ? "" : "*"}{" "}
                        </span>
                        <label className="form-control-label">Shares</label>
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

export default EditAssignProject;
