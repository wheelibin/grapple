export default [
  {
    id: 1,
    name: "Single-leg takedown",
    type: "takedown",
    counters: [5],
    nextSteps: [6],
    notes: "Keep your head tucked to avoid the Guillotine"
  },
  {
    id: 2,
    name: "Double-leg takedown",
    variation: "",
    type: "takedown",
    counters: [4],
    nextSteps: [7, 8]
  },
  {
    id: 3,
    name: "Double-leg takedown",
    variation: "Corner Cut",
    type: "takedown",
    counters: [4],
    nextSteps: [7, 8]
  },
  {
    id: 4,
    name: "Sprawl",
    type: "movement",
    counters: [3],
    nextSteps: [5]
  },
  {
    id: 5,
    name: "Guillotine",
    type: "submission",
    counters: [],
    nextSteps: []
  },
  {
    id: 6,
    name: "Knee on belly",
    type: "position",
    counters: [],
    nextSteps: []
  },
  {
    id: 7,
    name: "Mount",
    type: "position",
    counters: [],
    nextSteps: []
  },
  {
    id: 8,
    name: "Side Control",
    type: "position",
    counters: [],
    nextSteps: []
  }
];
