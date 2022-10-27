/* eslint-disable import/extensions */
import type {NextPage} from 'next';
import styles from '../styles/Home.module.css';
import '../src/simple-greeter.ts';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <simple-greeter></simple-greeter>
      </main>
    </div>
  );
};

export default Home;
