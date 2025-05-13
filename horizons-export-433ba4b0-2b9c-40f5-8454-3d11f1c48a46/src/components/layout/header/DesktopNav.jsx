
    import React from 'react';
    import { Link } from 'react-router-dom';

    const NavLink = ({ to, children, icon: Icon }) => (
      <Link
        to={to}
        className="flex items-center px-3 py-2 text-sm font-medium text-brand-parchmentWhite/90 hover:text-brand-parchmentWhite hover:bg-brand-byzantineBlue/80 rounded-md transition-colors duration-150"
      >
        {Icon && <Icon className="w-5 h-5 mr-2" />}
        {children}
      </Link>
    );

    const DesktopNav = ({ isAuthenticated, navLinks, publicNavLinks }) => {
      const linksToRender = isAuthenticated ? navLinks : publicNavLinks;
      return (
        <nav className="hidden md:flex items-center space-x-1">
          {linksToRender.map((link) => (
            <NavLink key={link.to || link.text} to={link.to} icon={link.icon}>
              {link.text}
            </NavLink>
          ))}
        </nav>
      );
    };
    export default DesktopNav;
  