# Design System Specification: The Cognitive Canvas

## 1. Overview & Creative North Star
This design system is built to transform the dense, often clinical world of academic grant evaluation into a high-end editorial experience. We are moving away from the "data-heavy dashboard" trope and toward a **Creative North Star: The Cognitive Canvas.**

The Cognitive Canvas treats the interface as an expansive, intelligent workspace where human intuition meets AI precision. It breaks the traditional "template" look through **intentional asymmetry**, where content isn't just boxed in, but anchored by authoritative typography and breathable white space. By utilizing overlapping surfaces and high-contrast typography scales, we create a sense of "The Digital Curator"—a system that doesn't just display data but interprets it with scholarly weight.

---

## 2. Colors: Tonal Depth over Structural Lines
The palette uses sophisticated blues and mint greens to balance institutional trust with the "high-tech" nature of RAG (Retrieval-Augmented Generation) and LLM workflows.

### The "No-Line" Rule
To achieve a premium, custom feel, **1px solid borders for sectioning are strictly prohibited.** Boundaries must be defined solely through background color shifts. 
- A section within the `surface` (#f7fafc) background should be defined by a container using `surface_container_low` (#f1f4f6).
- This creates a soft, architectural feel that mimics natural paper and light rather than rigid code.

### Surface Hierarchy & Nesting
Treat the UI as a series of layered, physical sheets.
- **Base Level:** `surface` (#f7fafc).
- **Secondary Workspaces:** `surface_container_low` (#f1f4f6).
- **Focus Elements (Cards/Modals):** `surface_container_lowest` (#ffffff) to provide a "pop" of brightness.
- **Interactive Layers:** Use `surface_bright` to highlight active zones during LLM processing.

### The Glass & Gradient Rule
To prevent a "flat" academic look, use **Glassmorphism** for floating elements like navigation bars or AI insight panels. 
- Apply `surface` at 80% opacity with a `24px` backdrop-blur. 
- For main CTAs (e.g., "Generate Evaluation"), use a subtle linear gradient transitioning from `primary` (#385d8e) to `primary_container` (#5276a8) at a 135-degree angle. This adds "visual soul" and depth.

---

## 3. Typography: The Editorial Authority
We utilize a dual-typeface system to bridge the gap between academic rigor and modern tech.

- **Headlines (Manrope):** Use Manrope for all `display` and `headline` levels. Its geometric but friendly construction provides a "High-Tech Academic" tone. Large scales (e.g., `display-lg` at 3.5rem) should be used for key AI findings or grant titles to command attention.
- **Body & Utility (Inter):** Inter is the workhorse for `body`, `title`, and `label` roles. Its high x-height ensures readability for long-form grant proposals.

**Typography as Hierarchy:**
The brand identity is conveyed through extreme contrast. A `headline-lg` paired with a `label-md` in `on_tertiary_fixed_variant` (#00504a) creates an immediate visual hierarchy that tells the user exactly where the most "innovative" (Mint) information resides.

---

## 4. Elevation & Depth: Tonal Layering
Traditional drop shadows are replaced by **Tonal Layering** to maintain a clean, professional aesthetic.

- **The Layering Principle:** Place a `surface_container_lowest` (#ffffff) card on a `surface_container_low` (#f1f4f6) background. The subtle 1% difference in hex value provides a soft, natural lift.
- **Ambient Shadows:** For floating elements (like an LLM prompt box), use an ultra-diffused shadow: `box-shadow: 0 12px 40px rgba(24, 28, 30, 0.06);`. The shadow color is a tinted version of `on_surface` to mimic natural light.
- **The "Ghost Border" Fallback:** If containment is required for accessibility, use the `outline_variant` token (#c1c7d3) at **15% opacity**. This "Ghost Border" provides a hint of structure without cluttering the visual field.

---

## 5. Components

### Buttons
- **Primary:** Gradient (`primary` to `primary_container`), `xl` (1.5rem) roundedness. 
- **Secondary:** `surface_container_highest` (#e0e3e5) with `on_surface` text. No border.
- **Tertiary (Innovation Action):** `tertiary` (#006860) text with a subtle `tertiary_container` hover state.

### Cards & Lists
- **Forbid Divider Lines.** Separate list items using `12px` or `16px` vertical spacing.
- **Contextual Cards:** For RAG source citations, use a `surface_container_high` (#e5e9eb) background with `lg` (1rem) rounded corners.

### LLM Insight Chips
- Use `tertiary_fixed` (#79f7ea) background with `on_tertiary_fixed` (#00201d) text. These represent "AI-Verified" snippets, using the mint green to signal innovation and trust.

### Input Fields (The Prompt Bar)
- Use `surface_container_lowest` (#ffffff) with a `xl` (1.5rem) rounded corner. 
- When focused, apply a "Ghost Border" of `primary` at 20% and a subtle `4px` glow using the `primary_fixed` (#d4e3ff) token.

---

## 6. Do’s and Don'ts

### Do:
- **Do** use asymmetric layouts. For example, align a grant summary to the left and float AI-generated "Innovation Scores" in a card to the right with extra breathing room.
- **Do** use `title-lg` (Inter) for sub-headers to maintain a clean, academic structure.
- **Do** allow content to "bleed" off the edge of containers in a controlled way to emphasize the "Canvas" feel.

### Don't:
- **Don't** use 100% black (#000000). Always use `on_surface` (#181c1e) for text to keep the contrast professional and "soft."
- **Don't** use standard `0.25rem` (sm) rounded corners. This system requires `lg` (1rem) to `xl` (1.5rem) to feel approachable and modern.
- **Don't** use high-contrast dividers between search results. Use background alternating tones (`surface` vs `surface_container_low`) instead.