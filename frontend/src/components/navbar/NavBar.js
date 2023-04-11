import mainlogo from '../../main-logo-air.png';

const NavBar = ({ navigate }) => {

  return (
    <nav data-cy="nav" className='nav'>
      <div data-cy="logo-container" className="logo-container">
        <img src={mainlogo}/>
      </div>
    </nav>
  );
};

export default NavBar;