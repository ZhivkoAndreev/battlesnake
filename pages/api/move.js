export default function handler(req, res) {
  res.setHeader("Content-Type", "application/json");

  const gameState = req.body;

  if (req.method !== "POST") {
    res.status(404).json({ message: "Only for POST" });
    return;
  }

  if (!gameState) {
    res.status(400).json({ message: "Missing gamestate" });
    return;
  }

  let isMoveSafe = {
    up: true,
    down: true,
    left: true,
    right: true,
  };

  // We've included code to prevent your Battlesnake from moving backwards
  const myHead = gameState.you.body[0];
  const myNeck = gameState.you.body[1];

  if (myNeck.x < myHead.x) {
    // Neck is left of head, don't move left
    isMoveSafe.left = false;
  } else if (myNeck.x > myHead.x) {
    // Neck is right of head, don't move right
    isMoveSafe.right = false;
  } else if (myNeck.y < myHead.y) {
    // Neck is below head, don't move down
    isMoveSafe.down = false;
  } else if (myNeck.y > myHead.y) {
    // Neck is above head, don't move up
    isMoveSafe.up = false;
  }

  // TODO: Step 1 - Prevent your Battlesnake from moving out of bounds
  const boardWidth = gameState.board.width;
  const boardHeight = gameState.board.height;

  if (myHead.y === 0) {
    isMoveSafe.down = false
  }
  if (myHead.x === 0) {
    isMoveSafe.left = false
  }
  if (myHead.y === boardHeight - 1) {
    isMoveSafe.up = false
  }
  if (myHead.x === boardWidth - 1) {
    isMoveSafe.right = false
  }

  // TODO: Step 2 - Prevent your Battlesnake from colliding with itself
   const myBody = gameState.you.body;

   myBody.map((body)=>{
    if (myHead.x === body.x - 1 && myHead.y === body.y) {
      return isMoveSafe.right = false
    }
    if (myHead.x === body.x + 1 && myHead.y === body.y) {
      return isMoveSafe.left = false
    }
    if (myHead.y === body.y - 1 && myHead.x === body.x) {
      return isMoveSafe.up = false
    }
    if (myHead.y === body.y + 1 && myHead.x === body.x) {
      return isMoveSafe.down = false
    }
   })

  // TODO: Step 3 - Prevent your Battlesnake from colliding with other Battlesnakes
  const opponents = gameState.board.snakes;

  opponents.map((snakes)=>{
      return snakes.body.map((body) => {    
        if (myHead.x === body.x - 1 && myHead.y === body.y) {
          return isMoveSafe.right = false
        }
        if (myHead.x === body.x + 1 && myHead.y === body.y) {
          return isMoveSafe.left = false
        }
        if (myHead.y === body.y - 1 && myHead.x === body.x) {
          return isMoveSafe.up = false
        }
        if (myHead.y === body.y + 1 && myHead.x === body.x) {
          return isMoveSafe.down = false
        }
      })
   })

  // Are there any safe moves left?
  const safeMoves = Object.keys(isMoveSafe).filter((key) => isMoveSafe[key]);
  if (safeMoves.length == 0) {
    console.log(`MOVE ${gameState.turn}: No safe moves detected! Moving down`);
    res.status(200).json({ move: "down" });
    return;
  }

  // Choose a random move from the safe moves
  const nextMove = safeMoves[Math.floor(Math.random() * safeMoves.length)];

  // TODO: Step 4 - Move towards food instead of random, to regain health and survive longer
  // food = gameState.board.food;

  console.log(`MOVE ${gameState.turn}: ${nextMove}`);

  res.status(200).json({ move: nextMove });
}
