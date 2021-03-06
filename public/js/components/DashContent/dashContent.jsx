import React, {useState, useEffect} from 'react';
import {connect, useDispatch} from 'react-redux';
import {GoogleApiWrapper} from 'google-maps-react';
import {deleteCampSites, editCampSites} from '../../actions/campSitesActions';
import DashContent from './styled';
import SolidButton from '../solidButton';
import AddNewModal from '../addNewModal/addNewModal';
import Maps from '../map/map';
import EditSiteView from '../EditView/editView';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';

const DashMain = props => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentLatitude, setCurrentLatitude] = useState('');
  const [currentLongitude, setCurrentLongitude] = useState('');
  const [campData, setCampData] =useState([])

  const {campSitesReducer} = props;
  const dispatch = useDispatch();

  useEffect(() => {
    setCampData(campSitesReducer);
  }, [campSitesReducer.length]);

  const openModal = () => {
    setModalIsOpen(true);
    return;
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  //These functions can grab the users location from html 5 api
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }

  function showPosition(position) {
    console.log(position.coords.latitude, position.coords.longitude);
    setCurrentLatitude(position.coords.latitude);
    setCurrentLongitude(position.coords.longitude);
  }

  useEffect(() => {
    getLocation();
  }, []);
  ///////////////////////////////////////////////////////////////////

  return (
    <DashContent>
      <AddNewModal
        open={modalIsOpen}
        onClose={closeModal}
        currentLatitude={currentLatitude}
        currentLongitude={currentLongitude}
      />
      <div id="content-area">
        <div className="heading">
          <div>
            <h1>My Camp Companion</h1>
            <p>
              Where you can save all the memories and locations for your
              favorite campsites!
            </p>
          </div>
          <div>
            <SolidButton
              color="secondary"
              innerText="New Camp Site"
              function={openModal}
            ></SolidButton>
          </div>
        </div>

        <div id="map-placeholder">
          <Maps
            currentLatitude={currentLatitude}
            currentLongitude={currentLongitude}
            campSites={campSitesReducer}
          ></Maps>
        </div>

        <div>
          <h2>My Camp Sites</h2>
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Coordinates</th>
              <th>Dates of Stay</th>
              <th>Notes</th>
              <th>Controls</th>
            </tr>
          </thead>
          <tbody>
            {(campSitesReducer && campData).map((site, index) => {
              return (
                <tr key={index}>
                  <td>
                    <> {site.name}</>
                  </td>
                  <td>{JSON.stringify(site.coordinates)}</td>
                  <td>{site.datesOfStay}</td>
                  <td>{site.notes}</td>
                  <td>
                    <>
                      <CloseIcon
                        onClick={() =>
                          dispatch(deleteCampSites(campSitesReducer, site.id))
                        }
                      />
                    </>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </DashContent>
  );
};

const mapStateToProps = state => ({
  campSitesReducer: state.campSitesReducer,
});

export default connect(mapStateToProps)(
  GoogleApiWrapper({
    apiKey: process.env.MAPS_API_KEY,
  })(DashMain),
);
