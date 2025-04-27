import { useState } from 'react';
import './Tabs.css';
import ParamsTab from './tabs/params/ParamsTab';
import HeadersTab from './tabs/headers/HeadersTab';
import BodyTab from './tabs/body/BodyTab';
import { TabsProps } from '../interfaces/interface';

function Tabs({ paramRows, setParamRows, headerRows, setHeaderRows, body, setBody }: TabsProps) {
  const [activeTab, setActiveTab] = useState("tab-params");

  const tabs = [
    { id: "tab-params", label: "Params", component: <ParamsTab paramRows={paramRows} setParamRows={setParamRows}/> },
    { id: "tab-headers", label: "Headers", component: <HeadersTab headerRows={headerRows} setHeaderRows={setHeaderRows}/> },
    { id: "tab-body", label: "Body", component: <BodyTab body={body} setBody={setBody} /> },
  ];

  const getCount = (tabId: string): number => {
    if(tabId === 'tab-params') {
      return paramRows.filter(item => item.key.trim() !== "" && item.value.trim() !== "").length
    }
    else if(tabId === 'tab-headers') {
      return headerRows.filter(item => item.key.trim() !== "" && item.value.trim() !== "").length
    }
    return 0
  }

  return (
    <div className="request-body mb-4">
      <ul className="nav nav-tabs">
        {tabs.map((tab) => {
          const count = getCount(tab.id);
          return (
            <li className="nav-item" key={tab.id}>
              <button
                className={`nav-link d-flex align-items-center ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              > 
                <span className="me-1">{tab.label}</span> 
                {count > 0 && 
                <span className="badge text-bg-primary">
                  {count}
                </span>}
              </button>
            </li>
          )})
        }
      </ul>

      <div className="p-3 border rounded tab-content">
        {tabs.map((tab) => (
          activeTab === tab.id && 
          <div key={tab.id}>
            {tab.component}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs
