## Interactive Maps Playground

You can find the codebase for the interactive maps in here. It also includes an editor which we can use to manually create some data like nodes. In the future,
we gonna separate this editor to its own repo.


### Project Structures

You can find many files inside `src`. We gonna focus in `app` and `interactive-maps` dirs.
`interactive-maps` holds the codes for creating maps. It provides some public API on how you can implement it through your app. As much as possible, we gonna interact on its API. `app` directory holds the client data like area stores, nodes, and translations. You can also find codes on how we use `interactive-maps` package into the app. Inside `app`, you can find `map`.

### Quick Start

After cloning, type `yarn start`. Make sure you are in `master` branch.
