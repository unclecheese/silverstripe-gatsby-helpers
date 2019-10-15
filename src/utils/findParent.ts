import { BaseNode } from "../_types";

const findParent = (node:BaseNode): (n:BaseNode) => boolean => (n:BaseNode): boolean => n.uuid === node.parentUUID;

export default findParent;