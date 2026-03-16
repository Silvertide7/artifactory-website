<h3 style="text-align:center">![](https://media.forgecdn.net/attachments/description/867520/description_b4b831f2-afcd-4e72-a8ee-60b43e2daf0b.png)</h3>

Artifactory introduces a highly configurable D&D-style attunement system where players can bond with weapons, armor, and gear. As your attunement level grows, so does the power of your gear—unlocking new bonuses and effects.

Modpack makers can also restrict powerful items until they're attuned, and with a limited number of attunement slots, players must make meaningful choices about which items to commit to. Fully configurable and built to fit seamlessly into any modpack, Artifactory adds depth, progression, and balance to your game.

---

Below are the default datapack attunement levels for the Diamond Sword.

**Level 1**: Adds <span style="color:#c2e0f4">Invulnerable</span> (won't despawn and can't be hurt by environmental effects) as well as the benefits of the attunement bond.

**Level 2**: Adds 25% attack speed and <span style="color:#b96ad9">Unbreakable</span>.

**Level 3**: Adds 40% more attack speed and makes it <span style="color:#f1c40f">Soulbound</span>, so if you die it will travel with you through death and respawn with you on your body.

                                                    Level 1                            Level 2                                Level 3

![](https://media.forgecdn.net/attachments/description/867520/description_5a47f402-1b97-475d-8e1e-4395249eab86.png)

 

---

<p style="text-align:left">A few of the features here are for 1.21.1 only and will not be backported in the near future. 1.20.1 is feature complete and fully functional though.</p><p style="text-align:center">![](https://media.forgecdn.net/attachments/description/867520/description_d4291c2d-f3fe-4d46-b273-409a13293e4a.png)</p>

---

### Overview

This mod extends the end game in minecraft of crafting the perfect weapon or armor. It costs a bit of experience, time, and some rarer materials, but the items you will create will be legendary.

This mod can be used as is but its true power comes from its customization. It's built for modpack makers to have tools to offer powerful upgrade paths and / or add restrictions to powerful items to create a balanced item economy.

- Entirely data-driven attunement system where almost everything possible is configurable. Make it fit your server or modpacks needs.
- Create and grow bonds with weapons, armor, and other items to gain unique benefits like <span style="color:#b96ad9">Unbreakable</span>, attribute increases, and <span style="color:#f1c40f">Soulbound</span> items that persist through death.
- Default vanilla datapack included (you must enable it when creating the world), you can install and play without any configurations.
- Protect your attuned items from despawning and being destroyed by the environment.
- Only the player who is bonded to the item can use it, it's allegiance is entirely to them. Holding an item that is bonded to another player causes bad things to happen.
- Impose restrictions like requiring an item be attuned to before it can be used in any way.
- Curios compatability.
- Should be compatible with all other mods.

---

### Getting Started

_Note: For information on configuring items to be attuneable see the datapack section below. All values in this guide uses the default vanilla datapack included._

Once an item is configured to be attuneable it will look like this:

![unattuned diamond sword](https://media.forgecdn.net/attachments/description/867520/description_1afa5f03-9678-4f36-b727-9dc913ea41e1.png)

This shows that this item is ready to be attuned and it will reserve 2 attunement slots when you do so. If an item has a chance of being attunable then it will say "Attunable (40%)" if it had a 40% chance to be successful. You can identify it by attempting to place it into the Attunement Nexus, which will then determine if it is attunable or not. This is a one time check and if it is determined not to be attunable then it will behave as a normal item.

If the item was configured for the attunement to be required before use then it would say "Attunable (Required)".This makes the item unusable in any way until it is attuned including breaking blocks, hitting enemies, or using the item like drawing a bow or casting a fishing rod.

To get started with the attunement process lets build the Attunement Nexus. The default recipe is:

![](https://media.forgecdn.net/attachments/description/867520/description_89b5014c-4768-4035-b61e-1b219c809fab.png)

Once you have an Attunement Nexus you can place an attunable item into the center slot. After doing so you will see some helpful information.

![](https://media.forgecdn.net/attachments/description/867520/description_a32b3b88-abc8-43ef-a58f-8ce28f23d112.png)

- <span style="color:#3598db">Attunement Level</span>: Current level of attunement or "Not yet attuned"
- <span style="color:#3598db">Slots Reserved</span>: Number of slots this item reserves when attuned.
- <span style="color:#3598db">Players Attunement Slot information</span>. Hover over it for more details.
- <span style="color:#f8cac6">Level Cost</span>: Number of levels consumed by the attunement process.
- <span style="color:#f8cac6">Level Threshold</span>: Number of levels required to start the attunement process. These are not consumed.
- <span style="color:#f8cac6">Items Required</span>: Items required to attune
- <span style="color:#f8cac6">Red Information Icon</span>: Hover over it for more details on why you can't start the attunement process.

If you meet the requirements then you can start the attunement process. After it completes it will consume any required levels and / or items and then bond the item to you. The first time you bond the item it will reserve the number of slots the item requires. If you don't have enough slots available you won't be able to bond the item. 

If you can't start the attunement process hover over the red information icon to the left side of the Attune button.

**Viewing / Managing Attunements**

You can view and manage your current attunements in the Manage Attunements screen. This can be opened from the Attunement Nexus by pressing the cog wheel in the top right, or from pressing the assigned hotkey (default 'o').

After attuning to the max level with the diamond sword above it will look like this:

![](https://media.forgecdn.net/attachments/description/867520/description_b190ec3e-29e1-4939-9bc3-205b23295f65.png)If you want details about what each level of the attunement added to the item then hover over the blue (i) icon to get more information:

![](https://media.forgecdn.net/attachments/description/867520/description_7e3c1486-f3ed-47d4-9385-e3cecb3f8759.png)

**Breaking Attunements**

To break an attunement with an item hover over the item card and there will be a red X on the right side. Press this and confirm the prompt to break the attunement.

This will remove all benefits from the item you gained while attuning it but will keep all other stats on the item like enchantments or modifications from other mods. The item can now be attuned to someone and you gain back the attunement slots the item reserved. This cannot be reversed.

---

### System Overviews

#### Attunement System

Artifactory adds a new attribute: **attunement slots**. When an item is configured to be attuneable you can specify how many attunement slots that item reserves once it is attuned. This can include reserving no slots so it can be freely attuned without affecting your slot limit. If you do not have the necessary number of open slots to attune an item then the item cannot be attuned until some spots are cleared up, which can be done by breaking attunements to other items or finding a way to increase that attribute. The attunement process can also require items or experience levels to attune which will be consumed when the attunement completes.

---

#### Enhancement System

Attuning an item offers fun and powerful benefits. As you grow your bond these benefits will grow as well. 

When you attune an item for the first time you the item will reserve the number of attunement slots it was configured to and you will gain any of the benefits for a level one attunement with that item. If more levels are configured then you can ascend that bond to gain whatever benefits are configured for those levels. Currently those benefits can be:

#### **Artifactory Modifications:**

- <span style="color:#c2e0f4"><strong>Invulnerable</strong></span>: The item can no longer be destroyed by environmental effects, like lava or a cactus. It will also never despawn when dropped onto the ground.
- <span style="color:#b96ad9"><strong>Unbreakable</strong></span>: If the item has a durability it will become unbreakable.
- <span style="color:#f1c40f"><strong>Soulbound</strong></span>: When you die the item will travel with you through death.

#### **Attribute Modifications:**

You can specify any attribute (including other mod attributes) to be added to the item when reaching an attunement level. These, combined with the basic modifications above, will allow you to create truly powerful items as you level them up.

---

#### Restriction System

An attuneable item can be configured such that it MUST be attuned before it can be used in any way, or it can be usable as normal and attuning it just offer further benefits. If it must be attuned before it can be used then that item cannot do damage, break blocks, or be used in any way like trying to draw a bow, until it is attuned to you.

Items that are attuned cannot be used by other players in any capacity, it only shows allegiance to its owner. Further you may add effects that are applied to players when they are holding an attuned item that does not belong to them. Say slowness 3, poison 1, and / or wither 100, it's up to you. 

---

### Datapack Configuration

Let's change the default datapack's Diamond Sword attunement configuration. First create a new datapack and create a new file **data/minecraft/artifactory/diamond_sword.json** and add these contents: 

For 1.20.1

```
{
  "slots_used": 4,
  "attunement_levels": [
    {
      "modifications": [
        "invulnerable",
        "unbreakable",
        "attribute/minecraft:generic.attack_damage/addition/5/mainhand"
      ],
      "requirements": {
        "items": ["minecraft:diamond_sword", "minecraft:diamond#10", "minecraft:nether_star"]
      }
    },
    {
      "modifications": [
        "soulbound",
        "attribute/minecraft:generic.attack_speed/multiply_base/.5/mainhand",
        "attribute/minecraft:generic.attack_damage/addition/7/mainhand"
      ],
      "requirements": {
        "xpLevelsConsumed": 45,
        "xpLevelThreshold": 55,
        "items": ["minecraft:dragon_egg"]
      }
    }
  ],
  "use_without_attunement": false,  "chance": 0.4,
  "replace": true
}
```

<div><div>For 1.21.1</div><div><pre><code>{
  "slots_used": 4,
  "attunement_levels": [
    {
      "modifications": [
        "invulnerable",
        "unbreakable",
        "attribute/minecraft:generic.attack_damage/add_value/5/mainhand"
      ],
      "requirements": {
        "items": ["minecraft:diamond_sword", "minecraft:diamond#10", "minecraft:nether_star"]
      }
    },
    {
      "modifications": [
        "soulbound",
        "attribute/minecraft:generic.attack_speed/add_multiplied_base/.5/mainhand",
        "attribute/minecraft:generic.attack_damage/add_value/7/mainhand"
      ],
      "requirements": {
        "xpLevelsConsumed": 45,
        "xpLevelThreshold": 55,
        "items": ["minecraft:dragon_egg"]
      }
    }
  ],
  "use_without_attunement": false,
  "chance": 0.4,
  "replace": true
}</code></pre></div><div>This file describes the attunement configuration for the diamond sword. Lets go through each key.</div></div>

**"slots_used"**

_Semi-Optional - defaults to -1_

How many attunement slots it takes up when attuning the item. In this example a diamond sword will take 4 of your attunement slots to attune to. If you leave this off then it will void the attunement configuration for this item and the item will no longer be attuneable. This is how you can overwrite and remove attunement information from another datapack.

**"use_without_attunement"**

_Optional - defaults to true_

If the item is usable without attuning to it first. _false_ means the item will do no damage, break blocks, and cannot be used like when trying to draw a bow and fire it, until it is attuned. _true_ means that the item is still usable as normal even when it isn't attuned. Attuning to it will just offer further benefits.

**"chance"**

_Optional - defaults to 1.0_

Attunements that are not set to 1.0 (the default) now have a chance of being attunable, which will be determined the first time you put the item into the Attunement Nexus. If you set \`"chance": 0.4\` then the item only has a 40% chance of being attunable. When you try to place the item into the Attunement Nexus for the first time it will be determined if it is attunable or not. This is a one time check and if it fails that item will never be attunable.

**"apply_to_items"**

_Optional - defaults to an empty list_

This is a list of strings of items to apply the attunement configuration to. If this list exists and has items in it then it will apply the attunement configuration to all of the items. This is a faster way to add configurations to multiple items. If this list has items in it then the name of the json is ignored, and can be named anything. To use this you can add it to any valid configuration json. Lets say we had a configuration setup for iron armors called iron_armors.json. At the end of the configuration you would add this:

<div><pre>"apply_to_items": [<br>  "minecraft:iron_boots",<br>  "minecraft:iron_chestplate",<br>  "minecraft:iron_leggings",<br>  "minecraft:iron_helmet"<br>]</pre></div>

All of the items in this list (if they are valid) would have the configuration added to them. Make sure to set any attributes to <span style="color:#c2e0f4">armor</span>, <span style="color:#c2e0f4">hand</span>, <span style="color:#c2e0f4">body</span>, or less ideally <span style="color:#c2e0f4">any</span> undefinedif there are items in different slots or the attributes wont be applied correctly when they are equipped if you have multiple armor types. These generic types are only available in 1.21 and higher though, that is when Minecraft added them. This will limit the functionality of this feature in 1.20.1, you will generally only be able to group like items, like helmets. At this time it also does not support tags. Again, if you add this it will ignore the name of the json file and instead only add the configurations to the items from this list.

**"replace"**

_Optional - defaults to false_

If the current configuration should replace any existing configurations. If you try to create a new json file for a trident it will conflict with the one I already created in my mod. In order to tell it which one to use you will want to set "replace" to "true" so it knows to use this one. As a modpack maker you may as well add this to all of your configs to make sure they are the ones used. If for some reason you are using a mod that already has configs that include "replace": "true" in them you will then need to make sure your datapack loads AFTER theirs, it will take the most recently looked at config with "replace".

**"attunement_levels"**

_Optional_ - defaults to a single level of attunement. That attunement level's experience level cost and threshold use the server configs values and when attuned it grants the 3 basic modifications: invulnerable, unbreakable, and soulbound. No attributes are included by default. 

This is where you define what each level of attunement looks like. This is done in order, so the first object will be what applies for attunement level 1, the second for attunement level 2, and so on. For now it just consists of 2 keys, "**modifications**" and "**requirements**". "**requirements**" allows you to overwrite the server config requirements so you can customize each attunement level individually, as well as add item requirements. "**modifications**" is where you put all of the modifications to the item that happen when it is attuned.

**_\-"modifications"_**

_Optional_ - Defaults to applying invulnerable, unbreakable, and soulbound.

There are 3 basic modifications: <span style="color:#843fa1"><strong>invulnerable</strong></span>, <span style="color:#843fa1"><strong>unbreakable</strong></span>, and <span style="color:#843fa1"><strong>soulbound</strong></span>.

There are also attribute modifications which grant the item the attributes when they achieve the specified level of attunement. They are of the format

"<span style="color:#bfedd2">attribute</span>/<span style="color:#fbeeb8">modid:attributename</span>/<span style="color:#f8cac6">operation</span>/<span style="color:#eccafa">value</span>/<span style="color:#c2e0f4">equipmentslot</span>".

_operation_ can be 3 values:

**For 1.20.1:** <span style="color:#f8cac6"><strong> addition</strong></span>, <span style="color:#f8cac6"><strong>multiply_base</strong></span>, <span style="color:#f8cac6"><strong>multiply_total</strong></span>

**For 1.21.1:** <span style="color:#f8cac6"><strong>add_value</strong></span>**,** <span style="color:#f8cac6"><strong> add_multiplied_base</strong></span>**,** <span style="color:#f8cac6"><strong> and add_multiplied_total</strong></span>

_equipmentslot_ can be one of 9 values: <span style="color:#c2e0f4"><strong>mainhand</strong></span>, <span style="color:#c2e0f4"><strong>offhand</strong></span>, **<span style="color:#c2e0f4">hand</span>**, <span style="color:#c2e0f4"><strong>feet</strong></span>, <span style="color:#c2e0f4"><strong>legs</strong>,</span> <span style="color:#c2e0f4"><strong>chest</strong></span>, <span style="color:#c2e0f4"><strong>head, body</strong></span>**,** <span style="color:#c2e0f4"><strong> armor, any</strong></span>.

NOTE: 1.20.1 does not contain the types hand, body, armor, any. These were added in minecraft 1.21.1

The operation and equipment slot values are vanilla minecraft constructs, so I would research those further there if you have questions. This is how the attribute is applied to the existing attribute and which slot the item must be worn in order for the attribute to take effect. Make sure you match up the equipment slot with the type of item you are dealing with. If you are configuring a helmet make sure to use _head_ or the attributes will not apply when you put it on.

It should be noted that anytime you put an attuned item into the attunement nexus it syncs the modifications to the item, so if changes have been made to the datapack then all you need to do is put your item into the attunement nexus and it will update it with the changes.

In the example JSON above for attunement level one we have "<span style="color:#bfedd2">attribute</span>/<span style="color:#fbeeb8">minecraft:generic.attack_damage</span>/<span style="color:#f8cac6">addition</span>/<span style="color:#eccafa">5</span>/<span style="color:#c2e0f4">mainhand</span>". We are specifying an <span style="color:#bfedd2">attribute</span> modification, a minecraft attribute increase to <span style="color:#fbeeb8">attack damage </span> of <span style="color:#eccafa">5</span>, and telling it to apply only when item is in the <span style="color:#c2e0f4">mainhand</span>. Since we are configuring a Diamond Sword this will add 5 damage once you have reached level 1 attunement with it and you're using it in your mainhand. You can also see in the level 2 attunement block it specifies the same attribute again but with a value of 7. When you reach level 2 attunement you will have a total of 12 additional attack damage, 5 from the level 1 attunement and 7 from the level 2 attunement. It also gives a 50% attack speed boost to the base attack speed at level 2.

**\-"requirements"**

_Optional - If left blank it will use the server config values_

**This allows you to overwrite the config values for a specific level of how many levels are required to start the attunement process and how many are consumed upon the attunement.** 

\--**"xpLevelsConsumed"**: How many levels are consumed to complete the attunement process

\--**"xpLevelThreshold"**: How many levels are required before the process can be started.

\--"**items**": What items, if any, are required to attune. It will only take the first 3 items in the array. These take the form "modid:item_name#numberOfItems". The number of items is optional and defaults to 1 if left off. So if you wanted an attunement level to require a nether star and 64 diamonds you would put **"items": \["minecraft:nether_star", "minecraft:diamond#64"\]**.

We see both attunement levels require items and the level 2 attunement overwrites the xp server config values with new values that only apply when trying to attune to that level. This lets you specify requirements on a more granular level.

All said and done after you reach level 2 attunement the item will be unbreakable, invulnerable, soulbound, and grant 6 additional attack damage, as well as only being usable by you and no one else. Here is what that would look like at attunement level 2:

![](https://media.forgecdn.net/attachments/description/867520/description_eb59f352-a0f8-4f33-89ab-af7b04737b84.png)

Now lets look at the simplest config possibly an attuneable item can have and what it means.

{ "slots_used": "1", "replace": true }

If we used this for our diamond sword instead by default it would create a single attunement level that requires the server configs xp levels and xp threshold to attune to. It would take up 1 attunement slot and is usable as a normal diamond sword even if you haven't attuned to it, so attuning is optional. When you attune to it you don't gain any stats, but you do gain the benefits that come along with an attuned item, like protection from other players from using it. That is as far as that item can be attuned however, and no attributes are added by default. This could be combined with use_without_attunement:false to make it so an item has to be attuned to in order to use it, but offers no other enhancements aside from the base protections.

In the final example we will remove an attunement configuration from an item from another datapack. The default datapack provided by this mod makes about 30 items attuneable, like the diamond sword. If you want to make it so these items aren't attuneable you need to overwrite them in your own datapack (or don't include the datapack at all when the world is created, which is the default, you have to add it). To remove the ability for tridents to be attuned place this json file in your datapack at **data/minecraft/artifactory/trident.json**:

{ "replace": "true }

The replace tells it to use this configuration instead of the base one, and including no other information tells it to turn off this attunement. You should always use replace if you want this datapack configuration used instead of the other one. If while loading the datapack data there are more than one JSON files with "replace": true then it will use the last one loaded.

You can create attuned armor or weapons very easily and apply relevant attributes to those items, like extra armor for armor pieces or attack damage for swords, or vice versa, it's up to you. If you use a library like [apothic attributes](https://www.curseforge.com/minecraft/mc-mods/apothic-attributes), which I highly recommend, it will give you a bunch of fun new attributes to apply to items as well.

---

### Attunement Overrides

As of 1.21.1-2.0.0 (it will not be backported for the foreseeable future) you can now define an attunement on an itemstack by itemstack basis. This allows you to make a single itemstack attunable with its own levels and enhancements that is unique only to that stack. This will override any datapack configurations for that item type as well.

This can be done by defining a datacomponent when you create the item, either with /give, advancements, recipes, loot tables, or other mods like kubejs. There are many ways to add Data Components to items. The default datapack does not include any attunement configurations for the new mace item, so lets create a mace itemstack that is attunable. Run this command in game

```
/give @p minecraft:mace[artifactory:attunement_override={use_without_attunement:false,chance:0.5, slots_used:5, attunement_levels:[{requirements: {items:["minecraft:diamond#64"]},modifications:[invulnerable, unbreakable, soulbound]}]}]
```

This command spawns in a mace with a data component implemented, the attunement_override. After running the command you now have a mace that has a 50% chance of being attunable, takes up 5 slots if you attune it, requires 64 diamonds, and gives it invulnerable, unbreakable, and soulbound once attuned. This itemstack is unique and is the only one to contain this attunement configuration. If the minecraft mace already had attunement configurations configured via the datapack, this would override that as well and this would follow the configuration specified in the command. This will allow you to create one off items that behave differently from other items.

---

### Curios

If you have Curios installed then a new slot will be added, the Attuned Item slot. Only items you are attuned to can be placed here and no attributes will be awarded from placing in the slot. It can be used to store attuned items you are not using so you can quickly swap them. If the item is <span style="color:#f1c40f">Soulbound</span> it will also stay in this slot on death.

If you want to configure the default settings then you need to overwrite them using a datapack. If you want to change the number of slots available (default is 1) then you would overwrite the file **data/artifactory/curios/slots/attuned_item.json:**

```
{
  "replace": true,
  "order": 1999,
  "size": 1,
  "render_toggle": false,
  "icon": "artifactory:slot/artifactory_slot"
}
```

Change any of these that you'd like but size is the one you want to change to add more slots.

<div><hr></div>

### Uses

Here are some examples of use cases that I will be using this for in my modpack.

- Create a fun system of bonding to a weapon and growing that bond while gaining cool, entirely customizable, benefits!
- Limit items that are too powerful. Many mods add items that are very fun but too powerful. This becomes especially noticeable when a player amasses too many of these items and the combat, exploration, or travel of minecraft becomes trivial from having multiple mod's end game items. You might as well play creative at that point. I wanted a system to allow these endgame/chase items to exist but make them harder to obtain and so players would have to make a choice on which of these items they could use at any given time. The more powerful the item the more attunement slots it may take in order to attune, making you choose between having more individual but lower power items, are a few more powerful ones. This pairs great with the mythic weapons from Simply Swords.
- Make older tier / less powerful items more desirable. Now instead of getting rid of your iron sword in favor of a diamond one you could attune the iron sword and gain special benefits as you bond with it. As you increase the attunement levels with it it could gain more damage and attack speed, along with it becoming unbreakable and soulbound. Throw on some enchantments and you could create a very powerful item! Diamond swords may also be attuneable but gain different benefits at different levels, or may not be attuneable at all. This creates an interesting item economy, gives value to different tiers of items, and gives more balancing options to modpack makers.

#### Possible Future Expansions

---

- More Unique modifications alongside Soulbound / Invulnerable / Unbreakable.
- Effect modifications - When wearing or holding the item the specified effects will be applied to the player.
- Add more unique requirements to attune and strengthen the attunement on an item. Things like number of kills while wearing / using the item, killing certain bosses, performing certain feats, having it on you for a length of time, etc.

Please leave any comments, questions, suggestions if you'd like! If you have issues I would prefer creating an issue on the github repo with as much information as possible, but a question on here is fine too. [Artifactory Issues](https://github.com/Silvertide7/artifactory/issues)

---

### FAQ

**Q: Will you make this for Fabric?**

A: I will not be porting to Fabric, but anyone is welcome to do so! For Forge I will only be supporting 1.20.1 for now, and I will be porting this to NeoForge going forward on 1.21. From there I will stay on NeoForge, I don't have the time to manage too many different versions of this.

**Q: Will you backport this to older Minecraft version?**

A: Unless it sees a lot of interest I will only be developing on 1.20.1 and forward.

**Q: Can I use this on my server or modpack?**

A: Of course!

---

### Deprecated Features

<div class="spoiler"><p>On 1.21.1 as of version 2.0.0 unique items were removed.</p><p>Unique items are another way to restrict items, but much more severely. A player can only attune a certain amount of unique items total (configured in server settings) regardless of any open attunement slots. Further, in a multiplayer setting, a unique item can only be attuned by ONE player, and NO others. If a player attunes to Sword of 1000 Truths and that item is configured to be unique, they are the only player who can attune to that item type in that world, even if another player finds another Sword of 1000 Truths. While they have that attunement in place no other player will be allowed to attune it until they break the attunement. On a single player server this allows you to further limit end game items, and on a multiplayer server it will create an interesting item economy as well as players who are known for being the weilder of a specific item. (I strongly suggest Simply Swords for this as their mythic weapons, of which there are plenty and they're pretty broken / awesome, would be a good target.)</p></div>
