import { Link } from 'react-router-dom'

const IMG = {
  banner:
    'https://media.forgecdn.net/attachments/description/867520/description_b4b831f2-afcd-4e72-a8ee-60b43e2daf0b.png',
  levelComparison:
    'https://media.forgecdn.net/attachments/description/867520/description_5a47f402-1b97-475d-8e1e-4395249eab86.png',
  featuresBanner:
    'https://media.forgecdn.net/attachments/description/867520/description_d4291c2d-f3fe-4d46-b273-409a13293e4a.png',
  unattunedSword:
    'https://media.forgecdn.net/attachments/description/867520/description_1afa5f03-9678-4f36-b727-9dc913ea41e1.png',
  nexusRecipe:
    'https://media.forgecdn.net/attachments/description/867520/description_89b5014c-4768-4035-b61e-1b219c809fab.png',
  nexusUI:
    'https://media.forgecdn.net/attachments/description/867520/description_a32b3b88-abc8-43ef-a58f-8ce28f23d112.png',
  maxLevelCard:
    'https://media.forgecdn.net/attachments/description/867520/description_b190ec3e-29e1-4939-9bc3-205b23295f65.png',
  levelDetails:
    'https://media.forgecdn.net/attachments/description/867520/description_7e3c1486-f3ed-47d4-9385-e3cecb3f8759.png',
  level2Tooltip:
    'https://media.forgecdn.net/attachments/description/867520/description_eb59f352-a0f8-4f33-89ab-af7b04737b84.png',
}

const tools = [
  {
    path: '/artifactory/json-builder',
    label: 'JSON Builder',
    description:
      'Generate attunement data source config files with a guided form. Fill in fields, validate, then copy or download the JSON directly into your datapack.',
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M6 4H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-2" />
        <path d="M8 4a2 2 0 0 1 4 0v1H8V4Z" />
        <path d="M7 10h6M7 13h4" />
      </svg>
    ),
  },
]

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
    {children}
  </h2>
)

const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <section
    className={`overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-600 dark:bg-zinc-700 ${className}`}
  >
    {children}
  </section>
)

const CardHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="border-b border-zinc-100 px-6 py-4 dark:border-zinc-600">{children}</div>
)

const Mod = ({ name, color }: { name: string; color: 'sky' | 'violet' | 'amber' }) => {
  const cls = {
    sky: 'text-sky-500 dark:text-sky-400',
    violet: 'text-violet-500 dark:text-violet-400',
    amber: 'text-amber-500 dark:text-amber-400',
  }[color]
  return <span className={`font-semibold ${cls}`}>{name}</span>
}

const Divider = () => <hr className="border-zinc-100 dark:border-zinc-600" />

export const Artifactory = () => (
  <div className="space-y-6">

    {/* ── Hero ── */}
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-5">
        <div className="flex items-center gap-5">
          <img
            src="/artifactory-logo.png"
            alt="Artifactory Nexus"
            className="h-10 w-10 shrink-0 object-contain drop-shadow-md"
          />
          <div>
            <img
              src="/artifactory-title.png"
              alt="Artifactory"
              className="h-3 object-contain object-left"
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {['Forge', 'NeoForge', 'Data-Driven'].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-[11px] font-medium text-zinc-500 dark:bg-zinc-600 dark:text-zinc-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {tools.map((tool) => (
          <Link
            key={tool.path}
            to={tool.path}
            className="group flex shrink-0 items-center gap-2.5 rounded-xl border border-zinc-200 bg-white px-4 py-3 shadow-sm transition hover:border-zinc-300 hover:shadow-md dark:border-zinc-600 dark:bg-zinc-700 dark:hover:border-zinc-500"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600 transition group-hover:bg-zinc-900 group-hover:text-white dark:bg-zinc-600 dark:text-zinc-300 dark:group-hover:bg-zinc-100 dark:group-hover:text-zinc-900">
              {tool.icon}
            </span>
            <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
              {tool.label}
            </span>
            <svg
              className="h-3.5 w-3.5 text-zinc-400 transition-transform group-hover:translate-x-0.5 group-hover:text-zinc-700 dark:group-hover:text-zinc-200"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
        ))}
      </div>

      <div className="flex justify-center">
        <img
          src={IMG.banner}
          alt="Artifactory"
          className="max-w-sm rounded-xl object-contain shadow-sm"
        />
      </div>
    </div>

    {/* ── Overview ── */}
    <Card>
      <CardHeader>
        <SectionTitle>Overview</SectionTitle>
      </CardHeader>
      <div className="space-y-5 p-6">
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          Artifactory introduces a highly configurable D&D-style attunement system where players
          can bond with weapons, armor, and gear. As your attunement level grows, so does the power
          of your gear — unlocking new bonuses and effects.
        </p>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          Modpack makers can restrict powerful items until they're attuned, and with a limited
          number of attunement slots, players must make meaningful choices about which items to
          commit to. Fully configurable and built to fit seamlessly into any modpack, Artifactory
          adds depth, progression, and balance to your game.
        </p>
        <img
          src={IMG.featuresBanner}
          alt="Artifactory features"
          className="w-full rounded-lg object-cover"
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            'Entirely data-driven — almost everything is configurable',
            'Grow bonds with weapons, armor, and any item in the game',
            `Unlock powerful modifications like Invulnerable, Unbreakable, and Soulbound`,
            'Default vanilla datapack included — enable it when creating a world',
            'Protect attuned items from despawning and environmental damage',
            'Only the bonded player can use their attuned items',
            'Lock powerful items behind attunement requirements',
            'Curios compatibility — works with all other mods',
          ].map((feature) => (
            <div key={feature} className="flex gap-2.5 text-sm text-zinc-600 dark:text-zinc-300">
              <span className="mt-0.5 shrink-0 text-zinc-300 dark:text-zinc-500">✦</span>
              {feature}
            </div>
          ))}
        </div>
      </div>
    </Card>

    {/* ── Attunement Level Progression ── */}
    <Card>
      <CardHeader>
        <SectionTitle>Attunement Level Progression</SectionTitle>
      </CardHeader>
      <div className="space-y-5 p-6">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Below are the default datapack attunement levels for the Diamond Sword, included as an
          example of what the system is capable of.
        </p>

        <div className="space-y-2.5">
          {[
            {
              level: 1,
              color: 'sky' as const,
              content: (
                <>
                  Adds <Mod name="Invulnerable" color="sky" /> (won't despawn and can't be hurt by
                  environmental effects) along with the base benefits of the attunement bond.
                </>
              ),
            },
            {
              level: 2,
              color: 'violet' as const,
              content: (
                <>
                  Adds 25% attack speed and <Mod name="Unbreakable" color="violet" />.
                </>
              ),
            },
            {
              level: 3,
              color: 'amber' as const,
              content: (
                <>
                  Adds 40% more attack speed and makes the item{' '}
                  <Mod name="Soulbound" color="amber" /> — it travels with you through death and
                  respawns on your body.
                </>
              ),
            },
          ].map(({ level, color, content }) => {
            const borderBg = {
              sky: 'border-sky-200 bg-sky-50 dark:border-sky-900/60 dark:bg-sky-950/20',
              violet:
                'border-violet-200 bg-violet-50 dark:border-violet-900/60 dark:bg-violet-950/20',
              amber:
                'border-amber-200 bg-amber-50 dark:border-amber-900/60 dark:bg-amber-950/20',
            }[color]
            const labelColor = {
              sky: 'text-sky-500 dark:text-sky-400',
              violet: 'text-violet-500 dark:text-violet-400',
              amber: 'text-amber-500 dark:text-amber-400',
            }[color]
            return (
              <div key={level} className={`flex gap-4 rounded-lg border px-4 py-3 ${borderBg}`}>
                <span className={`shrink-0 text-xs font-bold mt-0.5 ${labelColor}`}>
                  LVL {level}
                </span>
                <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                  {content}
                </p>
              </div>
            )
          })}
        </div>

        <img
          src={IMG.levelComparison}
          alt="Diamond sword at attunement levels 1, 2, and 3 side by side"
          className="w-full rounded-lg border border-zinc-200 object-contain dark:border-zinc-600"
        />
      </div>
    </Card>

    {/* ── Getting Started ── */}
    <Card>
      <CardHeader>
        <SectionTitle>Getting Started</SectionTitle>
      </CardHeader>
      <div className="divide-y divide-zinc-100 dark:divide-zinc-600">

        {/* Attunable items */}
        <div className="space-y-4 p-6">
          <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
            Attunable Items
          </h3>
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
            Once an item is configured to be attuneable, it shows how many attunement slots it
            will reserve. If the item has a chance of being attunable (e.g. 40%) that percentage
            is displayed — determined the first time you place it in the Nexus. If attunement is
            required before use, the item cannot deal damage, break blocks, or be used in any
            capacity until attuned.
          </p>
          <div className="flex justify-center">
            <figure className="space-y-2">
              <img
                src={IMG.unattunedSword}
                alt="Unattuned diamond sword tooltip showing 'Attunable (2 slots)'"
                className="rounded-lg border border-zinc-200 dark:border-zinc-600"
              />
              <figcaption className="text-center text-xs text-zinc-400">
                An attunable item before bonding
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Build the nexus */}
        <div className="space-y-4 p-6">
          <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
            Building the Attunement Nexus
          </h3>
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
            The Attunement Nexus is where all attunements are performed. Craft it using the
            default recipe:
          </p>
          <div className="flex justify-center">
            <figure className="space-y-2">
              <img
                src={IMG.nexusRecipe}
                alt="Attunement Nexus crafting recipe"
                className="rounded-lg border border-zinc-200 dark:border-zinc-600"
              />
              <figcaption className="text-center text-xs text-zinc-400">
                Default Attunement Nexus recipe
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Using the nexus */}
        <div className="space-y-4 p-6">
          <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
            Using the Attunement Nexus
          </h3>
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
            Place an attunable item in the center slot to see its details and requirements. If you
            meet all requirements, you can start the attunement process — which will consume any
            required XP levels and items then bond the item to you.
          </p>
          <div className="flex justify-center">
            <img
              src={IMG.nexusUI}
              alt="Attunement Nexus UI showing item requirements and details"
              className="rounded-lg border border-zinc-200 dark:border-zinc-600"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <p className="text-xs font-semibold text-sky-500 dark:text-sky-400">Shown in blue</p>
              <ul className="space-y-1.5">
                {[
                  'Attunement level (or "Not yet attuned")',
                  'Slots reserved by this item',
                  'Your available attunement slots',
                ].map((item) => (
                  <li key={item} className="flex gap-2 text-xs text-zinc-600 dark:text-zinc-300">
                    <span className="mt-0.5 shrink-0 text-sky-400">●</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-semibold text-rose-500 dark:text-rose-400">Shown in red</p>
              <ul className="space-y-1.5">
                {[
                  'XP levels consumed on attunement',
                  'XP threshold required to start',
                  'Items required to attune',
                  'Red icon — hover for details on blockers',
                ].map((item) => (
                  <li key={item} className="flex gap-2 text-xs text-zinc-600 dark:text-zinc-300">
                    <span className="mt-0.5 shrink-0 text-rose-400">●</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Managing attunements */}
        <div className="space-y-4 p-6">
          <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
            Managing Attunements
          </h3>
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
            View and manage all your current attunements from the Manage Attunements screen. Open
            it via the cog wheel in the Attunement Nexus, or press the hotkey (default{' '}
            <kbd className="rounded border border-zinc-300 bg-zinc-100 px-1.5 py-0.5 font-mono text-[11px] dark:border-zinc-500 dark:bg-zinc-600">
              O
            </kbd>
            ).
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <figure className="space-y-2">
              <img
                src={IMG.maxLevelCard}
                alt="Manage attunements screen showing a max-level item"
                className="w-full rounded-lg border border-zinc-200 object-contain dark:border-zinc-600"
              />
              <figcaption className="text-center text-xs text-zinc-400">
                Max level attunement card
              </figcaption>
            </figure>
            <figure className="space-y-2">
              <img
                src={IMG.levelDetails}
                alt="Hover tooltip showing what each attunement level added"
                className="w-full rounded-lg border border-zinc-200 object-contain dark:border-zinc-600"
              />
              <figcaption className="text-center text-xs text-zinc-400">
                Hover the (i) icon to see what each level added
              </figcaption>
            </figure>
          </div>
          <div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 dark:border-rose-900/60 dark:bg-rose-950/20">
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
              <strong className="text-zinc-800 dark:text-zinc-100">Breaking attunements:</strong>{' '}
              Hover an item card and press the red X. This removes all attunement benefits
              (enchantments and modifications from other mods are kept) and returns your slots.
              The item can be attuned to again by anyone.{' '}
              <span className="font-medium text-rose-500">This cannot be reversed.</span>
            </p>
          </div>
        </div>
      </div>
    </Card>

    {/* ── Enhancement System ── */}
    <Card>
      <CardHeader>
        <SectionTitle>Enhancement System</SectionTitle>
      </CardHeader>
      <div className="space-y-6 p-6">
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          Each attunement level grants modifications and attribute bonuses to the item. Benefits
          are cumulative — a level 3 item retains everything granted at levels 1 and 2. Placing an
          attuned item back into the Nexus re-syncs all modifications, so datapack changes take
          effect immediately.
        </p>

        {/* Core modifications */}
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Core Modifications
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              {
                name: 'Invulnerable',
                color: 'sky' as const,
                border: 'border-sky-200 bg-sky-50 dark:border-sky-900/60 dark:bg-sky-950/20',
                label: 'text-sky-500 dark:text-sky-400',
                desc: 'The item cannot be destroyed by environmental effects (lava, cacti, etc.) and will never despawn when dropped.',
              },
              {
                name: 'Unbreakable',
                color: 'violet' as const,
                border:
                  'border-violet-200 bg-violet-50 dark:border-violet-900/60 dark:bg-violet-950/20',
                label: 'text-violet-500 dark:text-violet-400',
                desc: 'If the item has durability, it becomes unbreakable.',
              },
              {
                name: 'Soulbound',
                color: 'amber' as const,
                border:
                  'border-amber-200 bg-amber-50 dark:border-amber-900/60 dark:bg-amber-950/20',
                label: 'text-amber-500 dark:text-amber-400',
                desc: 'When you die, the item travels with you through death and respawns on your body.',
              },
            ].map(({ name, border, label, desc }) => (
              <div key={name} className={`rounded-lg border p-4 space-y-1.5 ${border}`}>
                <p className={`text-sm font-bold ${label}`}>{name}</p>
                <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <Divider />

        {/* Attribute modifications */}
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Attribute Modifications
          </p>
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
            Any attribute — including those added by other mods — can be applied when an attunement
            level is reached. Use the format:
          </p>
          <pre className="overflow-x-auto rounded-lg bg-zinc-900 px-4 py-3 font-mono text-xs">
            <span className="text-emerald-400">attribute</span>
            <span className="text-zinc-400">/</span>
            <span className="text-yellow-300">modid:attribute_name</span>
            <span className="text-zinc-400">/</span>
            <span className="text-rose-400">operation</span>
            <span className="text-zinc-400">/</span>
            <span className="text-violet-400">value</span>
            <span className="text-zinc-400">/</span>
            <span className="text-sky-400">equipmentslot</span>
          </pre>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-600 dark:bg-zinc-600/30">
              <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Operations</p>
              <div className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-300">
                <p>
                  <span className="font-medium text-zinc-800 dark:text-zinc-100">1.20.1:</span>{' '}
                  addition, multiply_base, multiply_total
                </p>
                <p>
                  <span className="font-medium text-zinc-800 dark:text-zinc-100">1.21.1:</span>{' '}
                  add_value, add_multiplied_base, add_multiplied_total
                </p>
              </div>
            </div>
            <div className="space-y-2 rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-600 dark:bg-zinc-600/30">
              <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                Equipment Slots
              </p>
              <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
                mainhand, offhand, hand, feet, legs, chest, head, body, armor, any
              </p>
              <p className="text-xs italic text-zinc-400">
                hand, body, armor, any — 1.21.1+ only
              </p>
            </div>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            <strong className="text-zinc-700 dark:text-zinc-200">Example:</strong>{' '}
            <code className="font-mono">
              attribute/minecraft:generic.attack_damage/add_value/5/mainhand
            </code>{' '}
            — adds 5 attack damage when held in the main hand.
          </p>
        </div>

        <div className="flex justify-center">
          <figure className="space-y-2">
            <img
              src={IMG.level2Tooltip}
              alt="Level 2 attuned diamond sword tooltip"
              className="rounded-lg border border-zinc-200 dark:border-zinc-600"
            />
            <figcaption className="text-center text-xs text-zinc-400">
              A level 2 attuned diamond sword
            </figcaption>
          </figure>
        </div>
      </div>
    </Card>

    {/* ── Restriction System ── */}
    <Card>
      <CardHeader>
        <SectionTitle>Restriction System</SectionTitle>
      </CardHeader>
      <div className="space-y-4 p-6">
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          Items can be configured to require attunement before they can be used at all — no damage,
          no block breaking, no drawing a bow, nothing. This lets modpack makers lock powerful items
          behind meaningful progression gates.
        </p>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          Once attuned, an item shows complete allegiance to its owner. Other players cannot use it
          in any capacity. You can also configure effects that are applied to players who attempt to
          hold an item that doesn't belong to them — slowness, poison, wither, or anything you
          choose.
        </p>
      </div>
    </Card>

    {/* ── Datapack Configuration ── */}
    <Card>
      <CardHeader>
        <SectionTitle>Datapack Configuration</SectionTitle>
      </CardHeader>
      <div className="space-y-6 p-6">
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          Configurations live at{' '}
          <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs dark:bg-zinc-600">
            data/&lt;modid&gt;/artifactory/&lt;item_name&gt;.json
          </code>
          . Use the JSON Builder tool at the bottom of this page to generate files with live
          validation and preview.
        </p>

        {/* Example JSON */}
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Example — diamond_sword.json (1.21.1)
          </p>
          <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4 font-mono text-xs leading-relaxed text-zinc-300">{`{
  "slots_used": 4,
  "use_without_attunement": false,
  "chance": 0.4,
  "replace": true,
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
  ]
}`}</pre>
        </div>

        {/* Field reference */}
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Field Reference
          </p>
          <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-600">
            {[
              {
                field: 'slots_used',
                default: '-1',
                desc: 'Attunement slots reserved when the item is attuned. Omitting or setting -1 disables attunement for this item — use this to remove an existing config from another datapack.',
              },
              {
                field: 'use_without_attunement',
                default: 'true',
                desc: 'Whether the item can be used before attuning. false locks all use — no damage, no block breaking, no item use — until attuned.',
              },
              {
                field: 'chance',
                default: '1.0',
                desc: 'Probability (0.0 – 1.0) that the item can be attuned. Checked once the first time it is placed in the Nexus. If it fails, that item instance can never be attuned.',
              },
              {
                field: 'replace',
                default: 'false',
                desc: 'Override any existing datapack config for this item. Recommended for all modpack configs to ensure yours is used.',
              },
              {
                field: 'apply_to_items',
                default: '[]',
                desc: 'List of item IDs to apply this config to instead of using the filename. Useful for applying the same config to multiple items like a full armor set.',
              },
              {
                field: 'attunement_levels',
                default: 'single level',
                desc: 'Ordered array of level configs. Each has modifications (what the item gains) and optional requirements (XP and items consumed). Defaults to one level granting invulnerable, unbreakable, and soulbound.',
              },
            ].map(({ field, default: def, desc }, i, arr) => (
              <div
                key={field}
                className={`px-4 py-3.5 ${i < arr.length - 1 ? 'border-b border-zinc-100 dark:border-zinc-600' : ''}`}
              >
                <div className="mb-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <code className="font-mono text-xs font-semibold text-sky-600 dark:text-sky-400">
                    {field}
                  </code>
                  <span className="text-xs text-zinc-400">default: {def}</span>
                </div>
                <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Requirements sub-fields */}
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Level Requirements Sub-fields
          </p>
          <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-600">
            {[
              {
                field: 'xpLevelsConsumed',
                desc: 'XP levels consumed when the attunement completes.',
              },
              {
                field: 'xpLevelThreshold',
                desc: 'Minimum XP level required to start attunement. Not consumed.',
              },
              {
                field: 'items',
                desc: 'Up to 3 items consumed on attunement. Format: "modid:item_name" or "modid:item_name#quantity". Quantity defaults to 1.',
              },
            ].map(({ field, desc }, i, arr) => (
              <div
                key={field}
                className={`px-4 py-3.5 ${i < arr.length - 1 ? 'border-b border-zinc-100 dark:border-zinc-600' : ''}`}
              >
                <div className="mb-1.5">
                  <code className="font-mono text-xs font-semibold text-sky-600 dark:text-sky-400">
                    {field}
                  </code>
                </div>
                <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>

    {/* ── Attunement Overrides ── */}
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <SectionTitle>Attunement Overrides</SectionTitle>
          <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold text-zinc-500 dark:bg-zinc-600 dark:text-zinc-300">
            1.21.1+
          </span>
        </div>
      </CardHeader>
      <div className="space-y-4 p-6">
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          Define unique attunement configurations on individual item stacks using the{' '}
          <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs dark:bg-zinc-600">
            artifactory:attunement_override
          </code>{' '}
          data component. Works with <code className="font-mono text-xs">/give</code>,
          advancements, loot tables, KubeJS, and more. This overrides any datapack config for that
          item type, allowing unique one-off items with their own attunement rules.
        </p>
        <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4 font-mono text-xs leading-relaxed text-zinc-300 whitespace-pre-wrap">{`/give @p minecraft:mace[artifactory:attunement_override={
  use_without_attunement: false,
  chance: 0.5,
  slots_used: 5,
  attunement_levels: [{
    requirements: { items: ["minecraft:diamond#64"] },
    modifications: [invulnerable, unbreakable, soulbound]
  }]
}]`}</pre>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          This creates a mace with a 50% chance of being attunable, using 5 slots, requiring 64
          diamonds, and granting all three core modifications on attunement.
        </p>
      </div>
    </Card>

    {/* ── Curios Integration ── */}
    <Card>
      <CardHeader>
        <SectionTitle>Curios Integration</SectionTitle>
      </CardHeader>
      <div className="space-y-4 p-6">
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          With Curios installed, a new <strong className="font-medium text-zinc-800 dark:text-zinc-100">Attuned Item</strong> slot is
          added. Only items you are attuned to can be placed here — use it to store attuned items
          you aren't actively using for quick swapping.{' '}
          <Mod name="Soulbound" color="amber" /> items will stay in this slot on death.
        </p>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          To change the number of Curio slots (default: 1), override{' '}
          <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs dark:bg-zinc-600">
            data/artifactory/curios/slots/attuned_item.json
          </code>{' '}
          in your datapack and set the{' '}
          <code className="font-mono text-xs">size</code> field to your desired value.
        </p>
      </div>
    </Card>

    {/* ── Use Cases ── */}
    <Card>
      <CardHeader>
        <SectionTitle>Use Cases</SectionTitle>
      </CardHeader>
      <div className="divide-y divide-zinc-100 p-6 dark:divide-zinc-600">
        {[
          {
            title: 'Bond with your gear',
            desc: 'Create a satisfying progression system where players grow a bond with their favorite items, gaining entirely customizable benefits as the bond deepens.',
          },
          {
            title: 'Limit overpowered modded items',
            desc: 'Many mods add items that are very powerful but trivialize the game. Use attunement slots to force players to choose — more weaker items or fewer powerful ones. Pairs great with mythic weapons from Simply Swords.',
          },
          {
            title: 'Give lower-tier items new life',
            desc: "Instead of discarding an iron sword for a diamond one, players can attune it and gain special benefits as the bond grows — unbreakable, attack bonuses, soulbound. A well-attuned iron sword can compete with unenchanted higher-tier gear, creating a richer item economy.",
          },
        ].map(({ title, desc }, i, arr) => (
          <div
            key={title}
            className={`flex gap-3 ${i > 0 ? 'pt-4' : ''} ${i < arr.length - 1 ? 'pb-4' : ''}`}
          >
            <span className="mt-1 shrink-0 text-zinc-300 dark:text-zinc-500">◆</span>
            <div>
              <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">{title}</p>
              <p className="mt-1 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                {desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>

    {/* ── FAQ ── */}
    <Card>
      <CardHeader>
        <SectionTitle>FAQ</SectionTitle>
      </CardHeader>
      <div className="divide-y divide-zinc-100 dark:divide-zinc-600">
        {[
          {
            q: 'Will you make this for Fabric?',
            a: 'No, but anyone is welcome to port it. For Forge, only 1.20.1 is supported going forward. New development is on NeoForge 1.21+.',
          },
          {
            q: 'Will you backport to older Minecraft versions?',
            a: 'Unless there is significant interest, development focuses on 1.20.1 and forward only.',
          },
          {
            q: 'Can I use this on my server or modpack?',
            a: 'Of course!',
          },
        ].map(({ q, a }) => (
          <div key={q} className="space-y-1 px-6 py-4">
            <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">{q}</p>
            <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">{a}</p>
          </div>
        ))}
      </div>
    </Card>

  </div>
)
