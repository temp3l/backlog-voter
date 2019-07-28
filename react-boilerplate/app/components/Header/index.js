import React from 'react';
import { FormattedMessage } from 'react-intl';
import LocaleToggle from 'containers/LocaleToggle';
// import A from './A';
// import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
// import Banner from './banner.jpg';
import messages from './messages';

function Header() {
  return (
    <div>
      <div style={{ position: 'absolute', right: '0px' }}>
        <LocaleToggle />
      </div>
      <NavBar>
        <HeaderLink to="/">
          <FormattedMessage {...messages.home} />
        </HeaderLink>
        <HeaderLink to="/features/">
          <FormattedMessage {...messages.features} />
        </HeaderLink>
        <HeaderLink to="/schemas/">
          <FormattedMessage {...messages.schemas} />
        </HeaderLink>
        <HeaderLink to="/schemos/">
          <FormattedMessage {...messages.schemas} />
        </HeaderLink>
        <HeaderLink to="/refd/">
          <FormattedMessage {...messages.schemas} />
        </HeaderLink>
      </NavBar>
    </div>
  );
}

export default Header;
