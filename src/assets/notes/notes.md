<h1>Relative link paths</h1>
<hr>
The first segment name can be prepended (attach (a piece of data) to the beginning of another.) with /, ./, or ../.

If the first segment begins with /, the router looks up the route from the root of the app.
If the first segment begins with ./, or doesn't begin with a slash, the router looks in the children of the current activated route.
If the first segment begins with ../, the router goes up one level in the route tree.