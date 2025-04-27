import { useState, useEffect, useRef } from 'react';
import axios from "axios";
import './App.css';
import Tabs from './components/Tabs';
import ReactJson from 'react-json-view'

function App() {
  const [base, setBase] = useState("") // Base URL
  const [url, setUrl] = useState(""); // API URL
  const [method, setMethod] = useState("GET"); // Request method
  const [protocol, setProtocol] = useState("http://"); // Protocol
  const [response, setResponse] = useState(null); // API response
  const [error, setError] = useState(null); // Error handling

  const [paramRows, setParamRows] = useState([{ key: "", value: "" }]);
  const [headerRows, setHeaderRows] = useState([
    { key: "Content-Type", value: "application/json" },
    { key: "Accept", value: "*/*" }
  ]);
  const [body, setBody] = useState("{}");
  const isInternalUrlUpdate = useRef(false);
  const isInternalParamUpdate = useRef(false);

  useEffect(() => {
    if (isInternalUrlUpdate.current) {
      isInternalUrlUpdate.current = false;
      return;
    }

    if(url === "") {
      isInternalParamUpdate.current = true;
      setParamRows([{key: "", value: ""}]);
    }

    if(url.includes("?")) {
      const [newBase, queryString] = url.split("?");
      setBase(newBase);
      const urlParams = new URLSearchParams(queryString);

      let parsedParams = Array.from(urlParams.entries()).map(([key, value]) => ({
        key: key,
        value: value
      }));

      if(parsedParams.length === 0) {
        parsedParams = [{key: "", value: ""}]
      }

      isInternalParamUpdate.current = true;
      setParamRows(parsedParams);
    }
    else {
      setBase(url);
      let parsedParams = [{key: "", value: ""}]
      isInternalParamUpdate.current = true;
      setParamRows(parsedParams);
    }
  }, [url])

  useEffect(() => {
    if (isInternalParamUpdate.current) {
      isInternalParamUpdate.current = false;
      return;
    }
    const queryString = getQueryString();
    const newUrl = queryString ? `${base}?${queryString}` : base;

    if (newUrl !== url) {
      isInternalUrlUpdate.current = true;
      setUrl(newUrl);
    }
  }, [paramRows]);

  const getQueryString = () => {
    return paramRows
      .filter(row => row.key && row.value)
      .map(row => `${encodeURIComponent(row.key)}=${encodeURIComponent(row.value)}`)
      .join("&");
  };

  const sendRequest = async () => {
    try {
      const paramsUrl = getQueryString();
      console.log(base);
      const fullUrl = `${protocol}${base}${paramsUrl ? `?${paramsUrl}` : ""}`;

      const headers = headerRows.reduce((acc: { [key: string]: string }, row) => {
        if (row.key && row.value) {
          acc[row.key] = row.value;
        }
        return acc;
      }, {});

      const requestBody = JSON.parse(body);

      const methodMap: Record<"GET" | "POST" | "PUT" | "DELETE", () => Promise<any>> = {
        GET: () => axios.get(fullUrl, { headers }),
        POST: () => axios.post(fullUrl, requestBody, { headers }),
        PUT: () => axios.put(fullUrl, requestBody, { headers }),
        DELETE: () => axios.delete(fullUrl, { headers }),
      };

      const result = await methodMap[method as "GET" | "POST" | "PUT" | "DELETE"]();

      setResponse(result.data);
      setError(null);
    } catch(err: any) {
      setResponse(err.response);
      setError(err.message || "An error occurred");
    }
  };

  return (
    <div data-bs-theme="dark" className="container text-light">
      <div className="input-form mb-4">
        <div className="input-group input-control">
          {/* Dropdown for HTTP Method */}
          <select className="form-select request-type-selector" value={method} onChange={(e) => setMethod(e.target.value)}>
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>

          {/* Dropdown for Protocol */}
          <select className="form-select protocol-type-selector" value={protocol} onChange={(e) => setProtocol(e.target.value)}>
            <option value="http://">HTTP</option>
            <option value="https://">HTTPS</option>
          </select>

          {/* Input for URL */}
          <input
            className="endpoint-input form-control"
            type="text"
            placeholder="Enter API URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>

        {/* Send Button */}
        <button className="send-request btn btn-primary" onClick={sendRequest}>Send</button>
      </div>

      <Tabs 
        paramRows={paramRows} 
        setParamRows={setParamRows} 
        headerRows={headerRows} 
        setHeaderRows={setHeaderRows}
        body={body}
        setBody={setBody}
      />

      {/* Display Response */}
      <div className="p-3 border rounded tab-content">
        <div className="mb-3">
          <span className='fw-bold'>Response</span>
        </div>
        {!response && !error && <div className="request-instruction">Send a request</div>}
        {error && <div className="error mb-3">{error}</div>}
        {response && <ReactJson src={response} theme="monokai" collapsed={false} />}
      </div>
    </div>
  );
};

export default App
