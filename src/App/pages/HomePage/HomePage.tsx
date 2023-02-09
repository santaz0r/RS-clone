import MainTitleBlock from '../../components/ui/Main/MainTitleBlock';
import Doctors from '../../components/ui/Doctors/Doctors';

function HomePage() {
  return (
    <div>
      <MainTitleBlock />
      <div>
        <h3>Our Doctors</h3>
        <Doctors />
      </div>
    </div>
  );
}

export default HomePage;
