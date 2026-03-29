# 🎯 Overview

This Rhino plugin adds a contextual radial menu around your cursor, so common commands are always close to where you work.
You can set up to 3 submenu levels.
**Compatible with macOS and Windows.**

### 📷 Screenshots
<table style="border:none;">
  <tr>
    <td>Radial menu</td>
    <td>Settings</td>
  </tr>
  <tr>
    <td align="center">
      <img src="./Docs/Images/RadialMenu.png" width="300">
    </td>
    <td align="center">
      <img src="./Docs/Images/Settings.png" width="300">
    </td>
  </tr>
</table>

### 📹 Some demo videos
<details>
<summary><b>Drag Rhino Toolbar item to RadialMenu</b></summary>
<img src="./Docs/Images/Toolbar_item_dragdrop.gif" style="width:33%;height:33%;">
</details>
<details>
<summary><b>Move/Re-organise RadialMenu items</b></summary>
<img src="./Docs/Images/RadialMenuMoveMenuItem.gif" style="width:33%;height:33%;">
</details>

# ⚙️ Main features

###### 🖱️ **Interactions**
 - Drag and drop Rhino toolbar items to add menu items to the radial menu.
 - Rearrange radial menu items with drag and drop.

 ###### ▶️ **Execution**
 - Launch `Primary` and `Alternate` Rhino commands (left/right click).
###### ⚙️ **Configuration**
- Manage multiple menu setups with smart rules: when you select objects in Rhino, the radial menu can switch to a setup defined by your rules.
- Edit menu items manually when needed (icon, primary/alternate command, tooltip).
- Customize the radial menu in the settings editor (theme, animation speed, configuration rules, shape).
### 🚀 Key benefits
- Faster command access with less pointer travel.
- Better focus in the viewport, with fewer trips to distant toolbars.
- More fluid modeling workflow by grouping actions in a clear circular layout.

# 🗒️ Notes

⚠️ **Current limitations**
- No keyboard navigation ("hotkeys")
- Custom shortcuts using a modifier key + mouse button are not yet supported. This feature will be available soon
- Smart Config is functional, but will be improved over time.

🧪 **Beta demo version** (The final **Commercial** release is coming soon)
- All features are enabled
- Settings are **NOT** persisted
- When Rhino restarts, the radial menu returns to the default setup

👉Add the `RadialMenu` command to your favorite shortcut (mouse button, SpaceMouse button, or keyboard shortcut), then start modeling.

# 📖 How to Use

### 1. Show/Hide the radial menu
* Run the "RadialMenu" command to show the menu. If the menu is already visible, run "RadialMenu" again to hide it.
* **Note** that you can add the command `RadialMenu`to any keyboard shortcut or mouse button in Rhino settings.
### 2. Mouse and Keyboard Controls
| OS      | Run primary action       | Run alternate action      | Drag/drop a menu item  | Settings                                            | Edit menu item                                |
| ------- | ------------------------ | ------------------------- | ---------------------- | --------------------------------------------------- | --------------------------------------------- |
| macOS   | Left click (no modifier) | Right click (no modifier) | Left click + `Cmd` key | In the center circle<br>Right click + `Cmd` key     | On a menu item<br>Right click + `Cmd` key     |
| Windows | Left click (no modifier) | Right click (no modifier) | Left click + `Alt` key | In the center circle<br>Right click + `Control` key | On a menu item<br>Right click + `Control` key |

If no modifier is listed, use click only.




