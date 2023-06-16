import {Text, View} from 'react-native';
import TopBar from '../../components/TopBar';
import { PageContainer } from '../../components/Container';
import { Heading } from '../../components/Typography';
import { TraingBox } from '../../components/TrainingBox';
import { trainings } from '../../data/traings';
import { assets } from '../../config/AssetsConfig';

const Home = ({navigation}) => {
console.log(assets,'trainingstrainings')
  return (
    <>
      <TopBar/>
      <PageContainer>
        <Heading>Training.</Heading>

        {trainings.map((item,key) => (
          <TraingBox item={item} key={key} />
        ))}

        
      </PageContainer>
    </>
  );
};
export default Home;
