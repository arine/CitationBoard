# CitationBoard

CitationBoard is a fun interior design for every lab.
With lab member's Google Scholar profile or [Dimension](https://app.dimensions.ai) profile link,
you can display a scoreboard sorted by total citation.
Also, celabrate the citation increment with nice sound-effect and beautiful confetti!

## Installation and Configuration

1. Clone the repository
```
git clone https://github.com/arine/CitationBoard.git
```

2. Create `members.json` at root directory in following format:
```
[
  {
    "id": Unique number,
    "name": "Member's name to display",
    "url": "URL to Google Scholar profile (https://scholar.google.com/citations?user=.....) or Dimension profile (https://app.dimensions.ai/discover/publication?and_facet_researcher=.......)"
  },
  ...
]
```

3. Create `src/config.ts` in following format:
```
export const IMG_URL = {
    MEMBER_ID: 'URL or path to the member profile image',
    MEMBER_ID_2: 'URL or path to the member profile image',
    ...
};
```

4. Put lab logo or any image to `src/assets/logo.png`. It will be displayed on the top of the board.

5. If you are hosting the board other than `localhost`, please modify `src/environment/environment.ts` or `src/environment/environment.prod.ts`
```
...
socket: {
  url: 'YOUR_HOST:8888',
...
```

6. (Optional) If you want to change the duration of citation check, please modify `config/index.js`. The default is 60 minutes.
```
...
    updateInterval: DURATION_IN_MILLISECONDS
...
```

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Run

Run `node app.js` to serve the board. It is accesible through `localhost:8888` in default.

