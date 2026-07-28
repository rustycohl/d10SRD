# d10SRD

The audience-facing rules commons and independent executable reference for the
Ground Zero Games Base-10 line.

The current alpha carries the controlling conversion:

```text
d10 + ability modifier + skill ranks + situational modifier >= difficulty
```

- d20 difficulty converts with `ceiling(DC / 2)`.
- Check-facing modifiers scale to the published d10 table.
- Natural 10 and natural 1 are threats; a second d10 confirms on 6+.
- Skill ranks use 0–10.
- The tactical bridge has one 10 AP authority; cards modify costs, never the
  pool itself.

The public Page combines a readable rules reference, interactive check
resolver, and the port’s executable conformance test.

## First public release

The initial audience-facing set is:

1. `BattleStarSol` — themed clean-tab launch page;
2. `X-Command` — standalone tactical-generator product demo; and
3. `d10SRD` — this rules reference.

The remaining independent Pages stay live for development and backend testing.

## Run

```text
npm test
```

Serve `site/` with any static server.

## License

The current original rules document and documentation are CC BY 4.0. The
reference implementation is available under MIT or Apache-2.0. Earlier d10 SRD
material already released under CC0 remains CC0; nothing here withdraws it.
