---
title: Designing Reusable Components…That Are Actually Reusable
description: "Modern UIs are often composed of reusable components written in React, Vue, Angular, whatever. In these modern technologies, creating a component is easy. However, creating a truly reusable component is hard. In this session, we'll explore the tradeoffs inherent in reusable component design, and discuss the questions to ask along the way. The examples presented will use React, but the concepts presented apply to anyone building components. After this session, you'll understand the key considerations required to create UI components that are truly reusable."
date: '2025-01-16'
categories:
  - codemash
  - UI
  - react
published: true
---

# Description

Modern UIs are often composed of reusable components written in React, Vue, Angular, whatever. In these modern technologies, creating a component is easy. However, creating a truly reusable component is hard. In this session, we'll explore the tradeoffs inherent in reusable component design, and discuss the questions to ask along the way. The examples presented will use React, but the concepts presented apply to anyone building components. After this session, you'll understand the key considerations required to create UI components that are truly reusable.

# Notes

Rigid

- Simpler to create and implement
- easier to understand
- easier to test
- less work to maintain
- more opinion = more consistency, less fatigue
- Easy to add flexibility, hard to remove

Flexible

- Reausable in more contexts

The higher we can have consistency, the lower the decision fatigue

Props are easy to add, but hard to remove.

If i have seen further it is because i am standing on shoulders of giants.

BYO - Build your own
Wrap - Wrap an exesting library

- opinuonate your components you pull in from a library
  Fork - Fork the github of the component
  Generate - Shadcn UI

### Key 5 - Honor HTML

Don't

```html
<button text="Submit" /> <List items{[]} />
```

Do

```html
<button>Submit</button>
<List>
  <ListItem></ListItem>
</List>
```

## Key 6 Use the rule of 3

"A reusable component should be tried out in three different apps before it will be sufficiently general to accept into a reuse library." - Jeff Atwood
Rule of 3:
try a componetns in 3 spots first

## Key 7 its a product, be discoverable

## Key 8 - Colocate related stuff

Create a shared folder, a central place to store app specific reulable components

Storybook

Don't build docs by hand

# Transcript
