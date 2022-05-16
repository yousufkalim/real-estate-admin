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
} from "reactstrap";
// core components

const { Option } = Select;

const EditNews = ({ openModal, handleModal, news, setNews, getAllNews }) => {
  const [projects, setProjects] = useState([]);
  const [pictures, setPictures] = useState({
    files: [],
  });
  const handleInput = (e) => {
    setNews({ ...news, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setPictures({
      ...pictures,
      files: [...pictures.files, ...e.target.files],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("project", news.project_id);
    if (news.news_date) {
      formData.append("news_date", news.news_date);
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
    console.log(news);
    // console.log(formData);

    api("put", `/news/${news?._id}`, formData).then((res) => {
      toast.success("News edited successfully");
      getAllNews();
      handleModal();
    });
  };

  return (
    <>
      {console.log(news, "n")}
      <Modal isOpen={openModal} size="xl" centered>
        <ModalHeader charCode="X" toggle={handleModal}>
          Edit a news
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col>
              <Form>
                <div className="pl-lg-4">
                  {/* <Row>
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
                  </Row> */}
                  <Row>
                    <Col lg="4" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">
                          Select Project
                        </label>
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter project's name here"
                          type="text"
                          value={news.project}
                          name="project"
                          readOnly
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
                          value={news?.news_date?.split("T")[0]}
                          name="news_date"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="4" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">End Date</label>
                        <Input
                          className="form-control-alternative"
                          id="input-date"
                          placeholder={"Select Dates"}
                          type="date"
                          value={news?.end_date?.split("T")[0]}
                          name="end_date"
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
            Update
          </Button>

          <Button onClick={handleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default EditNews;
