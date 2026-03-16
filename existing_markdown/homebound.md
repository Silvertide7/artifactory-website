 

### ![](https://media.forgecdn.net/attachments/description/911135/description_40385b95-a4b6-4aa2-91d6-fe7f1b4099ba.png)

### Homebound adds items that allow you to set a home and teleport there without completely trivializing transportation and danger in Minecraft.

### About

---

I've found that most home mods make the game too easy. Having access to instant teleportation or teleportation to too many places stops you from ever needing to solve many fun creative problems in the game. It also makes it too easy to escape death with a quick \`/home\`. This mod solved that issue for me, hopefully you enjoy it as well!

Almost everything about the mod and the items it adds are configurable. Make it exactly what you want.

Homebound was designed to have minimal impact on performance and should be compatible with all other mods. If you have any issues please let me know in the comments or add an issue to the issue tracker.

 

### Instructions

---

**Setting a home**: When you have a Homebound item in your hand you can set your home by crouching and using the item.

**Teleporting Home**: Using a homebound item, or pressing 'h' (by default) with a homebound stone in your inventory or curios slot, will begin the teleport process. Most items take around 10 seconds to use by default, this can be changed in the configs or modified with enchantments.

Hovering over the item and pressing \`Shift\` will give you more information about it, like any restrictions, use time, and cooldown. 

If you are mounted on a pet that you own then it will teleport with you.

When you teleport you trigger a global cooldown based on the item you used. Some items have longer cooldowns than others. This cooldown is shared across all homebound items. You can't just build multiple stones and use them in turn.

Note: If you take damage while channeling the warp it cancels it and adds a 5 second cooldown (this is configurable) so you can no longer cheat death so easily like the old days.

 ![homebound_creative_tab](https://live.staticflickr.com/65535/53183374697_166c2781ea_z.jpg)

 

### Items

---

Each homebound item has a combination of cooldown, warp distance restrictions, dimensional travel restrictions, and/or use times. Upgraded items will remove these restrictions or reduce cooldowns and use times.

Here's a few of the items you can create:

**Homeward Stone** | The basic home warping item. It will take some exploration to find the materials to make but it will be worth it. It has a 1 hour cooldown.

**Haven Stone** | An upgrade to the homeward stone that removes the dimensional teleport restriction. It requires 2 netherite ingots and 6 nether brick though, requiring you to adventure through the nether a bit before you can make it.

**Homeward Bone** | Teleports you home from anywhere but it is consumed on use and has a hefty 2 hour cooldown. It is fairly easy to make on the fly from killing mobs, so if you're out adventuring and don't have your homeward stone handy you can craft this to get out of a bad situation.

**Hearthwood** | Can only be used within 160 blocks (10 chunks) of your home and is not enchantable, but only has a 10 minute cooldown and a 2 second use time. It's meant to make moving around your base a little easier.

**Dusk Stone** | This is one of 2 upgrade paths from the Haven Stone. The cooldown of the item is scaled based on the distance away from home you are, with a minimum cooldown of 15 minutes no matter what. For every 50 blocks away from home it increases the cooldown by 1 minute, up to 1 hour max. It's direct upgrade, the **Twilight Stone**, is only very slightly better stat wise, but also doesn't drop on death.

There are a few more items to discover and a few more planned, detailed below in planned features. I recommend using JEI/REI to make crafting easier! 

undefined

### Enchantments

---

- **Haste** - Decreases the use time of the item by 10% per level. 3 Levels.
- **Cooldown** - Decreases the warp cooldown of the item by 5% per level. 4 Levels.

 

### Commands

---

As an admin you can clear a players cooldown or home by using:

/homebound admin <target> clear cooldown

/homebound admin <target> clear home

As a normal player you can view your home information, like dimension and x, y, and z coordinates, as well as cooldown remaining if there is one with:

/homebound info

undefined

### Planned Features

---

- ```Make it so owners that are riding pets they own teleport with them~~~~ - Done

  ```
- ~~Add Configs~~ - Done
- ~~Add Curios integration~~ - Done
- ~~Add a keybind that uses first homebound item found in inventory / curios slot~~ - Done
- Add player attributes that also reduce cooldown and cast time.
- Possibly add new upgraded stones.

### FAQ

---

**Q: Will you make this for Fabric?**

A: This is a Forge only mod for now. I don't have the time to learn Fabric at the moment with a newborn in the house and a full time job. If things (ever) calm down I will revisit it. I will probably jump ship to NeoForged when it is more mature, as will most developers probably.

**Q: Will you backport this to older minecraft version?**

A: Same answer as porting this to Fabric. It would probably be rather easy to backport to 1.19 and maybe even 1.18 but I don't have the time as I'm working on other mods and a custom modpack. The more traction this gets the more likely I will add some back ports though. I would not go further back than 1.18 however.

**Q: Can I use this on my server or madpack?**

A: Of course, that's why I made it! Just please give credit if possible. You may not use this to make money off of in any way.

Huge shout out to Kaupenjoe for the great tutorials, the NeoForged discord for answering a ton of questions, and to all the mod makers who share their source code. I learned a ton digging around in there!

This is my first released mod and I am continuing to play-test and balance it, as well as add new features. It is fairly feature complete at this point as far as baseline functionality goes. If you have suggestions feel free to leave them in the comments.
