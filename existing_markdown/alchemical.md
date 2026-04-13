<p style="text-align:center"><img src="minecraft_title_hd.png" width="500"></p>

Alchemical introduces a reusable elixir system inspired by real-world alchemy. Unlike vanilla potions, elixirs are never consumed — they are permanent flasks that you craft, fill with powerful alchemical ingredients, and drink over and over again. Each drink grants a prolonged potion effect based on the ingredients added and places you on a cooldown before you can drink from ANY elixir again.

What makes elixirs unique is their composition system. Every elixir is built from three types of ingredients — <span style="color:#CC8800">Essence Stones</span>, <span style="color:#88CCFF">Tinctures</span>, and <span style="color:#CC88FF">Catalysts</span> — each contributing different aspects of the final effect. Load multiple Essence Stones to switch between different effects on the fly, and fine-tune your elixir's duration, potency, and cooldown with the right combination of Tinctures and Catalysts.

The entire ingredient system is datapack-driven, meaning modpack makers and server operators can add, remove, or modify every ingredient and their effects on the elixir in the game without touching any code. A default datapack with 10 Essence Stones, 4 Tinctures, and 4 Catalysts is included and enabled by default, but can be disabled or overridden on world creation.

<p style="text-align:center"><img src="elixir_logo_450.png" width="150"></p>

---

### Getting Started

#### Step 1: Craft the Athanor

The Athanor is your alchemical crafting station — a specialized block where you load ingredients into your elixir. To craft one you will need copper ingots, a cauldron, a furnace, blackstone, and a blaze rod. This requires a trip to the Nether for the blackstone and blaze rod.

<p style="text-align:center"><img src="Crafting_Table_Athanor_Recipe.png" width="660"></p>

Place the Athanor down in your base. It glows with a warm light, similar to a lit furnace, making it easy to spot in darker builds.

#### Step 2: Craft an Elixir Flask

The Elixir Flask is the core item of the mod — a reusable container that holds your alchemical ingredients and delivers their effects when you drink from it. Crafting one requires glass bottles, an amethyst shard, and a Heart of the Sea. The Heart of the Sea can only be found in buried treasure chests located via explorer maps in shipwrecks and ocean ruins, so you will need to do some adventuring before you can craft your first elixir.

<p style="text-align:center"><img src="Crafting_Table_Elixir_Recipe.png" width="660"></p>

The elixir starts completely empty. It has no effect until you load ingredients into it using the Athanor.

#### Step 3: Place the Elixir in the Athanor

Right-click the Athanor to open its interface, then place your empty elixir into the center slot. You will see the left panel display the elixir's name, a row of capacity dots representing how much room is available for ingredients, and a message saying "No ingredients added."

<p style="text-align:center"><img src="Athanor_Menu_With_Empty_Elixir.png" width="660"></p>

The diamond-shaped capacity dots represent potency slots. Each ingredient you add will fill a certain number of these dots based on its potency value. When all dots are filled, the elixir is at capacity and no more ingredients can be added.

#### Step 4: Add Your First Essence Stone

Essence Stones are the core of your elixir — they determine which potion effect is granted when you drink. Place an Essence Stone into the ingredient slot on the right side of the Athanor. You will immediately see a preview showing the stone's name, type, potency cost, and the effect it grants.

<p style="text-align:center"><img src="Athanor_Menu_With_Bastion_Stone_In_Add_Slot.png" width="660"></p>

In this example, a Bastion Stone is staged in the ingredient slot. It shows:
- <span style="color:#DDDDDD">**Bastion Stone**</span> — the ingredient name
- <span style="color:#7788AA">ESSENCE STONE</span> — the ingredient type
- **Potency: 3** — it will consume 3 of the elixir's capacity dots
- **Resistance I** — the effect it grants
- **Effect Duration: 5m 0s** — how long the effect lasts per drink

The capacity dots on the left will preview which slots will be filled in blue. If the ingredient would exceed the remaining capacity, the preview dots turn red. Click the **Add** button to confirm and load the stone into the elixir.

#### Step 5: Your First Loaded Elixir

After adding the Bastion Stone, the left panel updates to show the elixir's current state. The capacity dots are now partially filled, and the overview section displays the active effect with its computed duration and cooldown.

<p style="text-align:center"><img src="Athanore_Menu_Elixir_With_1_Stone.png" width="660"></p>

You can see:
- The capacity dots show 3 filled (the Bastion Stone's potency cost)
- **Resistance I [Active]** — the stone's effect, marked as the currently active stone
- **Duration: 5m 0s** — how long Resistance will last when you drink
- **Cooldown: 30m 0s** — how long before you can drink again

The elixir now has one Essence Stone, but it also needs at least one Tincture before it can be used. An elixir requires a minimum of 1 Essence Stone and 1 Tincture to be drinkable.

#### Step 6: Add a Tincture

Tinctures are liquid bases that modify the properties of your elixir. Place a valid tincture item into the ingredient slot. In this example, a water bottle is recognized as an "Aqueous Solution" tincture.

<p style="text-align:center"><img src="Athanor_Menu_Aqueous_Solution_In_Add_Slot.png" width="660"></p>

The tincture preview shows:
- <span style="color:#DDDDDD">**Aqueous Solution**</span> — the tincture name
- <span style="color:#7788AA">TINCTURE</span> — the ingredient type
- **Potency: 1** — only consumes 1 capacity slot
- **Effect Duration x1.25** — multiplies the effect duration by 1.25

After adding this tincture, the Bastion Stone's Resistance effect duration increases from 5m 0s to 6m 15s (5 minutes multiplied by 1.25). Different tinctures offer different modifiers — some boost effect level, some extend duration, and some reduce cooldown. You can add multiple tinctures to stack their effects.

#### Step 7: The Information Icon

Once your elixir has ingredients loaded, a small info icon appears in the left panel. Hover over it to see a complete breakdown of every ingredient in the elixir, organized by type — Essence Stones, Tinctures, and Catalysts — with each ingredient's individual stats listed.

<p style="text-align:center"><img src="Athanor_Menu_Information_Icon_Popup.png" width="660"></p>

This tooltip is helpful when you have many ingredients loaded and want to see exactly what each one is contributing to the elixir's final stats.

#### Step 8: Loading Multiple Essence Stones

One of the most powerful features of elixirs is the ability to load multiple Essence Stones. Each stone grants a different potion effect, and you can switch between them at will. Here an Ember Stone (Fire Resistance) has been added alongside the Bastion Stone (Resistance).

<p style="text-align:center"><img src="Athanor_Menu_With_2_Stones.png" width="660"></p>

The left panel now shows both effects with their individual stats. The currently active stone is marked with **[Active]** — this is the effect you will receive when you drink. Notice how the duration values reflect the tincture modifier applied to each stone's base duration individually.

#### Step 9: A Fully Loaded Elixir

After adding tinctures and catalysts to further modify your elixir, the effects become significantly more powerful. Catalysts like Blaze Powder or Glowstone Dust can increase the effect level at the cost of higher cooldowns or reduced duration.

<p style="text-align:center"><img src="Athanor_Menu_With_2_Stones_In_It_Jump_Boost_2_Active.png" width="660"></p>

In this example, the elixir contains two stones boosted to level II effects with modified durations and cooldowns. The **Empty Elixir** button at the bottom left allows you to clear all ingredients and start over — but be careful, as Essence Stones have a chance of being destroyed in the process (configurable, 50% by default), and all Tinctures and Catalysts are always lost.

#### Overview of Default Items

The default datapack includes the Elixir Flask, 10 Essence Stones covering a wide range of effects, and the Athanor crafting station. All of these items are available in the Alchemical creative tab.

<p style="text-align:center"><img src="Creative_Menu_Default_Datapack_Items.png" width="660"></p>

---

### Using Your Elixir

Once your elixir has at least one Essence Stone and one Tincture loaded, you can drink it by right-clicking (use) while holding it. Drinking grants the active stone's effect for the computed duration, then places you on cooldown.

**Inventory Tooltip**

Hovering over your elixir in your inventory shows a quick summary of the active stone. This is the default view without holding Shift:

<p style="text-align:center"><img src="Elixir_Inventory_Popup_With_No_Shift_Down.png" width="540"></p>

Hold **Shift** to see the full details — effect name and level, duration, cooldown, and a list of all loaded Essence Stones with the active one highlighted:

<p style="text-align:center"><img src="Elixir_Inventory_Popup_With_Shift_Down_Bastion_Stone_Selected.png" width="540"></p>

**Switching Active Stones**

If your elixir has more than one Essence Stone loaded, you can switch between them by pressing **Shift + Use** (Shift + Right-click). This cycles through the loaded stones, changing which effect will be granted the next time you drink. The tooltip updates immediately to reflect the new active stone:

<p style="text-align:center"><img src="Elixir_Inventory_Popup_With_Shift_Down_Ember_Stone_Selected.png" width="540"></p>

This means a single elixir can serve as your Speed potion, Fire Resistance potion, and Resistance potion all in one item — just switch to the stone you need and drink.

---

### The Three Ingredient Types

Every ingredient in Alchemical falls into one of three categories. Understanding how they interact is key to crafting the perfect elixir.

#### Essence Stones

<span style="color:#CC8800">Essence Stones</span> are the heart of every elixir. Each stone is tied to a specific potion effect — Speed, Resistance, Fire Resistance, Night Vision, and more. When you drink an elixir, the currently active stone determines which effect you receive.

- Each stone has a **base duration** (how long the effect lasts) and a **base level** (the effect amplifier)
- Stones have a **potency** value that determines how many capacity slots they consume (default: 2)
- You can load up to 3 stones per elixir (configurable) and switch between them freely
- Crafted at a crafting table using a potion of the matching type plus thematic materials

The 10 default Essence Stones are: Swift Stone (Speed), Leaping Stone (Jump Boost), Ember Stone (Fire Resistance), Tidal Stone (Water Breathing), Nightseer Stone (Night Vision), Zephyr Stone (Slow Falling), Might Stone (Strength), Crimson Stone (Regeneration), Phantom Stone (Invisibility), and Bastion Stone (Resistance).

#### Tinctures

<span style="color:#88CCFF">Tinctures</span> are liquid bases that modify your elixir's properties. They are made from existing Minecraft items like water bottles, honey bottles, experience bottles, and dragon's breath. Tinctures primarily affect **effect duration** and can also increase **effect level**.

- Aqueous Solution (Water Bottle) — Duration x1.25, Potency 1
- Honey Distillate (Honey Bottle) — Duration x1.15, +1 Effect Level, Potency 2
- Arcane Extract (Experience Bottle) — Duration x1.10, Cooldown x0.90, Potency 1
- Dragon's Essence (Dragon Breath) — Duration x1.20, +1 Effect Level, Potency 3

#### Catalysts

<span style="color:#CC88FF">Catalysts</span> are reactive powders and dusts that provide powerful but costly modifications. They tend to increase effect level or duration significantly, but at the expense of longer cooldowns.

- Glowstone Powder (Glowstone Dust) — +1 Effect Level, Cooldown x1.40, Potency 2
- Redstone Catalyst (Redstone) — Duration x1.50, Cooldown x1.20, Potency 1
- Blaze Catalyst (Blaze Powder) — +1 Effect Level, Duration x0.80, Cooldown x1.15, Potency 2
- Volatile Catalyst (Gunpowder) — Duration x1.65, Cooldown x1.45, Potency 1

#### How Modifiers Stack

All tincture and catalyst modifiers stack multiplicatively for multipliers and additively for flat values and level modifiers. For example, if you have two tinctures with duration multipliers of x1.25 and x1.15, the final duration multiplier is 1.25 * 1.15 = 1.4375. Effect level modifiers from all tinctures and catalysts are summed and added to the stone's base level.

---

### Emptying an Elixir

If you want to change your elixir's loadout, you can empty it using the **Empty Elixir** button in the Athanor's left panel. This is a two-step process — click once to see a "Confirm?" prompt, then click again to confirm.

When you empty an elixir:
- **Essence Stones** have a configurable chance to survive and return to your inventory (default: 50% destruction chance). Each stone rolls independently.
- **Tinctures** are always destroyed — the liquids cannot be recovered.
- **Catalysts** are always destroyed — the reactive powders are consumed.

This makes Essence Stones somewhat precious. High-value stones like the Bastion Stone (which requires Netherite Scrap to craft) should be carefully considered before clearing.

---

### Server Configuration

Alchemical provides server-side configuration options that allow server operators and modpack makers to tune the mod's balance. The config file is located at `serverconfig/alchemical-server.toml` and contains the following settings:

| Setting | Default | Range | Description |
|---|---|---|---|
| `essenceStoneBreakChance` | **0.5** | 0.0 – 1.0 | The probability (0% to 100%) that an Essence Stone is destroyed when emptying an elixir. Set to `0.0` to always return stones safely, or `1.0` to always destroy them. Each stone rolls independently. |
| `elixirCooldownSeconds` | **1800** | 0 – 86400 | The base cooldown in seconds after drinking an elixir, before any ingredient modifiers are applied. The default of 1800 is 30 minutes. Set to `0` to disable cooldowns entirely. Maximum is 86400 (24 hours). |
| `elixirCapacity` | **9** | 1 – 45 | The maximum total potency that can be loaded into a single elixir. Each ingredient has a potency value (typically 1-3) that consumes capacity when loaded. Higher capacity allows more ingredients to be stacked. |
| `maxEssenceStones` | **3** | 1 – 10 | The maximum number of Essence Stones that can be loaded into a single elixir. This limits how many switchable effects a single elixir can hold. |

---

### Datapack Configuration

Alchemical's ingredient system is entirely data-driven. Every Essence Stone, Tincture, and Catalyst is defined by a JSON file loaded from datapacks. The mod ships with a built-in default datapack called **"Alchemical Defaults"** that is enabled by default when creating a new world, but it can be disabled on the world creation screen under the Data Packs section.

You can override any default definition by creating your own datapack with a file at the same path, or add entirely new ingredients by creating new JSON files. This makes Alchemical fully customizable for modpack makers without needing to modify any code.

---

#### Essence Stone Definitions

**Path:** `data/<namespace>/alchemical/essence_stone/<name>.json`

Essence Stone definitions control what effect a stone grants, how long it lasts, and how much capacity it consumes. Here is a complete example using the Bastion Stone:

```json
{
  "name": "Bastion Stone",
  "color": "#888899",
  "effect": "minecraft:resistance",
  "base_duration": 6000,
  "potency": 3
}
```

**JSON Keys:**

**`effect`** — <span style="color:#FF6666">Required</span>

The ResourceLocation of the mob effect to grant when this stone is active and the elixir is drunk. Must be a valid registered effect (e.g., `minecraft:speed`, `minecraft:regeneration`, or a modded effect like `mymod:flight`).

**`name`** — *Optional, no default*

The display name shown in the Athanor UI and item tooltips. If omitted, the stone will use its registry ID as a fallback name.

**`color`** — *Optional, default: `#AA88FF`*

A hex color string used for UI elements like the stone's name color in tooltips. Accepts standard 6-digit hex format with `#` prefix.

**`base_duration`** — *Optional, default: `200`*

The base effect duration in **ticks** (20 ticks = 1 second). This is the duration before any tincture or catalyst modifiers are applied. The default of 200 ticks is only 10 seconds — most stones in the default datapack use much higher values (6,000 to 12,000 ticks, or 5 to 10 minutes).

**`base_level`** — *Optional, default: `1`*

The base effect amplifier level. A value of 1 means the effect starts at level I. Tincture and catalyst `effect_level_modifier` values are added to this base. For example, a base_level of 1 with two +1 modifiers results in a level III effect.

**`elixir_cooldown_multiplier`** — *Optional, default: `1.0`*

A multiplier applied to the elixir's base cooldown (from server config) when this stone is active. Values above 1.0 increase cooldown, values below 1.0 decrease it. Stacks multiplicatively with tincture and catalyst cooldown multipliers.

**`elixir_cooldown_flat`** — *Optional, default: `0`*

A flat number of **seconds** added to (or subtracted from, if negative) the cooldown after all multipliers are applied.

**`potency`** — *Optional, default: `2`*

How many capacity slots this stone consumes when loaded into an elixir. Higher potency stones are more costly to include but may offer stronger effects. The Bastion Stone (Resistance) costs 3 potency, making it the most expensive default stone.

---

#### Tincture Definitions

**Path:** `data/<namespace>/alchemical/tincture/<name>.json`

Tinctures are identified by their Minecraft item — when a player places that item into the Athanor's ingredient slot, it is recognized as this tincture. Here is the Honey Distillate tincture:

```json
{
  "item": "minecraft:honey_bottle",
  "name": "Honey Distillate",
  "effect_duration_multiplier": 1.15,
  "effect_level_modifier": 1,
  "potency": 2
}
```

**JSON Keys:**

**`item`** — <span style="color:#FF6666">Required</span>

The ResourceLocation of the Minecraft item that serves as this tincture. When this item is placed in the Athanor's ingredient slot, it will be recognized as a tincture with these properties. Each item can only be one ingredient type — if an item is registered as both a tincture and a catalyst, the tincture takes priority.

**`name`** — *Optional, no default*

The display name shown in the UI. If omitted, the item's default name is used.

**`effect_duration_multiplier`** — *Optional, default: `1.0`*

Multiplier applied to the active stone's effect duration. Values above 1.0 extend the duration, values below 1.0 shorten it. Multiple tincture and catalyst duration multipliers stack multiplicatively.

**`effect_duration_flat`** — *Optional, default: `0`*

A flat number of **ticks** added to the effect duration after all multipliers are applied. Can be negative to reduce duration.

**`effect_level_modifier`** — *Optional, default: `0`*

An additive modifier to the effect level. A value of 1 means this tincture adds +1 to the final effect level. Multiple level modifiers from tinctures and catalysts are summed together.

**`elixir_cooldown_multiplier`** — *Optional, default: `1.0`*

Multiplier applied to the elixir cooldown. Stacks multiplicatively with other cooldown multipliers from all sources.

**`elixir_cooldown_flat`** — *Optional, default: `0`*

Flat seconds added to the cooldown after all multipliers.

**`potency`** — *Optional, default: `1`*

How many capacity slots this tincture consumes. The simplest tincture (Aqueous Solution / water bottle) costs only 1 slot, while more powerful ones like Dragon's Essence cost 3.

Here is the simplest possible tincture definition — a water bottle that boosts duration by 25%:

```json
{
  "item": "minecraft:potion",
  "name": "Aqueous Solution",
  "effect_duration_multiplier": 1.25
}
```

All omitted fields use their defaults (1.0 for multipliers, 0 for flat values and level modifier, 1 for potency).

---

#### Catalyst Definitions

**Path:** `data/<namespace>/alchemical/catalyst/<name>.json`

Catalysts use the exact same JSON structure as tinctures. They are also identified by their Minecraft item and provide the same modifier fields. The distinction is purely organizational — catalysts are loaded from the `catalyst/` directory while tinctures are loaded from the `tincture/` directory.

Here is the Blaze Catalyst:

```json
{
  "item": "minecraft:blaze_powder",
  "name": "Blaze Catalyst",
  "elixir_cooldown_multiplier": 1.15,
  "effect_duration_multiplier": 0.80,
  "effect_level_modifier": 1,
  "potency": 2
}
```

This catalyst adds +1 effect level and reduces duration by 20%, while increasing cooldown by 15%. It represents a trade-off: stronger effect but shorter and with a longer wait before you can drink again.

The complete list of JSON keys is identical to tinctures — see the Tincture Definitions section above for the full key reference.

---

#### Overriding and Disabling Defaults

**Disabling the Default Datapack**

When creating a new world, the "Alchemical Defaults" datapack appears in the Data Packs selection screen. It is enabled by default. To start with a completely blank slate (no ingredients defined), simply move it to the "Available" column before creating the world. You can then provide your own datapack with custom ingredient definitions.

**Overriding Individual Definitions**

To override a specific ingredient from the default datapack, create a new datapack that includes a file at the same path. For example, to change the Bastion Stone's properties, create a file at:

`data/alchemical/alchemical/essence_stone/bastion_stone.json`

Your datapack's file will take precedence over the built-in default. This lets you adjust individual ingredients without disabling the entire default set.

**Adding New Ingredients**

To add a completely new ingredient, create a JSON file with a unique name in the appropriate directory. For example, to create a new Essence Stone that grants the Haste effect:

```json
{
  "name": "Quarry Stone",
  "color": "#FFD700",
  "effect": "minecraft:haste",
  "base_duration": 9600,
  "base_level": 1,
  "potency": 2
}
```

Place this at `data/yourpack/alchemical/essence_stone/quarry_stone.json` and it will be loaded alongside the defaults. The same approach works for tinctures and catalysts — any Minecraft item (or modded item) can serve as an ingredient.

---

### Admin Commands

Alchemical includes a server command for managing player cooldowns:

**`/alchemical clearcooldown <player>`** — Immediately clears the specified player's elixir cooldown, allowing them to drink again right away. Requires permission level 2 (operator).

---

### FAQ

**Q: Will you make this for Fabric?**

A: Alchemical is built for NeoForge and there are no current plans for a Fabric port. Anyone is welcome to create one though!

**Q: Can I use this in my modpack or on my server?**

A: Absolutely! Alchemical is designed with modpack makers in mind. The entire ingredient system is datapack-configurable, and server settings let you tune the balance to fit your pack.

**Q: Is this compatible with other mods?**

A: Alchemical should be compatible with all other mods. Essence Stones can be configured to grant any registered mob effect, including effects added by other mods.

**Q: Can I add modded effects as Essence Stones?**

A: Yes! The `effect` field in Essence Stone definitions accepts any valid ResourceLocation. If another mod registers `mymod:flight` as a mob effect, you can create an Essence Stone that grants it by setting `"effect": "mymod:flight"`.

**Q: What happens if I die with an elixir cooldown active?**

A: The cooldown persists through death. You cannot bypass the cooldown by dying and respawning.

---

Please leave any comments, questions, or suggestions! If you encounter issues, please create an issue on the GitHub repository with as much detail as possible. [Alchemical Issues](https://github.com/Silvertide7/alchemical/issues)
