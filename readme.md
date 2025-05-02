# Create Web App CLI

A command-line interface tool to quickly set up web applications with custom options, based on `create-next-app`.

## Features

- **Interactive App Name Prompt:** If you don't provide an app name as an argument, the CLI will prompt you for one.
- **MUI Integration (Optional):** Easily include Material UI (MUI) with essential dependencies and basic configuration.
- **Basic MUI Atom Components (Optional):** Scaffold a set of fundamental MUI atom components (Button, Input, Link, Image, Dialog, Loader, Radio, Tooltip) to kickstart your UI development.
- **Redux Toolkit Integration (Optional):** Set up Redux Toolkit for state management with a basic store and slices directory.
- **Testing Setup (Optional):** Configure Jest and React Testing Library for unit and integration testing.
- **Prettier Configuration:** Includes a `.prettierrc` file with opinionated formatting settings.
- **Organized Folder Structure:** Creates a standard `src` directory with subfolders for constants, services, interfaces (if TypeScript), assets, fonts, utils, hooks, and a well-structured `components` directory (atoms, molecules, organisms, templates).
- **TypeScript Support:** Detects if the project is TypeScript and adjusts file extensions and configurations accordingly.
- **Handles `src` Directory Option:** Correctly locates and modifies the `_app` file whether or not the `src` directory is chosen during `create-next-app` setup.
- **Clean `_app` Configuration:** Configures the `_app.js/tsx` file with necessary providers (MUI's `ThemeProvider`, Redux's `Provider`) without duplicates.

## Prerequisites

- Node.js (version >= 16.x)
- npm (version >= 8.x) or yarn
- Currenty doesn't support app-router structure, only pages-router.

## Installation

1.  Clone this repository (or copy the main CLI script and related modules).
2.  Navigate to the directory containing the CLI script.
3.  Make the script executable (if necessary):
    ```bash
    chmod +x your-cli-script-name.js
    ```
4.  You can link it globally to use it from anywhere:
    ```bash
    npm link
    # or
    yarn global add <path-to-your-cli-script>
    ```

## Usage

```bash
create-web-app [appName] [options]
```

# Create Web App CLI

## appName (optional)

The name of your new web application directory. If not provided, you'll be prompted for it.

---

## Options

The CLI will interactively prompt you for the following options:

- **Would you like to include MUI?** (yes/no)
- **Would you like to include some basic MUI atom components?** (yes/no, only if MUI is selected)
- **Would you like to implement tests?** (yes/no)
- **Would you like to include Redux Toolkit for state management?** (yes/no)

---

## Examples

### Create a new app named `"my-app"` with interactive prompts:

```bash
create-web-app my-app
```

## Project Structure

After the CLI finishes, your project directory will look something like this:

```bash
my-app/
├── .prettierrc
├── package.json
├── public/
├── src/
│ ├── assets/
│ ├── components/
│ │ ├── atoms/
│ │ ├── hoc/
│ │ ├── molecules/
│ │ ├── organisms/
│ │ └── templates/
│ ├── constants/
│ ├── fonts/
│ ├── hooks/
│ ├── interfaces/ # (if TypeScript)
│ ├── services/
│ ├── store/ # (if Redux opted)
│ │ ├── slices/
│ │ └── store.js/tsx
│ └── utils/
├── pages/
│ ├── _app.js/tsx
│ └── index.js/tsx
├── setupTests.js/tsx # (if tests opted)
├── jest.config.js/ts # (if tests opted)
└── ...other Next.js files
```

## Getting Started After Setup

### Navigate to your new application directory:

```bash
cd my-app
```

### Install dependencies:

```bash
npm install
# or
yarn install
```

### Start the development server:

```bash
npm run dev
# or
yarn dev
```

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
