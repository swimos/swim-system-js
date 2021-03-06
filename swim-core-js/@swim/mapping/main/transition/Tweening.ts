// Copyright 2015-2021 Swim inc.
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

import {Mapping} from "../mapping/Mapping";
import type {Interpolator} from "../interpolate/Interpolator";
import type {Timing} from "./Timing";

export interface Tweening<Y> extends Mapping<number, Y> {
  readonly domain: Timing;

  readonly range: Interpolator<Y>;

  withDomain(t0: number, t1: number): Tweening<Y>;

  canEqual(that: unknown): boolean;

  equals(that: unknown): boolean;

  toString(): string;
}

export const Tweening = function <Y>(domain: Timing, range: Interpolator<Y>): Tweening<Y> {
  const tweening = function (u: number): Y {
    return tweening.range(tweening.domain(u));
  } as Tweening<Y>;
  Object.setPrototypeOf(tweening, Tweening.prototype);
  Object.defineProperty(tweening, "domain", {
    value: domain,
    enumerable: true,
  });
  Object.defineProperty(tweening, "range", {
    value: range,
    enumerable: true,
  });
  return tweening;
} as {
  <Y>(domain: Timing, range: Interpolator<Y>): Tweening<Y>

  /** @hidden */
  prototype: Tweening<any>;
};

Tweening.prototype = Object.create(Mapping.prototype);

Tweening.prototype.withDomain = function <Y>(this: Tweening<Y>, t0: number, t1: number): Tweening<Y> {
  return this.domain.withDomain(t0, t1).overRange(this.range);
};

Tweening.prototype.canEqual = function (that: unknown): boolean {
  return that instanceof Tweening;
};

Tweening.prototype.equals = function (that: unknown): boolean {
  if (this === that) {
    return true;
  } else if (that instanceof Tweening) {
    return this.domain.equals(that.domain) && this.range.equals(that.range);
  }
  return false;
};

Tweening.prototype.toString = function (): string {
  return "Tweening(" + this.domain + ", " + this.range + ")";
};
