import { FieldPath, WhereFilterOp } from "firebase/firestore";

export interface Constraint {
  fieldPath: string;
  opStr: WhereFilterOp;
  value: any;
}

export interface OrderBy {
  fieldPath: string | FieldPath;
  directionStr?: "asc" | "desc" | undefined;
}

export const where = (
  fieldPath: string,
  opStr: WhereFilterOp,
  value: any
): Constraint => {
  return {
    fieldPath,
    opStr,
    value: value || "",
  };
};

export const orderby = (
  fieldPath: string | number | FieldPath,
  directionStr?: "asc" | "desc" | undefined
): OrderBy => {
  return {
    fieldPath,
    directionStr,
  };
};
