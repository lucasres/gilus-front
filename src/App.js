import React from 'react';
import LayoutApp from "./ui/layout";
import { BreadcrumbProvider } from './ui/context/Breadcrumb';
import Dashboard from './ui/pages/Dashboard';
import Executions from './ui/pages/Executions';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ConfigProvider } from 'antd';

const App = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#4319b0",
          colorBgBase: "#ebe7e4",
          colorLink: "#4319b0",
        }
      }}
    >
      <BreadcrumbProvider>
        <BrowserRouter>
          <LayoutApp>
            <Routes>
              <Route path="/" element={<Dashboard/>}/>
              <Route path="/executions" element={<Executions/>}/>
            </Routes>
          </LayoutApp>
        </BrowserRouter>
      </BreadcrumbProvider>
    </ConfigProvider>
  );
};
export default App;