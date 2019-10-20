# SilverStripe + Gatsby helpers

A suite of functions to help with various tasks in [SilverStripe](https://silverstripe.org) + [Gatsby](https://gatsbyjs.com) integrations.

## Installation
`$ yarn add silverstripe-gatsby-helpers`


## Examples

### Build a primary naviagion

```js
import React from 'react';
import { getMenu } from 'silverstripe-gatsby-helpers';
import { Link } from 'gatsby';
import classnames from 'classnames';

const Menu = ({ level }) => {
    const menuItems = getMenu(level);

    return (
        <nav>
	        <ul>
	            {menuItems.map(item => (
	                <li className={classnames({
	                	active: item.isCurrent
	                }) key={item.id}>
	                	<Link to={item.link}>
	                		{item.SilverStripeSiteTree.menuTitle}
	                	</Link>
	                </li>
	            ))}
	        </ul>
        </nav>
    )
};
```

### Build breadcrumbs

```js
import React from 'react';
import { getBreadcrumbs } from 'silverstripe-gatsby-helpers';
import { Link } from 'gatsby';

const Breadcrumbs = () => {
    const breadcrumbs = getBreadcrumbs();
    return (
        <div className="breadcrumbs">
            {breadcrumbs.map((node, i) => (
            	<>
            		{i && `/`}
                	<Link to={node.link} key={node.uuid}>
                		{node.SilverStripeSiteTree.title}
                	</Link>
                </>
            ))}
        </div>
    )
}
```

### Show subnav

```js
import { isLevel, getChildren, getMenu } from 'silverstripe-gatsby-helpers';

const isLevel2 = isLevel(2);
const hasSubnav = isLevel2 || getChildren().length > 0;
const menuItems = isLevel2 ? getMenu(2) : getChildren();

{hasSubNav && 
	<ul>
	{menuItems.map(child => (
		<li key={child.uuid>{child.SilverStripeSiteTree.title}</li>
	))}
	</ul>
}
```

## Included functions

export { default as isFile } from './lib/utils/isFile';
export { default as isSiteTree } from './lib/utils/isSiteTree';
export { default as canonicalName } from './lib/utils/canonicalName';
export { default as findParent } from './lib/utils/findParent';
export { default as findAncestors } from './lib/utils/findAncestors';

export { default as getMenu } from './lib/context/getMenu';
export { default as getNavigation } from './lib/context/getNavigation';
export { default as isLevel } from './lib/context/isLevel';
export { default as getCurrentNode } from './lib/context/getCurrentNode';
export { default as getCurrentSiteTree } from './lib/context/getCurrentSiteTree';
export { default as getBreadcrumbs } from './lib/context/getBreadcrumbs';
export { default as getChildren } from './lib/context/getChildren';
export { default as getParent } from './lib/context/getParent';
export { default as getHierarchy, initHierarchy } from './lib/context/getHierarchy';
export { default as getAncestors } from './lib/context/getAncestors';

export { default as extractFormData } from './lib/forms/extractFormData';
export { default as SSFieldHolder } from './lib/forms/SSFieldHolder';
export { default as normaliseAttribtues } from './lib/forms/normaliseAttributes';


**getMenu(level:int = 1): DataObjectNode[]**

Like its SilverStripe counterpart, builds a menu for the current page given a `level`.
Relies on context provided by `getCurrentSiteTree()`.

**getBreadcrumbs(maxDepth:int = 20, showHidden:bool = false): DataObjectNode[]**

Like its SilverStripe counterpart, builds a list of parent nodes to the current page.
Relies on context provided by `getCurrentSiteTree()`.

**isLevel(node: Node, level:int): bool**

Returns true if the supplied node is at a given `level` in the hierarchy. 
Works the same way as its SilverStripe counterpart, `<% if $Level(1) %>`.

**useCurrentPage(): Node|null**

A hook that gets the current page based on the URL.

**useHierarchy(): Node[]**

A hook that gets all the SilverStripe objects that Gatsby has sourced, with
references to parents and children. Only DataObjects that have a `Parent()` function
will be included.

**useLinkable(): Node[]**

Gets a list of all DataObjects with `link` properties defined that are not necessarily
hierarchical.

**useNavigation(): Node[]**

Like `useHierarchy()` but filters out `showInMenus === false`.

**canonicalName(class: string): string**

Returns the short name for a PHP class, e.g. `canonicalName('MyProject\\Models\\MyObject'); // 'MyObject'`

**isSiteTree(node: Node): bool**

Returns true if the given node is an instance of `SiteTree`.

**isFile(node: Node): bool**

Returns true if the given node is an instance of `SiteTree`.

**findParent(node: Node): (node: Node): Node**

Creates a function suitable for `Array.filter` to find a parent for a node.

```js
const page = useCurrentPage();
const hierarchy = useHierarchy();
const finder = findParent(page);
const parent = hierarchy.find(finder);
```

**findClosestPage(node: Node): Node|null**

Useful for dataobjects that are rendered as full pages. Gets the nearest page in its
hierarchy. Relies on a `Parent()` function being defined for the dataobject.

