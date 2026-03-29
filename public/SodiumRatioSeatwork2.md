# Seatwork #2 - Getting to know CSS Position and z-index.
### This seatwork will ask you to implement the different CSS position on a given code.
### short link to this .md file is: https://bit.ly/4c61P9K

---

## Step 1 (Static vs Relative)

**CSS added to `.sidebar`:**
```css
position: relative;
top: 20px;
left: 20px;
```

**Guided Question: What changed compared to the default static positioning?**

With `position: static` (the default), the sidebar just sits in its normal place in the document flow — it goes exactly where the browser puts it, and `top`, `left`, `bottom`, and `right` have no effect at all.

With `position: relative`, the element still occupies its original space in the document flow (other elements still see it as being in its original position), but it visually shifts from that original spot. Adding `top: 20px; left: 20px;` moves it 20px down and 20px to the right from where it would normally be. If you change `top` to a negative value like `-20px`, it moves up. Changing `left: 20px` to `right: 20px` instead moves it from the right side. The key thing is: the space it "used to be" is still reserved — nothing fills it.

---

## Step 2 (Fixed)

**CSS added to `.footer`:**
```css
position: fixed;
bottom: 0;
width: 100%;
```

**Guided Question: What happens when you scroll the page? Why does the footer behave differently from position: relative?**

When you scroll, the footer stays glued to the bottom of the browser window — it never moves. This is because `position: fixed` removes the element completely from the normal document flow and positions it relative to the **viewport** (the browser window itself), not the page.

`position: relative` still keeps the element inside the flow of the page — it scrolls along with the rest of the content. `position: fixed` ignores the page entirely and sticks to the screen. This is why fixed is commonly used for navigation bars and floating buttons that should always be visible.

---

## Step 3 (Absolute)

**CSS added to `.content`:**
```css
position: absolute;
top: 66px;
left: 200px;
```

**Guided Question: What is the effect of position: absolute on an element? How is it different from fixed?**

`position: absolute` removes the element from the normal document flow entirely — other elements act as if it doesn't exist. It then gets positioned relative to its **nearest ancestor that has a non-static position** (i.e., an ancestor with `relative`, `absolute`, or `fixed`). If no such ancestor exists, it positions itself relative to the `<html>` element (the whole page).

The difference from `fixed`: `fixed` is always relative to the **viewport** (screen), so it stays in place when you scroll. `absolute` is relative to the **page or a positioned parent**, so it scrolls along with the page just like normal content.

---

## Step 4 (z-index)

**HTML added:**
```html
<div class="notice">Notice!</div>
```

**CSS added:**
```css
.notice {
    position: absolute;
    top: 60px;
    left: 400px;
    background: orange;
    padding: 10px;
    z-index: 2;
}
```
Also added `z-index: 1` to `.content`.

**Guided Question: Why does the notice appear on top of the content? What happens if you swap the z-index values?**

The `z-index` property controls the stacking order of positioned elements (elements that are not `position: static`). A higher `z-index` means the element appears on top. Since `.notice` has `z-index: 2` and `.content` has `z-index: 1`, the notice is drawn on top of the content box.

If you swap the values (give `.notice` a `z-index: 1` and `.content` a `z-index: 2`), the content box would render on top and the notice would be hidden behind it wherever they overlap.

**Challenge Answers:**

**1. Positioning `.notice` on the top-right corner of `.content`:**

To anchor `.notice` to `.content`, you need to make `.content` a positioning context by setting it to `position: relative`. Then `.notice` (set to `position: absolute`) will be placed relative to `.content`.

```css
.content {
    background: lightyellow;
    width: 300px;
    height: 200px;
    position: relative; /* makes it the anchor for absolute children */
    z-index: 1;
}

.notice {
    position: absolute;
    top: 0;
    right: 0;
    background: orange;
    padding: 10px;
    z-index: 2;
}
```

```html
<div class="content">
    Main Content
    <div class="notice">Notice!</div>
</div>
```

The notice must be placed **inside** the `.content` div in the HTML so it becomes a child of it.

**2. Changing `.content` to `relative` then `fixed`:**

- **`position: relative`**: The content box goes back into the normal document flow, sitting below the sidebar. It shifts slightly from its natural position if you use `top`/`left`, but otherwise behaves normally.
- **`position: fixed`**: The content box gets ripped out of the flow entirely and sticks to the viewport at the coordinates given. It no longer scrolls with the page, similar to the footer.

**3. Observations on z-index:**

`z-index` only works on elements that have a `position` value other than `static`. If two positioned elements overlap, the one with the higher `z-index` appears on top. Elements with the same `z-index` are stacked in the order they appear in the HTML (later elements on top). `z-index` doesn't affect non-positioned elements.

---

## Reflection Questions

**a. Summarize the differences between CSS position values (static, relative, absolute, fixed):**

| Value | In Flow? | Positioned Relative To | Scrolls With Page? |
|-------|----------|------------------------|-------------------|
| `static` | Yes | Normal flow (top/left/etc. have no effect) | Yes |
| `relative` | Yes (space reserved) | Its own original position | Yes |
| `absolute` | No | Nearest positioned ancestor (or `<html>`) | Yes |
| `fixed` | No | The viewport (browser window) | No |

- **Static**: Default. No special positioning. `top`, `left`, etc. are ignored.
- **Relative**: Nudges the element from its natural position. Space is still reserved.
- **Absolute**: Lifts element out of flow, places it relative to a positioned ancestor.
- **Fixed**: Like absolute but always relative to the screen — stays visible on scroll.

**b. How does absolute positioning depend on its parent element?**

An absolutely positioned element looks up the DOM tree for the first ancestor that has `position: relative`, `absolute`, or `fixed`. That ancestor becomes its "containing block" — the reference point for `top`, `left`, `bottom`, and `right`. If no positioned ancestor is found, it defaults to the `<html>` element. This is why wrapping a parent in `position: relative` is a common technique to control where absolutely positioned children appear.

**c. How do you differentiate sticky from fixed?**

`position: sticky` is a hybrid between `relative` and `fixed`. An element with `sticky` behaves like `relative` (stays in normal flow) until it reaches a defined scroll threshold (e.g., `top: 0`), at which point it "sticks" to that position like `fixed` — but only within its parent container's bounds. Once you scroll past the parent, it leaves with it.

`position: fixed` is always locked to the viewport from the start, regardless of scroll position or parent containers. A sticky element, in contrast, only activates when scrolled to a certain point and stops sticking when its parent is out of view.

A common use case for `sticky` is table headers that freeze in place while scrolling through the table, but disappear once you've scrolled past the table entirely.

**d. If you were designing a webpage for a school event, how might you use positioning to highlight important information?**

- **Fixed navigation bar** (`position: fixed; top: 0`): A top nav with links to sections like Schedule, Speakers, and Registration stays visible as users scroll, so they can always navigate without scrolling back up.
- **Fixed "Register Now" button** (`position: fixed; bottom: 20px; right: 20px`): A floating CTA button always visible in the corner, urging attendees to sign up.
- **Absolute badges on event cards** (`position: absolute; top: 0; right: 0`): A "SOLD OUT" or "NEW" badge overlaid on the top-right corner of specific event cards using `position: relative` on the card and `position: absolute` on the badge.
- **Sticky section headers** (`position: sticky; top: 60px`): Schedule headers like "Morning" and "Afternoon" stick to the top while scrolling through a long event timeline, keeping context visible.
- **z-index for modals/popups**: A registration confirmation popup or announcement overlay would use a high `z-index` to appear on top of all other content.