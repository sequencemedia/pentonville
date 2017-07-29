import React from 'react';

import { storiesOf } from '@storybook/react';

import Pentonville from '../index';

storiesOf('Pentonville', module)
  .add('With one tabable child', () => (
    <Pentonville>
      <p tabIndex='0'>
        Lorem ipsum
      </p>
    </Pentonville>
  ))
  .add('With several tabable children', () => (
    <Pentonville>
      <p tabIndex='0'>
        Lorem ipsum
      </p>
      <form>
        <input tabIndex='1' />
        <input />
        <input />
        <input tabIndex='2' type='radio' name='a' value='1' />
        <input type='radio' name='a' value='2' />
        <input type='radio' name='a' value='3' />
        <input type='checkbox' name='1' value='1' />
        <input type='checkbox' name='2' value='2' />
        <input type='checkbox' name='3' value='3' />
        <select tabIndex='3' name='4'>
          <option value='5'>Five</option>
          <option value='6'>Six</option>
          <option value='7'>Seven</option>
        </select>
      </form>
      <p tabIndex='0'>
        Lorem ipsum
      </p>
    </Pentonville>
  ))
  .add('Without tabable children', () => (
    <Pentonville>
      <p>
        Lorem ipsum
      </p>
    </Pentonville>
  ));
