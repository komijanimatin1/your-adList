import Header from '../Components/Header';
import List from '../Components/List';

export default function Home() {


  return (
    <div className="border border-gray-400">
      <section className="border-b-2 border-gray-700 pb-4 flex items-center flex-col">
        <Header />
      </section>
      <section>
        <h2 className="text-white text-center font-bold my-4">Available Advertisements</h2>
        <List />
      </section>
    </div>
  );
}
