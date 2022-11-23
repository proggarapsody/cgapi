import { readFileSync } from 'node:fs'
import fs from 'node:fs/promises'
import path from 'node:path'

import chalk from 'chalk'
import globSync from 'glob'
import glob from 'glob-promise'
import { injectable } from 'inversify'

import type { IFileService } from '../interfaces/file-service.interface.js'

@injectable()
export class FileService implements IFileService {
  public async writeFile(filePath: string, data: Object | string) {
    const fullPath = path.resolve(process.cwd(), filePath)
    try {
      await fs.mkdir(path.dirname(fullPath), { recursive: true })
      await fs.writeFile(fullPath, JSON.stringify(data), { encoding: 'utf8' })
    } catch (error) {
      console.error(chalk.red('ERROR: file has not created'))
      throw new Error(error as any)
    }
  }

  public readFile(
    filePath: string,
    options?: {
      baseUrl?: string
    }
  ) {
    const baseUrl = options?.baseUrl || process.cwd()
    try {
      return readFileSync(path.resolve(baseUrl, filePath), 'utf8')
    } catch (error) {
      console.error(chalk.red('ERROR: file has not founded'))
      console.error(error)
      return null
    }
  }

  public async findFile(
    filePath: string,
    options?: {
      cwd?: string
    }
  ) {
    const cwd = options?.cwd || process.cwd()
    try {
      return await glob(filePath, {
        cwd,
      })
    } catch (error) {
      console.error(error)
      return null
    }
  }

  public findFileSync(
    filePath: string,
    options?: {
      cwd?: string
    }
  ) {
    const cwd = options?.cwd || process.cwd()
    try {
      return globSync.sync(filePath, {
        cwd,
      })
    } catch (error) {
      console.error(error)
      return null
    }
  }

  public async copyFile(from: string, to: string) {
    const fullFromPath = path.resolve(process.cwd(), from)
    const fullToPath = path.resolve(process.cwd(), to)

    try {
      await fs.mkdir(path.dirname(fullToPath), { recursive: true })

      await fs.cp(fullFromPath, fullToPath, { force: false })
    } catch (error) {
      console.error(chalk.red('ERROR: file has not been copied'))
      throw new Error(error as any)
    }
  }

  public getDirname = (source: string) => {
    return path.dirname(source)
  }

  public getRelativePath = (source: string, destination: string) => {
    return path.relative(source, destination)
  }
}
