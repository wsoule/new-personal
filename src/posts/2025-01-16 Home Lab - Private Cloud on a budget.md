---
title: Home Lab - Private Cloud on a budget
description: 'How to build a powerful, cost-effective private cloud in your own home using Proxmox, TrueNAS, and pfSense—all without breaking the bank.'
date: '2025-01-16'
categories:
  - codemash
published: true
---

# Description

Ever wanted to run your own private cloud but thought it was out of reach due to cost? Think again! In this session, we'll show you how to build a powerful, cost-effective private cloud in your own home using Proxmox, TrueNAS, and pfSense—all without breaking the bank.

Whether you're a developer, a sysadmin, or just a tech enthusiast, this session will walk you through everything you need to know, from acquiring affordable hardware to setting up and managing your home lab. By the end of this session, you'll be well-equipped to create a reliable and secure private cloud at home.

This talk offers a step-by-step guide to building a private cloud at home using cost-effective methods, focusing on acquiring affordable hardware, utilizing free software, and managing the setup in a home lab environment.

- Acquire Cheap Hardware - Learn how to source and select affordable hardware that meets the requirements for running a home lab capable of supporting a private cloud infrastructure.
- Utilize Free Software - Discover how to leverage Proxmox, TrueNAS, and pfSense—powerful and free tools that allow you to create a fully functional private cloud without costly licenses.
- Use a Homelab - Understand how to set up, configure, and maintain a home lab environment, turning your inexpensive hardware and free software into a robust private cloud solution.
  Attendees will leave this session with a clear understanding of how to build and manage their own private cloud on a budget. They will learn how to select the right hardware, utilize powerful open-source software, and set up a home lab that enables them to experiment with and deploy cloud-based applications securely and efficiently. Whether for personal projects, learning, or small-scale deployments, attendees will gain the skills to create a reliable private cloud environment at home.

# Notes

## Cheap Hardware

Network
Storage
Computer
Applications

Home Lab:
Build

- Cheaper over time with deals
- full control
- easy to swap parts
- more time required for research and assembly
  Buy
- higher upfront cost
- limited options fixed components
- ofted restricted by proprietary designs
- ready to use out of box

What do you need

- network
  - router
  - modem
  - switch
  - server
- Storage
  - SSD
  - HDD
  - NVME
  - Other
- Servers
  - RAM
  - Power
  - CPU
  - Network
  - Other
- Utilities
  - Backup Power
  - Total Power
  - Cooling

Where to look

- electronics recycling
- Government Surplus
- University Surplus
- Facebook Marketplace / Online Ads
- \_\_\_\_ Refurbished & Unix Surplus
- eBay

Homelabs subreddit

## What to do

Buy nothing

- use old computer
- use a raspberry pi
- steal

Choosing right CPU

- VT-x/AMD-V/ARM Support
- Cores & speed
- Power consumption
- Upgradability
- Cost vs Performance

CHoosing Memory

- use ECC RAM
- What is minimum capactiy & max capacity
- Does the motherboard accept UDIMM, RDIMM, LDIMM, and what configs?
- What Ram is currently available from other projects
- are any processes or workloads memory intensive or is Ram general use
- speed vs latency vs capacity vs cost

Choosing Right Storage

- Redundancy
- NAS / SAN / DAS (NAS will work)
- HDD / SSD / NVME
- Expansion Arrays
- Compression / Duplication / Caching
- Backup

Choosing right network

- Does the network card pre-process packets?
- Does the network adapter support multiuple queues for sending and receiving packets?
- Is the network card, sitch, and router fast enough for this projects needs?
- Does the config provide enough ports for management setup
- Does the config provide redundancy at the card or port level
- if network card fails how hard its it to replace

## Bad buys

- used UPS
- Raid Cards - make sure they are complient - less = better
- Hard Drivers
- Fossils

## Utilize free software

- pfSense
  - Security
  - Router + Firewall
  - VPN Support
  - Traffic Shaping
  - Network Services
  - Load balancing & fialeover
  - Monitoring and logging

note: your home netwrok is used by others

Implement Netowrk Segmentation
Enable Firewall protection
Monitor network activity
Secure Remote Access
Practice good cable management

# Storage

- Storage Media Types
- Storage Capacity
- Connectivity and interfaces
- Storage architecture
- Networked storage solutions
- Energy Efficiency

Plan your storage capacity
Implement Data Reduncandy (RAID)
use reliable file systems
Regularly Backup
Ensure Data is encypted
Monitor Storage

## Software

- TrueNAS - Network Attached Storage - ZFS File System - Cross platrowkr file sharing - Vitrualization & container - data protection & backup - Storage Scalability - High Availability - Encryption - Data Deduplication - Footgun be careful - Web based UI
  Avoid RAID cards if possible
  if not possible use RAID cards that support pass-through

# Compute

probably dont need or want much compute

- virtualization
- scalability
- performance
- Security
- Operating systems
- REmote management
- cost efficiency

## Software

- Proxmox
  - Virtualization (KVM & LXC)
  - Web based management & clustering
  - Storage support (local, shared, Ceph, ZFS)
  - High availability
  - Backup resotre & snapshots
  - networking and firewall
  - Role based access control

# Use Home Lab

setup modem pay isp
install networking hardware setup hardware
attach stoarge
setup compute

# Use Case

media server
personal cloud
vitrualization and container orchestaration
Home automation - Home automate app
network and security testing
web and app hosting
backup and disaster recovery
development and testing lab
self hosting productivity tools
machine learning

# Transcript
