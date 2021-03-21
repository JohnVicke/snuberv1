import { withUrqlClient } from 'next-urql';
import { Navbar } from '../components/Navbar';
import { createUrqlClient } from '../utils/createUrqlClient';

const Index = () => (
  <>
    <Navbar />
    hello world!
  </>
);

export default withUrqlClient(createUrqlClient)(Index);
