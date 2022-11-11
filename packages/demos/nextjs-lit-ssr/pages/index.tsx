import type {NextPage} from 'next';
import '../src/simple-greeter.ts';

const Home: NextPage = () => {
  return (
    <div>
      <main>
        <simple-greeter name="Friend"></simple-greeter>
      </main>
    </div>
  );
};

export default Home;
