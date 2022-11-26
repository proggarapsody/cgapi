#!/usr/bin/env node
import 'reflect-metadata';
import { DIcontainer } from './infrastructure/utils/di-container.js';
import { Locator } from './infrastructure/utils/locator.js';
const application = new DIcontainer().container.get(Locator.AppService);
application.main();
