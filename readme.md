# ArtVisio

ArtVisio is a browser-based virtual art gallery built with Vite, Three.js and Firebase. It provides a 3D gallery alongside account, profile and artwork-management pages.

## Features

- Render and navigate a Three.js gallery scene with artwork, walls, lighting and movement controls.
- Display artwork information through gallery interactions.
- Create accounts and sign in with Firebase Authentication.
- Store and read user profile data through Firestore.
- Edit user profiles and view artist/profile pages.
- Upload artwork and view previously uploaded artwork through the Firebase-backed application flow.
- Provide instruction, about and contact pages alongside the gallery.

## Tech stack

| Layer | Technology |
|---|---|
| Build tooling | Vite 5 |
| 3D rendering | Three.js 0.160 |
| Backend services | Firebase Authentication, Firestore and Firebase Storage |
| UI | HTML, JavaScript, Bootstrap |

## Requirements

- Node.js and npm. The repository does not pin an exact Node.js version.
- A Firebase project configured for the services used by the application.

## Installation

```bash
git clone https://github.com/Mohamed-Y-Mohamed/ArtVisio.git
cd ArtVisio
npm install
```

The repository does not define npm scripts. Run Vite directly:

```bash
npx vite
```

Vite prints the local development URL when it starts.

## Configuration

Firebase configuration is currently stored in `src/components/firebase-setup.js`. The checked-in configuration fields are empty, so a fresh clone requires values for:

```text
apiKey
authDomain
databaseURL
projectId
storageBucket
messagingSenderId
appId
```

These are Firebase web-app configuration values rather than server secrets, but access to Firebase data still depends on the project's Authentication, Firestore and Storage security rules.

## Building

Because `vite` is installed as a development dependency but no build script is defined, build with:

```bash
npx vite build
```

Vite writes the production output to `dist/` by default.

## Testing

No automated test files or test command were found, so no test workflow is documented.

## Licence

See [LICENSE](LICENSE).

The existing root licence has not been replaced automatically because the repository also vendors third-party Bootstrap JavaScript and CSS. Those files carry their own upstream copyright and licensing obligations and should be separated or documented before applying one repository-wide licence.
