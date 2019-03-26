const Games = [
  {
    local: {
      name: "NY Yankees",
      quotes: 20,
      position: 1
    },
    visit: {
      name: "Red Sox",
      quotes: -20,
      position: 2
    },
    time: "5 FEB 11:00 pm",
    league: "MLB",
    sport: "Baseball",
    image: "https://cdn1.iconfinder.com/data/icons/hawcons/32/700389-icon-2-baseball-512.png",
    traded: 7569,
    matches: 7,
    unmatched: 12,
    topBet: 590,
  },
  {
    local: {
      name: "Barcelona",
      quotes: {1: 30, 2: 39},
      position: 3
    },
    visit: {
      name: "Real Madrid",
      quotes: {1: 15, 3: -39},
      position: 2
    },
    draw: {
      name: "Draw",
      quotes: {2: -15, 3: -30},
      position: 1
    },
    time: "5 FEB 9:00 pm",
    league: "La liga",
    sport: "Soccer",
    image: "https://icons-for-free.com/free-icons/png/512/315754.png",
    traded: 51600,
    matches: 15,
    unmatched: 20,
    topBet: 7000,
  },
  {
    local: {
      name: "Liverpool",
      quotes: {1: 13, 2: 19},
      position: 3
    },
    visit: {
      name: "Porto",
      quotes: {1: 10, 3: -13},
      position: 2
    },
    draw: {
      name: "Draw",
      quotes: {2: -10, 3: -13},
      position: 1
    },
    time: "6 FEB 6:00 pm",
    league: "Champions League",
    sport: "Soccer",
    image: "https://icons-for-free.com/free-icons/png/512/315754.png",
    traded: 2345,
    matches: 2,
    unmatched: 5,
    topBet: 230,
  },
  {
    local: {
      name: "Juventus",
      quotes: {1: 13, 2: 19},
      position: 3
    },
    visit: {
      name: "Ajax",
      quotes: {1: 10, 3: -13},
      position: 2
    },
    draw: {
      name: "Draw",
      quotes: {2: -10, 3: -13},
      position: 1
    },
    time: "6 FEB 6:00 pm",
    league: "Champions League",
    sport: "Soccer",
    image: "https://icons-for-free.com/free-icons/png/512/315754.png",
    traded: 2345,
    matches: 2,
    unmatched: 5,
    topBet: 230,
  },
  // {
  //   local: "Valencia",
  //   visit: "Sevilla",
  //   time: "5 FEB 9:00pm",
  //   league: "La liga",
  //   sport: "Soccer",
  //   image: "https://icons-for-free.com/free-icons/png/512/315754.png",
  //   traded: 2800,
  //   matches: 12,
  //   unmatched: 45,
  //   topBet: 121,
  // },
  {
    local: {
      name: "Patriots",
      quotes: 40,
      position: 2
    },
    visit:{
      name: "Steelers",
      quotes: -40,
      position: 1
    },
    time: "7 FEB 10:00 am",
    league: "NFL",
    sport: "Football",
    image: "https://cdn2.iconfinder.com/data/icons/university-set-4/512/10-512.png",
    traded: 2450,
    matches: 55,
    unmatched: 12,
    topBet: 633,
  },
   {
    local: {
      name: "Lakers",
      quotes: 40,
      position: 2
    },
    visit:{
      name: "Cavaliers",
      quotes: -40,
      position: 1
    },
    time: "7 FEB 10:00 am",
    league: "NBA",
    sport: "Basketball",
    image: "https://cdn1.iconfinder.com/data/icons/hawcons/32/700378-icon-1-basketball-512.png",
    traded: 2450,
    matches: 55,
    unmatched: 12,
    topBet: 633,
  },
  // {
  //   local: "Boca Juniors",
  //   visit: "River Plate",
  //   time: "5 FEB 9:00pm",
  //   league: "Copa Libertadores",
  //   sport: "Soccer",
  //   image: "https://icons-for-free.com/free-icons/png/512/315754.png",
  //   traded: 8573,
  //   matches: 157,
  //   unmatched: 123,
  //   topBet: 1233,
  // },
  // {
  //   local: "America",
  //   visit: "Chivas",
  //   time: "5 FEB 9:00pm",
  //   league: "Liga MX",
  //   sport: "Soccer",
  //   image: "https://icons-for-free.com/free-icons/png/512/315754.png",
  //   traded: 569,
  //   matches: 6,
  //   unmatched: 23,
  //   topBet: 233,
  // }
]

module.exports = Games;
