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

  function generateKoreanNumbering(count) {
    const baseCode = 44032; // '가'의 유니코드 값
    const result = [];

    for (let i = 0; i < 16; i++) {
      const leadingConsonantIndex = (i % 28) + 1; // 초성 인덱스 계산
      const vowelIndex = ((i / 28) % 21) + 1; // 중성 인덱스 계산
      const trailingConsonantIndex = i / 28 / 21 + 1; // 종성 인덱스 계산

      const leadingConsonantCode = baseCode + leadingConsonantIndex * 21 * 28; // 초성 코드 계산
      const vowelCode = baseCode + vowelIndex * 28; // 중성 코드 계산
      const trailingConsonantCode = baseCode + trailingConsonantIndex; // 종성 코드 계산

      const koreanNumber = String.fromCharCode(
        leadingConsonantCode,
        vowelCode,
        trailingConsonantCode
      );
      result.push(koreanNumber);
    }
    console.debug(result);
    return result;
  }

  return (
    <div>
      <button onClick={generateKoreanNumbering}> 증가</button>
    </div>
  );
};

export default Numbering;
