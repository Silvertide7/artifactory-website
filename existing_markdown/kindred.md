<p style="text-align:center">![](https://media.forgecdn.net/attachments/description/1526429/description_5ae95372-cc75-4b49-b87b-6ecb6eb610b8.png)</p>

<div><h3>Kindred turns your tamed mobs into a true companion roster. Bond a pet once, then call it to your side anywhere in the world — across dimensions, across deaths, across sessions. No more leaving your wolf at home, losing your horse in a cave, or starting over every time something dies.</h3><hr></div>

## Features

### Bond with any tamed pet

Look at one of your tamed mobs, open the **Pet Roster**, and bond.

![](https://media.forgecdn.net/attachments/description/1526429/description_fa71df6f-a5a2-42c4-bbba-26468571a1d8.png)

Bonded pets are stored on you — not in the world. They survive logouts, chunk unloads, and dimension changes.

*   Works with any ownable, tameable mob out of the box (wolves, cats, parrots, horses, donkeys, mules, llamas, camels, foxes, axolotls — anything that implements vanilla ownership).
*   Optional **mount-only mode** restricts bonding to saddleable mounts.
*   Optional **XP level cost** per bond — makes bonding feel earned, with the cost previewed before you confirm.
*   Optional **datapack blocklist** for species that shouldn't be bondable on your server.

### ![](https://media.forgecdn.net/attachments/description/1526429/description_25b1cf67-e80a-49a4-829b-413a61285a12.png)

### Summon & Dismiss with a keybind

![](https://media.forgecdn.net/attachments/description/1526429/description_7c5d5e18-78a9-4ea5-b34e-56a3f8478509.png)

One key summons your active pet. Hold it again to dismiss. Open the roster with another key to switch active pet, rename, reorder, or break bonds.

*   **Hold-to-confirm** prevents misclicks — configurable hold duration for both summon and dismiss.
*   Smart placement: pets within range walk to you naturally; farther pets teleport to a safe spot beside you.
*   Refuses to summon when the space around you is obstructed (configurable).
*   Cancels the hold if you take damage (configurable) — mirrors vanilla bow-draw / eating behavior.
*   Optional **cross-dimensional summons** so your pet follows you to the Nether and back.

<h3 style="text-align:center">![](https://media.forgecdn.net/attachments/description/1526429/description_1f1d3c93-681b-4d36-b6e1-821c41437d00.png)</h3>

### Bring them back from the grave

By default, when a bonded pet dies, the bond doesn't break — it just goes dormant. Summon them again and they respawn at your side, gear and all.

*   **Soft death (default):** pet returns on next summon. Optional revival cooldown adds weight without going full permadeath.
*   **Permadeath mode:** flip a config switch and death breaks the bond for keeps.
*   **Loot drops** are off by default in soft-death mode (you'd just be picking your own saddle back up). Re-enable for vanilla behavior.

### Pet Roster GUI

A clean inventory-style screen for managing your bonds.

*   Live 3D preview of the selected pet.
*   Set active, rename, reorder (▲ / ▼), and break bonds with a hold-to-confirm.
*   Per-pet summon cooldown indicator.
*   Respawn timer for pets in revival cooldown.
*   "Limbo" / "Resting" state hints so you always know where each pet is.

### Extremely customizable

Every behavior is exposed in `kindred-server.toml`:

| Category    |Knobs                                                                                |
| ----------- |------------------------------------------------------------------------------------ |
| <strong>Bonding</strong> |max bonds per player, mount-only mode, XP level cost per bond                        |
| <strong>Summoning</strong> |walk vs. teleport range, walk speed, cross-dimensional toggle, space-required toggle |
| <strong>Cooldowns</strong> |per-bond summon cooldown, global per-player summon cooldown                          |
| <strong>Death</strong> |permadeath toggle, loot drop toggle, revival cooldown                                |
| <strong>Input</strong> |hold-to-summon seconds, hold-to-dismiss seconds, cancel-on-damage                    |
| <strong>PMMO compat</strong> |skill gating, start level, linear or all-or-nothing unlock progression               |

### Datapack control

Four tags let server owners and modpack authors tune the experience without code:

*   `kindred:bond_allowlist` (entity types) — when non-empty, **only** species in this tag can be bonded and `bond_denylist` is ignored. Leave empty to fall back to denylist behavior.
*   `kindred:bond_denylist` (entity types) — species that can never be bonded. Only consulted when `bond_allowlist` is empty.
*   `kindred:no_summon_dimensions` (dimension types) — dimensions where summoning is blocked.
*   `kindred:no_summon_biomes` (biomes) — biomes where summoning is blocked (great for boss arenas, dungeon biomes, PvP zones).

### Project MMO integration

Optional gating via [Project MMO](https://www.curseforge.com/minecraft/mc-mods/project-mmo).

*   Choose any PMMO skill (default: `charisma`) to gate bond claims.
*   **All-or-nothing mode:** hit the start level and unlock all bond slots at once.
*   **Linear mode:** one slot at the start level, +1 every N levels, capped at your max.
*   The roster screen shows the next unlock requirement so players know what to grind.

### Commands

For server admins and debugging:

```
/kindred claim                — claim the entity at your crosshair
/kindred list                 — list your bonds with indices
/kindred summon <index>       — summon a bond
/kindred dismiss <index>      — recall the active pet
/kindred break <index>        — break a bond
/kindred active <index|none>  — set or clear the active pet
```

***

## Why Kindred?

Vanilla pets are fragile, stationary, and easy to lose. Existing pet mods either turn them into items (which feels weird) or add a stable system (which feels like extra inventory management). Kindred takes a different angle: your pets live on **you**, not in the world. They're always one keypress away, they survive deaths, and the whole thing tunes from a config file so it fits any modpack — hardcore, casual, mount-focused, or RPG-progression.

## Keybinds

| Default |Action            |
| ------- |----------------- |
| v       |Summon active pet |
| g       |Open pet roster   |

Set them in **Options → Controls → Kindred**.

This mod was inspired by Callable Horses, which seems to not be moving past 1.20.1. I wanted to expand on it a little bit and include some new features and upgrades.