# Pentonville

A `React` component for capturing tab and managing focus events.

```
<Pentonville>
	<form>
		<input name='one' />
		<input name='two' />
	</form>
</Pentonville>
```

Once focus enters _Pentonville_ it cannot leave.

## On tab flow and focus

Every `<form />` input element has an implicit tab index which enables them to accept focus, and be tabbed between, from one to another, in the order they appear in the document. The value of the implicit tab index is `0`. 

Some other `HTML` elements can be made to accept focus with an explicit tab index of the same value.

```
<p tabindex="0">
    This paragraph can accept focus.
</p>
```

In `React` the attribute is in camel case but is otherwise the same.

```
<p tabIndex='0'>
    This paragraph can accept focus.
</p>
```

(You didn't need a nearly identical second example, but there it is.)

An element can also be given an explicit negative tab index of `-1` (to remove it from the tab flow), or an explicit positive tab index of `1` or more (to change its position in the tab flow).

Positive tab indexes are tabbed to in sequence, from the lowest to the highest value, regardless of their order in the document. After reaching the highest value, flow returns to the elements with a zero index, whether implicit and explicit, such that they are tabbed to in sequence, according to their order in the document.

## Introducing _Pentonville_

Sometimes it is desirable to prevent tab flow and focus from moving beyond the boundary of a set of `HTML` elements. _Pentonville_ is that boundary: once focus has entered, it won't escape.

Tab flow is maintained by moving focus through the order of each element's tab index, from the first to the last, when tab flow is returned to the first element again. 

Focus can be put on any element in the sequence, in which case it will proceed according to the tab index. In other words: focus can be put onto an element with a tab index value of `3` and have the next element in the tab flow be the element with a tab index of `4`, then `5` and so on, until the positive tab index values have been exhausted and flow proceeds through each element with a tab index of `0`, then onto `1` and `2` and back to `3` again.

Focus cannot be put onto any other element. _Pentonville_ won't permit it. Focus will be maintained on whichever element within _Pentonville_ currently has it.

## Demonstrating _Pentonville_

[Example `Storybooks` are available on GitHub](https://github.com/sequencemedia/Pentonville). 

Clone the repository, then: 

```
npm install
npm run storybook
```

And with your preferred browser visit `http://localhost:6006`.

(The `Storybooks` are not meant to be visually pleasing: they are examples only of the component's behaviour.)