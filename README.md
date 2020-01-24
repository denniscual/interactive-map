## Interactive Maps Playground

You can find the codebase for the interactive maps which we are using in the GDM in here. It also includes an editor which we can use to manually create some data like nodes. In the future,
we gonna separate this editor to its own repo.

GDM store assistant is the only app which has perfect integration for this library. If only want to create maps which will run on the store assistant, we can easily update its provider data without changing some template codes. But if we gonna use it to other app, there are things we need to consider.

NOTE: Due to major changes in implementation details and behaviour of the map and no tests are defined, it is prone in breaking when changing some of the codes. Some of the codes are also not clean like overusing `Contexts`. We will change it in the future but for now, **please create PR if you want changes**.

### Project Structures

You can find many files inside `src`. We gonna focus in `app` and `interactive-maps` dirs.
`interactive-maps` holds the codes for creating maps. It provides some public API on how you can implement it through your app. As much as possible, we gonna interact on its API. `app` directory holds the client data like area stores, nodes, and translations. You can also find codes on how we use `interactive-maps` package into the app. Inside `app`, you can find `map`. This directory and inner files are structured the same on `map` of dufry store assistant provider. We can easily mirror it.

### Quick Start

After cloning, type `yarn start`. Make sure you are in `master` branch.
