[![make.fun](https://make.fun/badge/u-boothlord-unsent-the-micro-confession-sprint-8c6596ba.svg)](https://make.fun/bounty/u-boothlord-unsent-the-micro-confession-sprint-8c6596ba)
[![rank](https://make.fun/badge/u-boothlord-unsent-the-micro-confession-sprint-8c6596ba/teguharifiant/makefun-unsent-confession/rank.svg)](https://make.fun/bounty/u-boothlord-unsent-the-micro-confession-sprint-8c6596ba)
[![reward](https://make.fun/badge/u-boothlord-unsent-the-micro-confession-sprint-8c6596ba/teguharifiant/makefun-unsent-confession/reward.svg)](https://make.fun/bounty/u-boothlord-unsent-the-micro-confession-sprint-8c6596ba)

# Unsent: The Micro-Confession Sprint

An entry for the [Unsent: The Micro-Confession Sprint](https://make.fun/bounty/u-boothlord-unsent-the-micro-confession-sprint-8c6596ba) bounty on make.fun.

## The entry

A two-part micro-confession: a `To:` line naming who the message was
meant for, and the unsent message itself, exactly as it was typed. It is
the message someone wrote, read twice, and never sent — too afraid of
what it would do to the person on the other end.

> To: Mum
>
> I sold the piano you saved three years to buy me so I could pay rent, and every time you ask how it's doing I say it's fine.

## How it runs

`main.ts` (Node 22, standard library only) validates the entry against
the bounty gate — 1 to 260 characters in total, message one line of at
most 200 characters, printable ASCII, no trailing newline — and writes
it to `entry.txt` in the output directory.

```sh
node main.ts
# or: MAKEFUN_OUTPUT_DIR=/tmp/out node main.ts
```

Running it twice to two different output directories produces
byte-identical `entry.txt` files.

## License

MIT — see [LICENSE](LICENSE).
