// Load google charts
google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);

// Draw the chart and set the chart values
async function drawChart() {
  const raw = await fetch("/analysis/raw");
  const sentiments = await raw.json();
  console.log(sentiments);
  var data = google.visualization.arrayToDataTable([
    ["Task", "Percentage"],
    ["Angry", sentiments.data.sentiments.angry],
    ["Disgusted", sentiments.data.sentiments.disgusted],
    ["Fearful", sentiments.data.sentiments.fearful],
    ["Happy", sentiments.data.sentiments.happy],
    ["Neutral", sentiments.data.sentiments.neutral],
    ["Sad", sentiments.data.sentiments.sad],
    ["Surprised", sentiments.data.sentiments.surprised],
  ]);

  // Optional; add a title and set the width and height of the chart
  var options = { title: "Your Emotions", width: 550, height: 400 };

  // Display the chart inside the <div> element with id="piechart"
  var chart = new google.visualization.PieChart(
    document.getElementById("piechart")
  );
  chart.draw(data, options);
}
