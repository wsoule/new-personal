---
title: Introduction to Unit Testing
description: "Imagine this: you’ve just written clean, maintainable code, only to be greeted by a dismal 12% test coverage report from your CI platform. The thought of diving into the test project fills you with dread—wouldn’t checking emails or waiting for 5 o'clock be better? But don’t worry; this session is here to turn that nightmare into a success story. \nTest suites often become bloated, unmaintainable, and more of a burden than a help. Why does this happen, and how can we prevent it? \nIn this introductory session, designed for developers who struggle with writing scalable and maintainable unit tests, you'll learn how to write unit and integration tests that are both quick and effective. We’ll discuss how to structure tests to focus on what matters most, while avoiding the traps of testing code that is likely to change. We’ll also address the challenge of getting legacy code under test. Using examples in C# and NUnit that are applicable to a wide range of languages and frameworks, you'll leave equipped to write tests that target behavior over implementation, create documentation through your tests, and ultimately design better software. "
date: '2025-01-16'
categories:
  - codemash
published: true
---

# Description

Imagine this: you’ve just written clean, maintainable code, only to be greeted by a dismal 12% test coverage report from your CI platform. The thought of diving into the test project fills you with dread—wouldn’t checking emails or waiting for 5 o'clock be better? But don’t worry; this session is here to turn that nightmare into a success story.

Test suites often become bloated, unmaintainable, and more of a burden than a help. Why does this happen, and how can we prevent it?

In this introductory session, designed for developers who struggle with writing scalable and maintainable unit tests, you'll learn how to write unit and integration tests that are both quick and effective. We’ll discuss how to structure tests to focus on what matters most, while avoiding the traps of testing code that is likely to change. We’ll also address the challenge of getting legacy code under test. Using examples in C# and NUnit that are applicable to a wide range of languages and frameworks, you'll leave equipped to write tests that target behavior over implementation, create documentation through your tests, and ultimately design better software.

# Notes

Unit Test: "Atomic" | Light bulb, when you apply energy, the light comes on.
Integration Test: How the component works with other things.

Don't be purity police.

## What makes "good" test suite?

- Readability.
  - Cognitive overhead.
  - Clearly defines what matters.
- Documents requirements.
- Protects against regressions.
- There will be trade-offs.
- Tests just enough of the code, but not too much.
-

## Anatomy of a Unit Test

- Closely follows the "Gherkin" language pattern: (Given, When, Then) or (Arrange, Act, Assert)
- **Given** that i have three items that match on a test code but only one that matches a given resuld, **When** i run the "MatchItem" method, **Then** it should return the one that matches the test and result code.

## Structuring of a Test Suite

- What is a Test Suite?
  - File used to test the method. Should have your methods in seperate files.
- Using `sut` (system under test) variable.
- What kind of setup(before test)/teardow(after test) code do you need? (Smoke Tests / Happy Path)
  - Happy path: take most common path - something that will be true "control test".
  - start with nothing, then add a little thing until it starts passing

## Behavior, not implementation

- the tests should only test the functionality.
- The **behavior** is wht the action you take does.
- the **implementation** is how the program does it.
- consider inputs outputs and **abservable behavior**.
- there ar etwo types of inputs and outputs, **explicit** and **hidden**.
- **explicit input** is the parameters to your method.
- **expliocit outpu** is heh return value of your method.
- often there are also **hidden inputs** and **hidden outputs** or **state**.
- **Hidden inputs** - state returned from dependencies, internal state.
- hidden outputs - state changes sent to dependencies, internal state changes.
- state if some internal state is very hard to set or hard to observe changes to, its a smell.

## Structuring tests for maintainbility

- Short.
- Do NOT over-specify.
- Don't use "23" use random int.
- Use Helpers (Faker).
- Using Private methods, especially in setup.
- Happy path setup in the per test setup, override in individual tests.

Example Test

- Happy Path

## Conclusions

- Unit tests document behavior, protect against regressions, support refactoring.
- Focus on readability first.
- Dont over-specify.
- Consider how to observe behavior
- Happy path setup by default, vary on individial tests
- Practice makes perfect
  - (AI bots can help make exercises for you)
-

# Transcript
