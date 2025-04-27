import { useCallback } from "react";
import './ParamsTab.css'
import { ParamsTabProps } from '../../../interfaces/interface';

function ParamsTab({ paramRows, setParamRows }: ParamsTabProps) {
  const handleInputChange = useCallback(
    (index: number, field: "key" | "value", value: string) => {
      setParamRows((prevRows) =>
        prevRows.map((row, i) =>
          i === index ? { ...row, [field]: value } : row
        )
      );
    },
    [setParamRows]
  );

  const addRow = () => {
    setParamRows((prevRows) => [...prevRows, { key: "", value: "" }]);
  };

  const removeRow = (index: number) => {
    setParamRows((prevRows) => prevRows.filter((_, i) => i !== index));
  };
  
  return (
    <div>
      <div className="mb-3">
        <span className='fw-bold'>Query Params</span>
      </div>
      <div>
        <table className="table table-bordered">
          <thead>
              <tr>
                <th>Key</th>
                <th>Value</th>
                <th className="actions-column"></th>
              </tr>
          </thead>
          <tbody>
            {paramRows.map((row, index) => (
              <tr key={index}>
                <td>
                  <input
                      type="text"
                      className="form-control"
                      value={row.key}
                      onChange={(e) => handleInputChange(index, "key", e.target.value)}
                      placeholder="Enter key"
                  />
                </td>
                <td>
                  <input
                      type="text"
                      className="form-control"
                      value={row.value}
                      onChange={(e) => handleInputChange(index, "value", e.target.value)}
                      placeholder="Enter value"
                  />
                </td>
                <td className='actions-column'>
                  <button className="btn btn-outline-danger" disabled={paramRows.length === 1} onClick={() => removeRow(index)}>
                      Delete <i className="bi bi-trash3-fill"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="btn btn-outline-primary" onClick={addRow}>
          Add <i className="bi bi-plus-circle"></i>
        </button>
      </div>
    </div>
  );
};

export default ParamsTab
