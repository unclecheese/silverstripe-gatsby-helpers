# SilverStripe + Gatsby helpers

A suite of functions to help with various tasks in [SilverStripe](https://silverstripe.org) + [Gatsby](https://gatsbyjs.com) integrations.

## Installation
`$ yarn add silverstripe-gatsby-helpers`


## Examples

### Build a primary naviagion

```js
import React from 'react';
import { buildMenu, useCurrentPage } from 'silverstripe-gatsby-helpers';
import { Link } from 'gatsby';

const Menu = ({ level }) => {
    const currentPage = useCurrentPage();
    const menuItems = buildMenu(currentPage, level);

    return (
        <nav>
	        <ul>
	            {menuItems.map(item => (
	                <li key={item.id}>
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
import { buildBreadcrumbs, useCurrentPage } from 'silverstripe-gatsby-helpers';
import { Link } from 'gatsby';

const Breadcrumbs = () => {
    const currentPage = useCurrentPage();
    const breadcrumbs = buildBreadcrumbs(currentPage);
    return (
        <div className="breadcrumbs">
            {breadcrumbs.map(node => (
                <Link to={node.link} key={node.silverstripe_id}>
                	{node.SilverStripeSiteTree.title}
                </Link>
            ))}
        </div>
    )
}
```

### Show subnav

```js
const currentNode = useCurrentPage();
const closestSiteTree = findClosestPage(currentNode);
const { Children } = closestSiteTree.SilverStripeSiteTree;
const hasSubnav = (isLevel(closestSiteTree, 2) || (Children && !!Children.length));

{hasSubNav && 
	<ul>
	{Children.map(child => <li>{child.SilverStripeSiteTree.title})}
	</ul>
}
```

## Included functions

**buildMenu(currentNode: Page, level:int = 1): Page[]**

Like its SilverStripe counterpart, builds a menu for the current page given a `level`.
Requires a `currentNode`, which can be obtained with `useCurrentPage()`.

**buildBreadcrumbs(currentPage: Page, maxDepth:int = 20, showHidden:bool = false): Page[]**

Like its SilverStripe counterpart, builds a list of parent nodes to the current page.
Requires a `currentNode`, which can be obtained with `useCurrentPage()`.

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

