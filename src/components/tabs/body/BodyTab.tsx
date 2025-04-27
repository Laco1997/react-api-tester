import './BodyTab.css';
import { BodyProps } from '../../../interfaces/interface';

function BodyTab({ body, setBody }: BodyProps) {
  return (
    <div>
      <div className='mb-3'>
        <span className='fw-bold'>JSON</span>
      </div>
      <textarea
        className="form-control json-input"
        placeholder="Request body (JSON format)"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
    </div>
  );
};

export default BodyTab
