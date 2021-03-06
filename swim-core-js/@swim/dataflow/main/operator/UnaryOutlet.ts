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

import {Item, Value} from "@swim/structure";
import {Inlet, AbstractOutlet, OutletInlet} from "@swim/streamlet";

export abstract class UnaryOutlet extends AbstractOutlet<Value> {
  constructor() {
    super();
    Object.defineProperty(this, "operandInlet", {
      value: new OutletInlet<Value>(this),
      enumerable: true,
    });
  }

  readonly operandInlet!: Inlet<Value>;

  override get(): Value {
    const operandInput = this.operandInlet.input;
    if (operandInput !== null) {
      const argument = operandInput.get();
      if (argument !== void 0) {
        const result = this.evaluate(argument);
        return result.toValue();
      }
    }
    return Value.absent();
  }

  protected abstract evaluate(argument: Value): Item;
}
