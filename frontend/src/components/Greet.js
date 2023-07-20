import React from "react";

function Greet() {
  let greet;
  const time = new Date().getHours();
  if (time < 12) {
    greet = "Morning";
  } else if (time < 15) {
    greet = "Afternoon";
  } else {
    greet = "Evening";
  }
  return <h1 className="text-center no-curor">Hello, Good {greet}!</h1>;
}

export default Greet;
