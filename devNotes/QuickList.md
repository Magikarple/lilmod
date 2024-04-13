QuickList is built from the interaction of six parts.

1. The Quick List option enable/disable control.
2. The list context, basically if there are more than one, and the
	context is correct, the toggle, the table will be available.
3. The Slave Summary Passage contains the Quick List toggle button,
	clicking it either shows or hides the quick list table.
4. The Slave Summary Passage contains the actual quick list table, which
	if shown has a button for each slave name in the list, in columns up
	to 5 wide.
5. The Slave Summary Passage contains invisible `<a>` links or any other
	html element nearby or tied to each slave's name. These are
	generated with an html attribute id set to "slave-##" where ## is the
	slave's ID.
6. The JS code to tie a scroll animation from the visible name buttons
	in the quick list table down to the invisible links/elements.

The slave summary passage is called in many strange contexts, and for
this reason, there is some serious complexity in getting consistent
results. As it stands now, the passage sometimes calls itself
recursively (for facilities), but it doesn't do that for the Main
penthouse page.

The list context is duplicated, so that we can quickly loop over the
list context to get the slave names in the list, all without disturbing
the principal list context for the slave data.

If the list context has more than one slave, and is either the first
call for the Main/penthouse list, or the recursive call for any other
facility, And we haven't *already* built a quick list table, then we
proceed to build the quick list table.

We use special attributes on the built button to name the invisible
link to which we'll navigate, the speed that we'll animate our
navigation and an offset.
