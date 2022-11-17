import type {NextPage} from 'next';
import '../src/simple-greeter.ts';
// eslint-disable-next-line import/extensions
import SimpleGreeter from '../src/SimpleGreeter';

const Home: NextPage = () => {
  return (
    <div>
      <main>
        {/* <simple-greeter name="Friend"></simple-greeter> */}
        <SimpleGreeter name="React" />
      </main>
    </div>
  );
};

export default Home;
