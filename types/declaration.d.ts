declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

// This is a declaration file for CSS modules. It tells TypeScript that when you import a CSS file, it should treat it as a module and give you the types for the CSS classes.