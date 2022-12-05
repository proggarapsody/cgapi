# CGAPI 🪄 Codegen api

**Package for generating code from `openapi`, `postman collections` or `graphql` schemas.**

---

## Features: 
[redux-toolkit-query](https://redux-toolkit.js.org/rtk-query/overview)
[react-query](https://react-query.tanstack.com/overview)

## Installation

### Globally

```bash
npm install -g  @proggarapsody/cgapi
```

### Locally

```bash
npm install --save-dev @proggarapsody/cgapi
```

Next, add script to `package.json`

```json
  "scripts": {
    "cgapi": "cgapi"
  }
```


## Usage

```bash
cgapi <command> [options]
```

## Commands

### `init [options]` 

**Initialize config file**

#### Options

`-o --openapi` - if you want to generate code from openapi

`-p --postman` - if you want to generate code from postman collection

`-g --graphql` - if you want to generate code from graphql schema

### `gen [options]`

#### Options

`-o --openapi` - if you want to generate code from openapi

`-g --graphql` - if you want to generate code from graphql schema

## Configure

### main config file - `cgapi.config.json`

**configPath:** `string` - path to codegen config file (default: `<project_root>/codegen/cgapi.config.json`)

**postmanCollectionUrl:** `string` - url to postman collection (default: `''`)

**isPostman:** `boolean` - if you want to generate code from postman collection (default: `false`)

**type:** `'rtk-query' | 'react-query'` - type of code generation

## Rtq query configure 



### Openapi | openapi-codegen.config.js
### GraphQl | graphql-codegen.config.js
