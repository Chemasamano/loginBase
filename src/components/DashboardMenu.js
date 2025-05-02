import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import './DashboardMenu.css';

library.add(fas);

const MenuItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  //const hasChildren = item.hijos && item.hijos.length > 0;
  const hasChildren = item?.hijos?.length > 0;

  const toggleSubmenu = () => {
    if (hasChildren) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <li className={`menu-item ${hasChildren ? 'has-children' : ''} ${isOpen ? 'open' : ''}`}>
      {item?.ruta ? ( // Seguridad con optional chaining
        <Link to={item.ruta} className="menu-link" onClick={hasChildren ? toggleSubmenu : null}>
          {item?.icono && <FontAwesomeIcon icon={item.icono} className="menu-icon" />}
          <span>{item?.nombreMenu}</span>
          {hasChildren && <span className="arrow">{isOpen ? <FontAwesomeIcon icon="chevron-up" /> : <FontAwesomeIcon icon="chevron-down" />}</span>}
        </Link>
      ) : (
        <div className="menu-link" onClick={toggleSubmenu}>
          {item?.icono && <FontAwesomeIcon icon={item.icono} className="menu-icon" />}
          <span>{item?.nombreMenu}</span>
          {hasChildren && <span className="arrow"><FontAwesomeIcon icon={isOpen ? 'chevron-up' : 'chevron-down'} /></span>}
        </div>
      )}
      {hasChildren && (
        <ul className={`submenu ${isOpen ? 'open' : ''}`}>
          {item.hijos.map((child) => (
            <MenuItem key={child.idMenu} item={child} />
          ))}
        </ul>
      )}
    </li>
  );
};

const DashboardMenu = ({ menu }) => {
    useEffect(() => {
      console.log('Prop menu recibida en DashboardMenu:', menu);
    }, [menu]); // Se ejecutará cada vez que la prop 'menu' cambie
  
    if (!Array.isArray(menu)) {
      console.error('Error: La prop "menu" no es un array válido.', menu);
      return null; // No renderizar nada si 'menu' no es un array
    }
  
    return (
      <nav className="dashboard-nav">
        <ul className="main-menu">
          {menu.map((item) => (
            <MenuItem key={item.idMenu} item={item} />
          ))}
        </ul>
      </nav>
    );
  };

export default DashboardMenu;