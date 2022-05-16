const View = ({ url }) => {
  return (
    <>
      {url && (
        <a href={process.env.REACT_APP_SERVER_MEDIA_URL + url} target="_blank">
          &nbsp;
          <i className="fa fa-eye" />
        </a>
      )}
    </>
  );
};

export default View;
