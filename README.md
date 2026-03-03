# Plain English Game

This is a boilerplate react app to publish [a react
game](https://ianabc.github.io/LHPlainEnglish) associated with a presentation on
Plain English by LH. The idea is the app will show you a page with a sentence
containing a redundant word. You can click each word, and you'll get feedback on
your guesses. To run it locally,
```shell
$ npm run dev
```

To add more examples to the game edit `src/data/examples.ts` using the following
format
```ts
  {
    id: 3,
    sentence: "In my own personal opinion, this is unnecessary.",
    redundantWord: "own",
    explanation:
      "An opinion is already personal, so 'own' does not add any new meaning."
  }
```

The easiest way to do this is probably to make a CSV with the `sentence`,
`redundantWord` and `explaination` as columns, then use a script to turn that
into typescript/json as above. Once you are ready

```shell
$ npm run gh-pages
```
