/* eslint-disable no-console */

import { package1Function } from "@monorepo/package1"
import { package2Function } from "@monorepo/package2"

console.log(package1Function().message)
console.log(package2Function().message)
