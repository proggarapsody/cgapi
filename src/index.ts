#!/usr/bin/env node
import 'reflect-metadata'

import type { AppService } from './domain/services/app.service.js'
import { DIcontainer } from './infrastructure/utils/di-container.js'
import { Locator } from './infrastructure/utils/locator.js'

const application: AppService = new DIcontainer().container.get<AppService>(
  Locator.AppService
)

application.main()
