import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../api";
import Select from "react-select";
import moment from "moment";
import View from "../../components/views";
import FilePicker from "../../components/FilePicker";
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

const AddNews = ({
  openModal,
  handleModal,
  getNews,
  Projects,
  disableDates,
}) => {
  useEffect(() => {
    getProjects();
  }, []);
  let [news, setNews] = useState({
    project: "",
    end_date: "",
    news_date: "",
    selling_price: "",
    total_cost: "",
  });

  let [projects, setProjects] = useState([]);
  const [pictures, setPictures] = useState({
    files: [],
  });

  const handleInput = (e) => {
    setNews({ ...news, [e.target.name]: e.target.value });
  };

  const handleProjectChange = (e) => {
    setNews(() => ({
      ...news,
      project: e.value,
    }));
  };

  const handleFileChange = (e) => {
    setPictures({
      ...pictures,
      files: [...pictures.files, ...e.target.files],
    });
  };

  const getProjects = async () => {
    return await api("get", "/projects").then((data) => {
      setProjects(data?.projects);
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    if (news.project == "") {
      return toast.error("Please  select project ");
    }
    if (news.news_date == "") {
      return toast.error("News Date is required");
    }
    formData.append("project", news.project);
    formData.append("news_date", news.news_date);

    if (
      news.end_date == "" &&
      news.selling_price == "" &&
      news.total_cost == "" &&
      pictures.files.length < 1
    ) {
      return toast.error("Please  add one more field atleast ");
    }

    if (pictures.files.length > 0) {
      pictures.files.map((e) => {
        formData.append("files", e);
      });
    }
    if (news.end_date) {
      formData.append("end_date", news.end_date);
    }

    if (news.selling_price) {
      formData.append("selling_price", news.selling_price);
    }
    if (news.total_cost) {
      formData.append("total_cost", news.total_cost);
    }
    api("post", "/news", formData).then((res) => {
      toast.success("News added successfully");
      getNews();
      handleModal();
    });
  };

  return (
    <>
      {console.log(news, "n")}
      <Modal isOpen={openModal} size="xl" centered>
        <ModalHeader charCode="X" toggle={handleModal}>
          Add a News
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
                          Add Main Picture <View url={news?.pictures} />
                        </label>
                        <FilePicker
                          lableClassName="form-control-label"
                          htmlFor="input-image"
                          InputClassName="form-control-file form"
                          InputId="input-image"
                          InputName="pictures"
                          value={news?.pictures}
                          onChange={handleFileChange}
                        ></FilePicker>
                      </FormGroup>
                      <div>
                        {pictures?.files?.map((val) => (
                          <span> {val?.name} </span>
                        ))}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="4" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">
                          Select Project
                        </label>
                        <Select
                          onChange={handleProjectChange}
                          name="project"
                          className="form-control-alternative"
                          options={projects?.map((project) => ({
                            value: project?._id,
                            label: project?.name,
                          }))}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="4" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-date"
                        >
                          News Date
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-date"
                          placeholder={"Select Dates"}
                          type="date"
                          value={moment(news?.news_date).format("YYYY-MM-DD")}
                          name="news_date"
                          min={disableDates()}
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="4" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-date"
                        >
                          Project End Date
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-date"
                          placeholder={"Select Dates"}
                          type="date"
                          value={moment(news?.end_date).format("YYYY-MM-DD")}
                          name="end_date"
                          min={disableDates()}
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="4" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">Total Cost</label>
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter news's total_cost here"
                          type="number"
                          value={news.total_cost}
                          name="total_cost"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="4" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">
                          Selling Price
                        </label>
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter news's selling_price here"
                          type="number"
                          value={news.selling_price}
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

export default AddNews;
