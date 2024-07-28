import { pick } from "lodash";

export const objectAssign = (data: object, source: any): void => {
  const filteredData = pick(data, Object.keys(source));

  Object.assign(source, filteredData);
};