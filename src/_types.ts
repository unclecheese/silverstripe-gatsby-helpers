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