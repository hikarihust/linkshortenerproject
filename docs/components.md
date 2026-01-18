# Component Guidelines - Link Shortener Project

This document outlines the UI component standards and guidelines for this application.

## Core Principle

**All UI elements MUST use shadcn/ui components.**

DO NOT create custom components from scratch. Always leverage shadcn/ui's component library.

## shadcn/ui Integration

This project uses [shadcn/ui](https://ui.shadcn.com/) - a collection of re-usable components built with Radix UI and Tailwind CSS.

### Key Characteristics
- **Not a library**: Components are copied into your project
- **Customizable**: You own the code and can modify as needed
- **Accessible**: Built on Radix UI primitives
- **Styled with Tailwind**: Consistent with project styling approach

## Adding Components

To add a new shadcn/ui component to the project:

```bash
npx shadcn@latest add [component-name]
```

Examples:
```bash
npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add dialog
npx shadcn@latest add form
```

This will:
1. Install necessary dependencies
2. Add the component to your project (typically in `/components/ui`)
3. Configure it according to your `components.json` settings

## Component Location

- **shadcn/ui components**: `/components/ui/`
- **Composed components**: `/components/` (root level)

## Usage Pattern

### ✅ Correct Approach

```tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function MyForm() {
  return (
    <form>
      <Input placeholder="Enter URL" />
      <Button type="submit">Shorten</Button>
    </form>
  );
}
```

### ❌ Incorrect Approach

```tsx
// DON'T create custom button from scratch
export function CustomButton({ children }) {
  return (
    <button className="px-4 py-2 rounded">
      {children}
    </button>
  );
}
```

## Composition Over Creation

If you need a variant or extended functionality:

### ✅ Compose from shadcn/ui

```tsx
import { Button } from "@/components/ui/button";

export function SubmitButton({ isLoading, children }) {
  return (
    <Button disabled={isLoading} type="submit">
      {isLoading ? "Loading..." : children}
    </Button>
  );
}
```

### Available Components

Common shadcn/ui components for this project:
- `button` - Buttons with variants
- `input` - Text inputs
- `card` - Card containers
- `dialog` - Modals/dialogs
- `form` - Form handling with react-hook-form
- `table` - Data tables
- `toast` - Notifications
- `dropdown-menu` - Dropdown menus
- `select` - Select dropdowns
- `label` - Form labels

[View full component list](https://ui.shadcn.com/docs/components)

## Styling Components

### Using Variants (Preferred)

shadcn/ui components come with built-in variants:

```tsx
<Button variant="default">Default</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Cancel</Button>
<Button variant="ghost">Close</Button>
```

### Adding Tailwind Classes

You can extend styling with Tailwind classes:

```tsx
<Button className="w-full mt-4">
  Full Width Button
</Button>
```

### Modifying Components

Since components live in your codebase, you can modify them directly in `/components/ui/` if needed. However, prefer using:
1. Built-in variants
2. Tailwind classes via `className`
3. Composition patterns

Before modifying core components.

## Form Handling

Use shadcn/ui's form component with react-hook-form:

```tsx
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function MyForm() {
  const form = useForm();
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
```

## Icons

Use **Lucide React** for icons (included with shadcn/ui):

```tsx
import { Link, Copy, ExternalLink } from "lucide-react";

<Button>
  <Link className="mr-2 h-4 w-4" />
  Shorten Link
</Button>
```

## Quick Reference

### Before Creating Any UI Element

1. **Check shadcn/ui docs**: Does this component exist?
2. **Install if needed**: `npx shadcn@latest add [component]`
3. **Import and use**: Use the shadcn/ui component
4. **Compose if needed**: Build on top, don't rebuild

### Component Checklist

- [ ] Is there a shadcn/ui component for this?
- [ ] Have I installed it in the project?
- [ ] Am I importing from `@/components/ui/`?
- [ ] Can I use variants instead of custom styling?

## Resources

- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [shadcn/ui Components](https://ui.shadcn.com/docs/components)
- [Radix UI Primitives](https://www.radix-ui.com/)
- [Lucide Icons](https://lucide.dev/)

---

**Last Updated**: January 18, 2026
