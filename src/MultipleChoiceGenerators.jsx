//CAUTION: make sure you account for the possibility of duplicates

export const LastVowel = (word) => {
  let broad = ["a", "o", "u", "à", "ò", "ù"];
  let slender = ["e", "i", "è", "ì"];
  let vowels = [].concat(...broad, ...slender);

  const FindLastVowel = (word, num) => {
    const finalvowel = vowels.includes(word[word.length - 1]);

    if (vowels.includes(word[num])) {
      if (word[num] == "e" && num == word.length - 1)
        return FindLastVowel(word, num - 1);

      let broadslend;
      if (broad.includes(word[num])) broadslend = "broad";
      if (slender.includes(word[num])) broadslend = "slender";

      return {
        vowel: word[num],
        index: num,
        type: broadslend,
        finalvowel: finalvowel,
      };
    } else {
      return FindLastVowel(word, num - 1);
    }
  };

  return FindLastVowel(word, word.length - 1);
};

export const Slenderise = (word, index) => {
  const changePrev = Math.floor(Math.random() * 4);
  //change previous letter
  if (changePrev == 1) {
    if (word[index] == "o") {
      let firstHalf = [...word].splice(0, index);
      let secondHalf = [...word].splice(index + 1, word.length);

      return [...firstHalf, "ui", ...secondHalf].join("");
    }
    if (word[index] == "ò") {
      const changeToA = Math.floor(Math.random() * 2);

      let firstHalf = [...word].splice(0, index);
      let secondHalf = [...word].splice(index + 1, word.length);

      if (changeToA == 1) return [...firstHalf, "à", ...secondHalf].join("");
      return [...firstHalf, "ùi", ...secondHalf].join("");
    }
    if (word[index] == "a") {
      let firstHalf = [...word].splice(0, index);
      let secondHalf = [...word].splice(index + 1, word.length);

      return [...firstHalf, "oi", ...secondHalf].join("");
    }
    if (word[index] == "à") {
      let firstHalf = [...word].splice(0, index);
      let secondHalf = [...word].splice(index + 1, word.length);

      return [...firstHalf, "òi", ...secondHalf].join("");
    }
    if (word[index] == "u") {
      let uORao = Math.floor(Math.random() * 2);
      let firstHalf = [...word].splice(0, index);
      let secondHalf = [...word].splice(index + 1, word.length);

      if (uORao == 0) return [...firstHalf, "ui", ...secondHalf].join("");
      if (uORao == 1) return [...firstHalf, "aoi", ...secondHalf].join("");
    } else {
      let firstHalf = [...word].splice(0, index + 1);
      let secondHalf = [...word].splice(index + 1, word.length);

      return [...firstHalf, "i", ...secondHalf].join("");
    }
  }
  //add to previous letter
  if (changePrev == 2) {
    let firstHalf = [...word].splice(0, index + 1);
    let secondHalf = [...word].splice(index + 1, word.length);

    return [...firstHalf, "i", ...secondHalf].join("");
  }
  //no slenderise
  if (changePrev == 3) {
    const ending = Math.floor(Math.random() * 2);
    if (ending == 0) return word;
    if (ending == 1) return word + "a";
  }
  //replace previous letter
  else {
    let firstHalf = [...word].splice(0, index);
    let secondHalf = [...word].splice(index + 1, word.length);

    return [...firstHalf, "i", ...secondHalf].join("");
  }
};

const GenerateNums = (Options) => {
  let num1 = Math.floor(Math.random() * Options.length);
  let num2;
  let num3;

  const newNum = () => {
    let temp = Math.floor(Math.random() * Options.length);
    if (temp == num1) {
      newNum();
    } else {
      num2 = temp;
    }
  };

  const newNum2 = () => {
    let temp = Math.floor(Math.random() * Options.length);
    if (temp == num1 || temp == num2) {
      newNum2();
    } else {
      num3 = temp;
    }
  };
  newNum();
  newNum2();

  return [num1, num2, num3];
};

export const ArticleMultiple = (word) => {
  const articles = [
    { article: "an ", lenite: false },
    { article: "an ", lenite: true },
    { article: "am ", lenite: false },
    { article: "a' ", lenite: true },
    { article: "a' ", lenite: false },
    { article: "an t-", lenite: false },
  ];

  const Lenite = (article) => {
    let leniteables = ["b", "c", "d", "f", "g", "m", "p", "s", "t"];
    if (leniteables.includes(word[0])) {
      let lenited = article + word[0] + "h" + word.substring(1);
      return lenited;
    } else {
      return article + word;
    }
  };

  let LenitedOptions = [
    articles
      .filter((article) => article.lenite)
      .map((a) => Lenite(a.article, word)),
  ];

  let UnlenitedOptions = [
    articles.filter((article) => !article.lenite).map((a) => a.article + word),
  ];

  let Options = [...new Set([].concat(...LenitedOptions, ...UnlenitedOptions))];

  let Nums = GenerateNums(Options);
  return [Options[Nums[0]], Options[Nums[1]], Options[Nums[2]]];
};

export const GenitiveMultiple = (word) => {
  const GenerateGenitiveOption = (word) => {
    const mutations = [
      { end: "a", slenderise: false },
      { end: "e", slenderise: true },
      { end: "", slenderise: false },
      { end: "", slenderise: true },
    ];

    const { vowel, index, type, finalvowel } = LastVowel(word, word.length);

    if (type == "broad") {
      if (finalvowel) {
        const ending = Math.floor(Math.random() * 3);
        if (ending == 0) return Slenderise(word, index) + "n";
        else return Slenderise(word, index);
      }

      if (!finalvowel) {
        const newWord = Slenderise(word, index);

        if (
          !LastVowel(newWord).lastvowel &&
          LastVowel(newWord).type == "slender"
        ) {
          const addE = Math.floor(Math.random() * 3);

          if (addE == 0) return newWord + "e";
          else return newWord;
        } else return newWord;
      }

      if (word[index - 1] == "e") {
        const replaceE = Math.floor(Math.random() * 3);

        let firstHalf = [...word].splice(0, index - 1);
        let secondHalf = [...word].splice(index + 1, word.length);

        if (replaceE == 1) return [...firstHalf, "i", ...secondHalf].join("");
        else return [...firstHalf, "ei", ...secondHalf].join("");
      } else return Slenderise(word, index);
    } else {
      const ending = Math.floor(Math.random() * 2);
      if (ending == 0 || finalvowel) return word;
      if (ending == 1) return word + "e";
    }
  };

  let Option1 = GenerateGenitiveOption(word)

  let Option2 = GenerateGenitiveOption(word)
  if (Option1 == Option2) Option2 = GenerateGenitiveOption(word)

  let Option3 = GenerateGenitiveOption(word)
  if (Option1 == Option3 || Option2 == Option3) Option3 = GenerateGenitiveOption(word)


  return([Option1, Option2, Option3])

};

export const PluralMultiple = (word) => {

    const GeneratePluralOption = (word) => {
  const broadEndings = ["an", "aichean", "annan"];
  const slenderEndings = ["ean", "ichean", "eannan"];
  const vowelEndingsBroad = ["n", "nnan", "naichean", "ichean", ""];
  const vowelEndingsSlender = ["an", "annan", "achan", "chean", ""];

  const { vowel, index, type, finalvowel } = LastVowel(word, word.length);

  const slenderise = Math.floor(Math.random() * 2);

  let newWord = word;

  if (LastVowel(word).finalvowel) {
    if (LastVowel(newWord).type == "slender") {
      return (
        newWord +
        vowelEndingsSlender[
          Math.floor(Math.random() * vowelEndingsSlender.length)
        ]
      );
    } else {
      if (Math.floor(Math.random() * 2) == 1) {
        return (
          newWord +
          vowelEndingsBroad[
            Math.floor(Math.random() * vowelEndingsBroad.length)
          ]
        );
      }
    }
  }

  if (slenderise == 1 && !LastVowel(word).finalvowel) {
    newWord = Slenderise(word, index);
  }

  const ending = Math.floor(Math.random() * 3);

  if (ending == 0) {
    return newWord;
  } else {
    if (LastVowel(newWord).finalvowel) {
      if (LastVowel(newWord).type == "slender") {
        return (
          newWord +
          vowelEndingsSlender[
            Math.floor(Math.random() * vowelEndingsSlender.length)
          ]
        );
      } else {
        return (
          newWord +
          vowelEndingsBroad[
            Math.floor(Math.random() * vowelEndingsBroad.length)
          ]
        );
      }
    }

    if (LastVowel(newWord).type == "slender") {
      return newWord + slenderEndings[Math.floor(Math.random() * 3)];
    } else {
      return newWord + broadEndings[Math.floor(Math.random() * 3)];
    }
  }
    }

  let Option1 = GeneratePluralOption(word)

  let Option2 = GeneratePluralOption(word)
  if (Option1 == Option2) Option2 = GeneratePluralOption(word)

  let Option3 = GeneratePluralOption(word)
  if (Option1 == Option3 || Option2 == Option3) Option3 = GeneratePluralOption(word)


  return([Option1, Option2, Option3])
};


//CAUTION: make sure you account for the possibility of duplicates