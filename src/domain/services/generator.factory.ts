/* eslint-disable unicorn/no-empty-file */
// import commander from 'commander'
// import { CgapiConfigType, CgapiType } from '../../infrastructure/types/cgapi.types.js'
// import { RtqService } from './rtq.service.js'

// import { injectable } from 'inversify'
// import { IGenerator } from '../interfaces/generator.interface.js'

// @injectable()
// export class GeneratorFactory {

//   constructor() {
//   }

//   public static createGenerator(type: CgapiType, mainConfig: CgapiConfigType, program: commander.Command): IGenerator {
//     switch (type) {
//       case 'react-query':
//         return new RtqService(program, mainConfig)
//       case 'rtk-query':
//         return new RtqService(program, mainConfig)
//       // return new ReactQueryService(program)
//       default:
//         throw new Error('ERROR: such type has not found')
//     }
//   }
// }
