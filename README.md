# anime-unrelated

An HTML, CSS, and JavaScript app for creatively displaying quotes from various
anime.

## Description

I was inspired to build Anime Unrelated by the many humorous internet images in
which the image and the context or caption are unrelated but the juxtaposition
adds quality. With this app, you can get similar humorous outcomes and, on
occasion, get some surprisingly powerful pairings of image and text.

### Live Deployment

https://easton-morris.github.io/anime-unrelated/

### Tech Stack

1. JavaScript
2. HTML
3. CSS
4. Node.js
5. Anime Quote Web API (https://animechan.vercel.app/)
6. Unsplash Picture API (https://picsum.photos/images)

**Note**: Both APIs have rate limits that affect the performance of the app.
_(100/hour for quotes, 5000 calls total/hour for images)_

### Features

1. Generate a pairing of: a random Quote from a random Anime with a random Image
2. Generate a pairing of: a random Quote from a selected Anime with a random Image
3. Keep the generated Quote and receive a new backing Image
4. Keep the generated Image and receive a new Quote (random or selected)

### App In Action

Randomize
![Randomize](images\Example1.gif)

Keep Image
![Keep Image](images\Example2.gif)

Keep Quote
![Keep Quote](images\Example3.gif)

### Stretch Features

1. Ability to enter your own quote
2. Ability to upload your own image
3. Categories for Images and Quotes

## Getting Started

1. Clone the repository.

```shell
git clone https://github.com/easton-morris/anime-unrelated.git
cd anime-unrelated
```

2. Open index.html in your preferred browser.
