import { SyntheticEvent, StatelessComponent } from "react";

export interface AllBaseNodeQuery {
    allSilverStripeDataObject: AllBaseNodeResult;
}

export interface AllDataObjectQuery {
    allSilverStripeDataObject: AllDataObjectResult;
}

export interface AllDataObjectResult {
    nodes: DataObjectNode[];
}

export interface AllBaseNodeResult {
    nodes: BaseNode[]
}

export interface BaseNode {
    id: number;
    uuid: string;
    silverstripe_id: number;
    parentUUID: string;
    link: string;
    ancestry: string[];
}

export interface DataObjectNode extends BaseNode {
    SilverStripeSiteTree: SilverStripeSiteTree;
};

export interface SilverStripeSiteTree {
    title: string;
    menuTitle: string;
    showInMenus: boolean;
    sort: number;
    Children: DataObjectNode[];
}

export interface FieldNode {
    name: string
    value: string
    formFieldID: string
    extraClass: string
    title: string
    rightTitle: string
    leftTitle: string
    description: string
    validation: string
    customValidationMessage: string
    schemaType: SchemaType
    source: RawAttribute[]
}

// eslint-disable-next-line
export enum SchemaType {
    Integer = 'Integer',
    Decimal = 'Decimal',
    String = 'String',
    Text = 'Text',
    Boolean = 'Boolean',
    Date = 'Date',
    Time = 'Date',
    Datetime = 'Datetime',
    Hidden = 'Hidden',
    Structural = 'Structural',
    SingleSelect = 'SingleSelect',
    MultiSelect = 'MultiSelect',
}

export interface RawFieldNode extends FieldNode {
    attributes: RawAttribute[]
    data: string
    childFields: RawFieldNode[]
};

export interface NormalisedFieldNode extends FieldNode {
    attributes: NormalisedAttributes
    data: ArbitraryData
    childFields: NormalisedFieldNode[]
    Component: StatelessComponent|null
}

export interface RawAttribute {
    name: string
    value: string
}

export interface NormalisedAttributes {
    [name: string]: string
}

export interface SilverStripeForm {
    formFields: RawFieldNode[]
    formActions: RawFieldNode[]
    attributes: RawAttribute[]
}

export interface FormHash {
    [field: string]: string
}

export interface ArbitraryData {
    [field: string]: any
}

export interface FormData {
    fields: NormalisedFieldNode[]
    actions: NormalisedFieldNode[]
    attributes: NormalisedAttributes
    initialValues: FormHash
    validator(v: FormHash): FormHash
}

export interface FormikStub {
    handleChange(e: SyntheticEvent): null
    handleBlur(e: SyntheticEvent): null
    values: FormHash
    errors: FormHash
    touched: FormHash
}

