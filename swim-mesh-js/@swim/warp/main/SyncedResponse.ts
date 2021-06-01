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

import {AnyValue, Value} from "@swim/structure";
import {AnyUri, Uri} from "@swim/uri";
import {LaneAddressed} from "./LaneAddressed";

export class SyncedResponse extends LaneAddressed<SyncedResponse> {
  constructor(node: Uri, lane: Uri, body: Value) {
    super(node, lane, body);
  }

  protected override copy(node: Uri, lane: Uri, body: Value): SyncedResponse {
    return new SyncedResponse(node, lane, body);
  }

  static get tag(): string {
    return "synced";
  }

  static create(node: AnyUri, lane: AnyUri, body: AnyValue = Value.absent()): SyncedResponse {
    node = Uri.fromAny(node);
    lane = Uri.fromAny(lane);
    body = Value.fromAny(body);
    return new SyncedResponse(node as Uri, lane as Uri, body);
  }
}
