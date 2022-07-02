interface Info {
  fieldName: string;
  fieldNodes: any[][];
  returnType: string;
  parentType: string;
  path: Path;
  schema: Schema;
  fragments: Fragments;
  operation: Operation;
  variableValues: VariableValues;
  cacheControl: CacheControl;
}

export interface Path {
  key: string;
  typename: string;
}

export interface Schema {
  __validationErrors: any[];
  extensions: Extensions;
  astNode: any[];
  extensionASTNodes: any[];
  _queryType: string;
  _directives: any[];
  _typeMap: any[];
  _subTypeMap: SubTypeMap;
  _implementationsMap: ImplementationsMap;
}

export interface Extensions {}

export interface SubTypeMap {}

export interface ImplementationsMap {}

export interface Fragments {}

export interface Operation {
  kind: string;
  operation: string;
  variableDefinitions: any[];
  directives: any[];
  selectionSet: any[];
  loc: any[];
}

export interface VariableValues {}

export interface CacheControl {
  cacheHint: CacheHint;
}

export interface CacheHint {}

export default Info;
