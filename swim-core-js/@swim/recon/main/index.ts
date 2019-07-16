// Copyright 2015-2019 SWIM.AI inc.
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

export {Recon} from "./Recon";

export {ReconParser} from "./ReconParser";

export {ReconStructureParser} from "./ReconStructureParser";

export {ReconWriter} from "./ReconWriter";

export {ReconStructureWriter} from "./ReconStructureWriter";

declare module "@swim/structure" {
  interface Item {
    toRecon(): string;
    toReconBlock(): string;
  }
}

declare module "@swim/structure" {
  namespace Value {
    function parseRecon(recon: string): Value;
  }
}
