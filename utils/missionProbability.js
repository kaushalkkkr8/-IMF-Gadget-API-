 function generateMissionProbability() {
    return `${Math.floor(Math.random() * 41) + 60}% success probability`; 
  };

  export default generateMissionProbability
  