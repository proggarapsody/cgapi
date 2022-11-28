import { readFileSync } from 'node:fs'
import fs from 'node:fs/promises'
import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import chalk from 'chalk'
import globSync from 'glob'
import glob from 'glob-promise'
import { injectable } from 'inversify'

import type { IFileService } from '../interfaces/file-service.interface.js'

@injectable()
export class FileService implements IFileService {
  private readonly dirname = dirname(fileURLToPath(import.meta.url))

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

  public getLibDirname() {
    return this.dirname
  }

  public async findFile(
    filePath: string,
    options?: {
      cwd?: string
    }
  ) {
    const cwd = options?.cwd || process.cwd()
    console.log(cwd)

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
    console.log('process.cwd:', process.cwd())
    console.log('__dirname', dirname(fileURLToPath(import.meta.url)))

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

    console.log(fullFromPath)
    console.log(fullToPath)
    try {
      await fs.mkdir(path.dirname(fullToPath), { recursive: true })

      await fs.cp(fullFromPath, fullToPath, { force: false })
    } catch (error) {
      console.log(chalk.red('ERROR: file has not been copied'))
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
