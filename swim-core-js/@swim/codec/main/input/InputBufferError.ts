// Copyright 2015-2020 Swim inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import type {Mark} from "../source/Mark";
import {InputException} from "./InputException";
import {AnyInputSettings, InputSettings} from "./InputSettings";
import {InputBuffer} from "./InputBuffer";

/** @hidden */
export class InputBufferError extends InputBuffer {
  /** @hidden */
  declare readonly error: Error;

  constructor(error: Error, id: string | undefined, mark: Mark, settings: InputSettings) {
    super();
    Object.defineProperty(this, "error", {
      value: error,
      enumerable: true,
    });
    Object.defineProperty(this, "id", {
      value: id,
      enumerable: true,
    });
    Object.defineProperty(this, "mark", {
      value: mark,
      enumerable: true,
    });
    Object.defineProperty(this, "settings", {
      value: settings,
      enumerable: true,
    });
  }

  isCont(): boolean {
    return false;
  }

  isEmpty(): boolean {
    return false;
  }

  isDone(): boolean {
    return false;
  }

  isError(): boolean {
    return true;
  }

  isPart(): boolean {
    return false;
  }

  asPart(part: boolean): InputBuffer {
    return this;
  }

  get index(): number {
    return 0;
  }

  withIndex(index: number): InputBuffer {
    if (index === 0) {
      return this;
    } else {
      const error = new InputException("invalid index");
      return new InputBufferError(error, this.id, this.mark, this.settings);
    }
  }

  get limit(): number {
    return 0;
  }

  withLimit(limit: number): InputBuffer {
    if (limit === 0) {
      return this;
    } else {
      const error = new InputException("invalid limit");
      return new InputBufferError(error, this.id, this.mark, this.settings);
    }
  }

  get capacity(): number {
    return 0;
  }

  get remaining(): number {
    return 0;
  }

  has(index: number): boolean {
    return false;
  }

  get(index: number): number {
    throw new InputException();
  }

  set(index: number, token: number): void {
    throw new InputException();
  }

  head(): number {
    throw new InputException();
  }

  step(offset?: number): InputBuffer {
    const error = new InputException("error step");
    return new InputBufferError(error, this.id, this.mark, this.settings);
  }

  trap(): Error {
    return this.error;
  }

  seek(mark: Mark): InputBuffer {
    const error = new InputException("error seek");
    return new InputBufferError(error, this.id, this.mark, this.settings);
  }

  declare readonly id: string | undefined;

  withId(id: string | undefined): InputBuffer {
    return new InputBufferError(this.error, id, this.mark, this.settings);
  }

  declare readonly mark: Mark;

  withMark(mark: Mark): InputBuffer {
    return new InputBufferError(this.error, this.id, mark, this.settings);
  }

  get offset(): number {
    return this.mark.offset;
  }

  get line(): number {
    return this.mark.line;
  }

  get column(): number {
    return this.mark.column;
  }

  declare readonly settings: InputSettings;

  withSettings(settings: AnyInputSettings): InputBuffer {
    settings = InputSettings.fromAny(settings);
    return new InputBufferError(this.error, this.id, this.mark, settings);
  }

  clone(): InputBuffer {
    return this;
  }
}