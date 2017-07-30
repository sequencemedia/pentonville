import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Pentonville from '../index'

const onSubmit = action('on-submit')
const onClick = action('on-click')

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
        <form onSubmit={(e) => {
          e.preventDefault()
          onSubmit(e)
        }}>
          <input name='x' type='radio' />

          <input name='y' />
          <input name='z' />

          <input name='x' type='radio' />

          <div style={{ display: 'none' }}>
            <input name='x' type='radio' />
            <input name='x' type='radio' />
            <input name='x' type='radio' />
          </div>

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

          <input type='password' name='password' defaultValue='1' />

          <input type='number' name='number' defaultValue='1' />

          <label htmlFor='input'>Input</label>

          <input id='input' type='email' name='email' defaultValue='jonathanperry@jonathanperry.com' />

          <p>
            Lorem ipsum <a onClick={(e) => {
              e.preventDefault()
              onClick(e)
            }} href="http://news.bbc.co.uk">dolor sit amet</a>, consectetur adipiscing elit. Nam mattis imperdiet eros, non vulputate lectus elementum quis. Sed vitae enim nec nisi cursus egestas. Duis venenatis vulputate arcu, ut blandit elit efficitur ut. Proin in condimentum felis. Cras id elit a nisl tincidunt congue id sed elit. Sed nec lacinia tortor. Fusce consequat ligula dolor. Pellentesque nunc nulla, iaculis vel nibh ut, gravida efficitur erat. Aenean iaculis ac diam vitae elementum. Suspendisse eu maximus massa. Cras ac dui consequat eros pharetra lacinia eu vitae tortor. Curabitur eu semper turpis, eget tincidunt enim.
          </p>

          <label>
            Select
            <select name='select'>
              <option value='5'>Five</option>
              <option value='6'>Six</option>
              <option value='7'>Seven</option>
            </select>
          </label>

          <button onClick={(e) => {
            e.preventDefault()
            onClick(e)
          }}>
            Button
          </button>
        </form>

        <p tabIndex='7'>
          Lorem ipsum <a onClick={(e) => {
            e.preventDefault()
            onClick(e)
          }} href="http://news.bbc.co.uk">dolor sit amet</a>, consectetur adipiscing elit. Nam mattis imperdiet eros, non vulputate lectus elementum quis. Sed vitae enim nec nisi cursus egestas. Duis venenatis vulputate arcu, ut blandit elit efficitur ut. Proin in condimentum felis. Cras id elit a nisl tincidunt congue id sed elit. Sed nec lacinia tortor. Fusce consequat ligula dolor. Pellentesque nunc nulla, iaculis vel nibh ut, gravida efficitur erat. Aenean iaculis ac diam vitae elementum. Suspendisse eu maximus massa. Cras ac dui consequat eros pharetra lacinia eu vitae tortor. Curabitur eu semper turpis, eget tincidunt enim.
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
