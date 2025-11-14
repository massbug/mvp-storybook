# MVP Storybook Prototype

This repository contains a minimalist, functional component viewer prototype built with Next.js and TypeScript, designed to demonstrate the core architectural pattern of tools like Storybook.

It uses an **iFrame** to isolate the component preview from the control panel and employs the **`postMessage` API** for real-time, type-safe communication between them.

## What It Does

This project showcases a controlled environment where:

1.  A component (`shadcn/ui` Button) is rendered inside a secure sandbox (`/preview` route).
2.  The left control panel dynamically reads the component's available properties (`variant`, `size`) from its source file.
3.  Changes made to the controls are instantly transmitted and applied to the isolated component, without a page refresh.

## 🚀 How to Run It

### 1\. Prerequisites

You must have the project files and the necessary `shadcn/ui` components (`button`, `select`, `input`, `checkbox`, `label`) installed.

### 2\. Install Dependencies

```bash
npm install
```

### 3\. Critical Setup

Ensure your `src/components/ui/button.tsx` file exports the `buttonVariantsConfig` object. This is essential for the control panel to dynamically read component options.

### 4\. Start the Application

```bash
npm run dev
```

Open your browser to `http://localhost:3000`. You can now interact with the control panel and see the isolated component update instantly.
