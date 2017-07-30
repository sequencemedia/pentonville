import React from 'react'
import { storiesOf } from '@storybook/react'
import Pentonville from '../index'

storiesOf('Pentonville', module)
  .add('With one tabable child', () => (
    <div tabIndex='0'>
      <Pentonville>
        <p tabIndex='0'>
          Lorem ipsum
        </p>
      </Pentonville>
    </div>
  ))
  .add('With several tabable children', () => (
    <div tabIndex='0'>
      <Pentonville>
        <p tabIndex='0'>
          Lorem ipsum
        </p>
        <form>
          <input name='x' type='radio' />

          <input name='y' />
          <input name='z' />

          <input name='x' type='radio' />
          <input name='x' type='radio' />
          <input name='x' type='radio' />
          <input name='x' type='radio' />

          <input name='y' />
          <input name='z' />

          <input name='x' type='radio' />

          <input name='y' />
          <input name='z' />

          <input name='x' type='radio' />

          <input name='y' />
          <input name='z' />

          <input name='x' type='radio' />

          <textarea />

          <input type='checkbox' />
          <input type='checkbox' />
          <input type='checkbox' />

          <textarea />

          <input tabIndex='8' type='checkbox' />
          <input type='checkbox' />
          <input tabIndex='9' type='checkbox' />

          <input type='password' name='password' value='1' />

          <input type='number' name='number' value='1' />

          <input type='email' name='email' value='1' />

          <select name='select'>
            <option value='5'>Five</option>
            <option value='6'>Six</option>
            <option value='7'>Seven</option>
          </select>
        </form>

        <p tabIndex='7'>
          Lorem ipsum
        </p>

        <p tabIndex='5'>
          Lorem ipsum
        </p>

        <p tabIndex='3'>
          Lorem ipsum
        </p>

        <p tabIndex='1'>
          Lorem ipsum
        </p>

        <p tabIndex='6'>
          Lorem ipsum
        </p>

        <p tabIndex='4'>
          Lorem ipsum
        </p>

        <p tabIndex='2'>
          Lorem ipsum
        </p>

        <p tabIndex='0'>
          Lorem ipsum
        </p>
      </Pentonville>
    </div>
  ))
  .add('Without tabable children', () => (
    <Pentonville>
      <p>
        Lorem ipsum
      </p>
    </Pentonville>
  ))
