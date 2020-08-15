---
layout: post
title:  "Form building with recursion"
date:   2020-07-20 23:11:00
categories: jekyll update
permalink: /recursion/
---

<div>
  <p>
    While working on a current project, I was tasked with the following, build a form that can render an infinite number of inputs and an enumerable type of inputs. You should have the freedom to stack these however you like.
  </p>

  <p>
    I chose to write the template for how the form is built separate from what the form will be made up of. The template builds the same way everytime and expects a configuration file.
  </p>

  <p>
    The configuration file looks like this,
  </p>

  <h2>Basic Configuration</h2>
  <pre>
  export default [
    [
      {
        key: 'quantity', // used by react to identity the element
        type: 'textField', // enumerable to render a specific input
        display: 'Number:', // the label for the input
        inputProps: { // props that get drilled down to the wrapped component
          variant: 'outlined',
          style: {
            width: '200px',
          },
          placeholder: 'number',
          type: 'number',
        },
        labelProps: { // props that get drilled down to the wrapped component's label
          style: {
            color: 'blue'
          }
        },
      },
    ]
  ];
  </pre>

  <h4>Result - <input placeholder="Test1" /></h4>

  <p>As outlined above, the configuration file exports an array by default. Each index in that array represents a new row for the form. But what if I want to stack more than one input in a single row?</p>

  <h2>Extended Configuration</h2>

  <pre>
  [ // index 0
    {
      ...
      type: 'textField', // enumerable to render a specific input
      ...
    },
    {
      ...
      type: 'textField', // enumerable to render a specific input,
      ...
    },
  ],</pre>

  <h4>Result - <input placeholder="Test1" /> <input placeholder="Test2" /></h4>

  <p>NBD! Simply stack objects one after another. But what if the designer gets adventurous and wireframes something that your nested for loop cant handle?</p>

  <h2>Advanced Configuration</h2>

  <pre>
  [
    {
      ...
      type: 'textField', // enumerable to render a specific input
      placeholder: "Test1",
      ...
    },
    [
      {
        ...
        type: 'textField', // enumerable to render a specific input,
        placeholder: "Test2",
        ...
      },
      [
        {
          ...
          type: 'textField', // enumerable to render a specific input,
          placeholder: "Test3",
          ...
        },
        [
          {
            ...
            type: 'textField', // enumerable to render a specific input,
            placeholder: "Test4",
            ...
          },
          [
            {
              ...
              type: 'textField', // enumerable to render a specific input,
              placeholder: "Test5",
              ...
            },
            {
              ...
              type: 'textField', // enumerable to render a specific input,
              placeholder: "Test5",
              ...
            },
            {
              ...
              type: 'textField', // enumerable to render a specific input,
              placeholder: "Test5",
              ...
            },
            {
              ...
              type: 'textField', // enumerable to render a specific input,
              placeholder: "Test5",
              ...
            },
          ],
        ],
      ]
    ],
  ],</pre>

  <h4>
    Result -
    <div style="display: flex; flex-direction: row;">
      <div>
        <input style="width: 100px;" placeholder="Test1" />
      </div>
      <div style="display: flex; flex-direction: column;">
        <input style="width: 100px;" placeholder="Test2" />
        <div style="display: flex; flex-direction: row;">
          <input style="width: 100px;" placeholder="Test3" />
          <div style="display: flex; flex-direction: column;">
            <input style="width: 100px;" placeholder="Test4" />
            <div style="display: flex; flex-direction: row;">
              <input style="width: 100px;" placeholder="Test5" />
              <input style="width: 100px;" placeholder="Test5" />
              <input style="width: 100px;" placeholder="Test5" />
              <input style="width: 100px;" placeholder="Test5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </h4>

  <p>
    Here we have a nightmare of a form, but it's still feasable. The designer wanted 2 columns of inputs. On the right hand side, she requested two inputs. For the input underneath, we had to have 2 more inputs next to it, in a column. Lastly, we were specifically instructed to make sure the input on the bottom of that column has 4 inputs in a row.
  </p>

  <p>
    If you compared the snippet to the output, you can see that anytime you want to swtich the way the inputs are stacked, you wrap it in a fresh array. Everytime you do this it switches the direction from <code>row</code> to <code>column</code>.
  </p>

  <h2>The Code</h2>

  <p>
    Now that you have an idea on what the function expects, we can see the work in action.
  </p>

  <pre>
  const buildForm = (data, index, jsx, tmp, direction, depth) => {
    if (data[index] === undefined) {
      if (depth === 0) return jsx;
      return tmp;
    }
    else if (Array.isArray(data[index])) {
      const items = buildForm(data[index], 0, jsx, [], switchDirection(direction), depth + 1);
      if (direction === "row") {
        if (depth === 0) {
          jsx.push(<Row key={`${index}-${direction}`}>{[...tmp, ...items]}</Row>);
          tmp = [];
        } else tmp.push(<Row key={`${index}-${direction}`}>{items}</Row>);
      } else {
        if (depth === 0) {
          jsx.push(<Column key={`${index}-${direction}`}>{[...tmp, ...items]}</Column>);
          tmp = [];
        } else tmp.push(<Column key={`${index}-${direction}`}>{items}</Column>);
      }
      return buildForm(data, index + 1, jsx, tmp, direction, depth);
    }
    const newElement = item(data[index]);
    tmp.push(newElement);
    return buildForm(data, index + 1, jsx, tmp, direction, depth);
  }</pre>

  <p>Let's look at this piece by piece.</p>

  <h3>The Parameters</h3>
  <p>The function accepts 6 parameters.</p>
  <code>const buildForm = (data, index, jsx, tmp, direction, depth) => {</code>
  <p><code>data</code> is the configuration array.</p>
  <p><code>index</code> is the current index within data.</p>
  <p><code>jsx</code> is an array of jsx elements that gets built throughout the process. It is what gets ultimately returned.</p>
  <p><code>tmp</code> is an array of jsx elements that gets held so that the order of elements does not get messed up.</p>
  <p><code>direction</code> is which way the elements should be rendered.</p>
  <p><code>depth</code> is a counter that adds 1 everytime an array is found so it knows when its at the root level.</p>

  <h3>The Base Case</h3>
  <pre>
  if (data[index] === undefined) {
    if (depth === 0) return jsx;
    return tmp;
  }</pre>

  <p>
    We are checking to see if the current index within data is <code>undefined</code>.
  </p>
</div>
