---
title: Is Vector Search Right for Me?
description: "Is the term 'AI' obfuscating every practical conversation about everything? Can we cut through the noise and ride this wave by understanding, designing, and deploying a new breed of search, fully integrated with your existing data and database? Yes, yes, we can! \nThis talk will dig into the weeds of vector search. We'll explore both the core math of the technology, as well as the applicability to a wide variety of use cases. We'll differentiate it from preceding search technologies and find how it fits within an overall data retrieval strategy. \nI'll discuss some concrete ways this can make your life better but also touch on some pitfalls you might want to watch for. \nAttending this session will help you: \n1) Understand what Vector Search is and how it works \n2) Discover the ways that vector search and 'semantic search' help solve problems \n3) Learn about some concrete implementations of vector search and how to integrate this architecture into your project \n4) Pros and cons of using vector search vs. keyword search"
date: '2025-01-14'
categories:
  - codemash
published: true
---

Description

Is the term "AI" obfuscating every practical conversation about everything? Can we cut through the noise and ride this wave by understanding, designing, and deploying a new breed of search, fully integrated with your existing data and database? Yes, yes, we can!

This talk will dig into the weeds of vector search. We'll explore both the core math of the technology, as well as the applicability to a wide variety of use cases. We'll differentiate it from preceding search technologies and find how it fits within an overall data retrieval strategy.

I'll discuss some concrete ways this can make your life better but also touch on some pitfalls you might want to watch for.

Attending this session will help you:

1. Understand what Vector Search is and how it works

2. Discover the ways that vector search and "semantic search" help solve problems

3. Learn about some concrete implementations of vector search and how to integrate this architecture into your project

4. Pros and cons of using vector search vs. keyword search

# Notes

## Vectors (Embeddings)

- **Definition:** An array of numbers.

## Scalar Comparison

- **Equality:**
  - `A == A`
  - `A != B`
- **Ordinality:**
  - `A < B`
- **Partial Equality:**
  - `B` in `ABC`

## Vector Comparison

- Vectors must have:
  - Same length.
  - Same angle.
  - Same endpoint.
- Metrics for comparison:
  - Endpoint Distance.
  - Line Distance.

## Vector Search

- **Techniques:**
  - Nearest Neighbor Search (kNN / ANN).
  - Similarity measurement using:
    - Euclidean Distance.
    - Cosine Similarity.
    - Dot Product.

## Semantic vs Token-Based Search

- **Semantic Search:**
  - Based on concepts and meaning.
- **Token-Based Search:**
  - Based on exact text in the search query.

## Vector Index vs Traditional Index

### Vector Index

- Supports semantic search.
- Capable of image search.
- Focuses on vector similarity.

### Traditional Index

- Keyword-based text search.
- Does not support image search.
- Limited to simple similarity searches.

---





# Transcript
