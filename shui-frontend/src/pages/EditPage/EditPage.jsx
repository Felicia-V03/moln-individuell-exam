import './editPage.css';
import Navigation from '../../components/Navigation/Navigation';
import BackButton from '../../components/BackButton/BackButton';
import { useParams } from 'react-router-dom'; 
import EditMessage from '../../components/EditMessage/EditMessage';

const EditPage = () => {
  const { id } = useParams();

  return (
    <section className='edit-page'>
      <header>
        < BackButton />
        <h1 className="edit-page__title">EDIT MESSAGE</h1>
        < Navigation />
      </header>

      <EditMessage id={ id }/>
    </section>
  )
};

export default EditPage;