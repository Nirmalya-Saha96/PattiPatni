import React from 'react';
import { Menu, Segment } from 'semantic-ui-react'
import { Link } from '../routes';

export default () => {

    return (
      <Menu stackable style={{ marginTop: '10px' }}>
        <Menu.Item>
        <Link route="/">
          <a className="item">PATTIPATNI</a>
        </Link>
        </Menu.Item>

        <Menu.Item>
        <Link route="/marriage">
          <a className="item">MARRIAGE</a>
        </Link>
        </Menu.Item>

        <Menu.Item>
        <Link route="/childbirth">
          <a className="item">CHILD</a>
        </Link>
        </Menu.Item>

        <Menu.Item>
        <Link route="/divorce">
          <a className="item">DIVORCE</a>
        </Link>
        </Menu.Item>

        <Menu.Item>
        <Link route="/certificate">
          <a className="item">CERTIFICATE</a>
        </Link>
        </Menu.Item>

        <Menu.Item>
        <Link route="/publicforeum">
          <a className="item">PUBLIC FOREUM</a>
        </Link>
        </Menu.Item>
      </Menu>
    );
};
