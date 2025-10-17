/**
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Config } from './config';
import { StringKeyObjectOfObjects } from './shared-types';
import { SdfEntityName } from './sdf-generator';

export class NotFoundInCache extends Error {}

export class ExtNameGenerator {
  static count = 1;
  static cache: StringKeyObjectOfObjects = {};

  static generateAndCache(entityName: SdfEntityName, id: string) {
    // First cache it
    if (!ExtNameGenerator.cache[entityName]) {
      ExtNameGenerator.cache[entityName] = {};
    }
    const extId = Config.SDFGeneration.NewIdPrefix + ExtNameGenerator.count++;
    ExtNameGenerator.cache[entityName][extId] = id;

    return extId;
  }

  static getCached(entityName: SdfEntityName, id: string) {
    if (
      !(entityName in ExtNameGenerator.cache) ||
      !(id in ExtNameGenerator.cache[entityName])
    ) {
      const message = `ExtNameGenerator didn't find [${entityName}][${id}] in cache`;
      console.log(
        message,
        'Current ExtNameGenerator.cache',
        ExtNameGenerator.cache
      );
      throw new NotFoundInCache(message);
    }

    return ExtNameGenerator.cache[entityName][id];
  }
}
