import React from 'react';
import Layout from '../components/Layout';

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = ({}) => {
  return (
    <Layout active="dashboard">
      <div>hello world</div>
    </Layout>
  );
};

export default Dashboard;
