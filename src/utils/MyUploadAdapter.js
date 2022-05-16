import axios from "axios";

class MyUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }
  // Starts the upload process.
  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          const formData = new FormData();
          formData.append("image", file);

          axios
            .post(`${process.env.REACT_APP_SERVER_URL}/images`, formData)
            .then((res) => {
              console.log(res);
              resolve({
                default:
                  process.env.REACT_APP_SERVER_MEDIA_URL + res.data.image,
              });
            });
        })
    );
  }
}

export default MyUploadAdapter;
