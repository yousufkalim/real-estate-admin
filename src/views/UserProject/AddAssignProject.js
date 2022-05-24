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
    shares: 0,
    remaining_shares: 0,
    deposit_amount: 0,
    investor: investor,
  });

  const handleDepositeAmount = (e) => {
    if (e.target.value < 0) {
      return toast.error("Deposit amount should be greater than 0");
    }
    let shares = e.target.value / +project?.unit_share;
    shares = Math.round(shares * 100 + Number.EPSILON) / 100;
    setProject({
      ...project,
      [e.target.name]: e.target.value,
      shares: shares,
    });
  };

  const handleProjectChange = (e) => {
    setProject((project) => ({
      ...project,
      project: e.value,
      remaining_shares: e.r_s,
      unit_share: e.unit_share,
      deposit_amount: 0,
      shares: 0,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (project.project == "") {
      return toast.error("Project is required");
    }
    if (project.deposit_amount == "") {
      return toast.error("Deposit Amount is required");
    }
    if (project.shares == "") {
      return toast.error("Shares Required");
    }
    if (parseInt(project.remaining_shares) < parseInt(project.shares)) {
      return toast.error("Shares should be lesser than remaining shares");
    }
    return api("post", `/shares/assignShare`, project).then(() => {
      toast.success("Share has been added successfully");
      getUserProjects();
      getProjects();
      handleModal();
    });
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
                    <Col lg="6" style={{ margin: "auto" }}>
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
                            unit_share: project?.unit_share,
                          }))}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="6" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">
                          <span style={{ color: "red" }}>
                            {project?.deposit_amount ? "" : "*"}{" "}
                          </span>
                          Deposit Amount
                        </label>
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          readOnly={!project.project}
                          type="number"
                          value={project?.deposit_amount}
                          name="deposit_amount"
                          onChange={handleDepositeAmount}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="6" style={{ margin: "auto" }}>
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
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="6" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">
                          Assign Share
                        </label>
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
            Update
          </Button>
          <Button onClick={handleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AddAssignProject;
