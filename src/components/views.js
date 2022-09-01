import { url } from '../config';
const View = ({ uri }) => {
  return (
    <>
      {uri && (
        <a href={url + uri} target='_blank'>
          &nbsp;
          <i className='fa fa-eye' />
        </a>
      )}
    </>
  );
};

export default View;
