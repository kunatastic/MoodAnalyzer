function main(allFace, allText) {
  // Init final dataStructure
  const final = {
    sentimentScore: 0,
    verdict: "",
    sentiments: {
      angry: 0,
      disgusted: 0,
      fearful: 0,
      happy: 0,
      neutral: 0,
      sad: 0,
      surprised: 0,
    },
  };

  // add all the face data
  for (var i = 0; i < allFace.length; i++) {
    const count = allFace[i].count;
    final.sentiments.angry += allFace[i].expression.angry / count;
    final.sentiments.disgusted += allFace[i].expression.disgusted / count;
    final.sentiments.fearful += allFace[i].expression.fearful / count;
    final.sentiments.happy += allFace[i].expression.happy / count;
    final.sentiments.neutral += allFace[i].expression.neutral / count;
    final.sentiments.sad += allFace[i].expression.sad / count;
    final.sentiments.surprised += allFace[i].expression.surprised / count;
  }
  // add all the text data
  for (var i = 0; i < allText.length; i++) {
    final.sentiments.happy +=
      (0.77 / (0.77 + 0.66)) * allText[i].AWS.SentimentScore.Positive;
    final.sentiments.surprised +=
      (0.66 / (0.77 + 0.66)) * allText[i].AWS.SentimentScore.Positive;
    final.sentiments.neutral += allText[i].AWS.SentimentScore.Neutral;
    final.sentiments.disgusted +=
      (0.44 / (0.44 + 0.33 + 0.22 + 0.11)) *
      allText[i].AWS.SentimentScore.Negative;
    final.sentiments.fearful +=
      (0.33 / (0.44 + 0.33 + 0.22 + 0.11)) *
      allText[i].AWS.SentimentScore.Negative;
    final.sentiments.angry +=
      (0.22 / (0.44 + 0.33 + 0.22 + 0.11)) *
      allText[i].AWS.SentimentScore.Negative;
    final.sentiments.sad +=
      (0.11 / (0.44 + 0.33 + 0.22 + 0.11)) *
      allText[i].AWS.SentimentScore.Negative;
  }

  final.sentimentScore =
    0.77 * final.sentiments.happy +
    0.66 * final.sentiments.surprised +
    0.55 * final.sentiments.neutral +
    0.44 * final.sentiments.disgusted +
    0.33 * final.sentiments.fearful +
    0.22 * final.sentiments.angry +
    0.11 * final.sentiments.sad;

  if (final.sentimentScore < 0.605) final.verdict = "NEGATIVE";
  else if (final.sentimentScore >= 0.605 && final.sentimentScore < 0.715)
    final.verdict = "NEUTRAL";
  else final.verdict = "POSITIVE";
  console.log(final);
  return final;
}

module.exports = { main };
