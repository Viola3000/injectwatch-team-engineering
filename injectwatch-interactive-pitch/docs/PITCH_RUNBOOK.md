# InjectWatch pitch runbook

## 5–7 minute order

| Chapter | Route | Target |
|---|---|---:|
| Opening | `#/pitch/01-opening` | 25 sec |
| Decision gap | `#/pitch/02-decision-gap` | 40 sec |
| Water injection | `#/pitch/03-water-injection` | 45 sec |
| System loop | `#/pitch/04-system-loop` | 50 sec |
| Scenario hand-off | `#/pitch/05-scenario` | 25 sec |
| Synthetic response loop | `#/demo/console` onward | 90–150 sec |
| Build target | `#/pitch/06-build` | 45 sec |
| Roles | `#/pitch/07-roles` | 35 sec |
| Join | `#/pitch/08-join` | 20 sec |

## Keyboard controls

- `ArrowRight`, `PageDown`, or `Space`: next pitch chapter
- `ArrowLeft` or `PageUp`: previous pitch chapter
- `Esc`: return to Explore mode
- `P`: toggle presenter cues

Presenter cues are hidden by default.

## Exact live click path

1. Select **Start guided pitch**.
2. Advance through Chapter 05.
3. Select **Enter the synthetic console**.
4. On `SYN-EV-1042`, select **Review evidence**.
5. Select **Approve inspection task**.
6. In the drawer, select **Approve & assign**.
7. Select **Open field view in this browser**.
8. Select **Start inspection**.
9. Review the prefilled synthetic observations and select **Submit for technical review**.
10. Select **Open technical review**.
11. Select **Authorise bounded scenario action**.
12. Select **Begin recovery verification**.
13. Select **Verify outcome & close event**.
14. Select **Continue to what we build together**.
15. Complete Chapters 06–08.

Do not demonstrate the field route on a second device as a continuation. A
direct phone visit is an independent, pre-seeded synthetic replay and is not
synchronised with the desktop session.

## Reset

Select **Reset demo** in the simulation header. This restores the queue and
clears browser-local feedback. A normal reload also resets the ordinary session
to the route-appropriate deterministic seed.

## Fallback order

1. local interactive site;
2. a pre-recorded screen capture created later;
3. static screenshots created later.

No video, QR code, or fake screenshot is bundled in this build.

