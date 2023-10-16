import { ConfigProvider } from 'antd';
import './App.css';
import Layout from './component/layout/Layout';

function App() {
  return (
    <ConfigProvider
    theme={{
      token: {
        // Seed Token
        colorPrimary: '#0073a8',
        borderRadius: 2,

        // Alias Token
        colorBgContainer: '#f0f0f6',
        borderRadius: '16px'
      },
    }}
  >
    <Layout />
    </ConfigProvider>
  );
}

export default App;
