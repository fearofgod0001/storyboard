import { useState } from "react";

const Numbering = () => {
  const consonantArray = [
    "\u3131", // 'ㄱ'
    "\u3134", // 'ㄴ'
    "\u3137", // 'ㄷ'
    "\u3139", // 'ㄹ'
    "\u3141", // 'ㅁ'
    "\u3142", // 'ㅂ'
    "\u3145", // 'ㅅ'
    "\u3147", // 'ㅇ'
    "\u3148", // 'ㅈ'
    "\u314A", // 'ㅊ'
    "\u314B", // 'ㅋ'
    "\u314C", // 'ㅌ'
    "\u314D", // 'ㅍ'
    "\u314E", // 'ㅎ'
  ];
  const gather = [
    "\u314F", // 'ㅏ'
    "\u3153", // 'ㅓ'
    "\u3157", // 'ㅗ'
    "\u315C", // 'ㅜ'
    "\u3163", // 'ㅡ'
    "\u3161", // 'ㅣ'
  ];

  const generateKoreanNumbering = () => {
    const character = String.fromCharCode(parseInt("\u3131"));
    console.log("character ===>", character);
  };

  return (
    <div>
      <button onClick={generateKoreanNumbering}> 증가</button>
    </div>
  );
};

export default Numbering;
