// Main Variables
let theInput = document.querySelector(".get-repos input");
let getButton = document.querySelector(".get-repos .get-button");
let reposData = document.querySelector(".show-data");

getButton.addEventListener("click", function () {
  getRepos();
});

// Get Repos Fucntion
function getRepos() {
  if (theInput.value == "") {
    reposData.innerHTML = `<span>Please Enter GitHub Username.. </span>`;
  } else {
    fetch(`https://api.github.com/users/${theInput.value}/repos`)
      .then((res) => res.json())
      .then((repos) => {
        // Empty The Container
        reposData.innerHTML = "";
        // Create Repos Number
        let nums = document.createElement("span");
        // Create Repos Number Label
        let numLabel = document.createTextNode(
          `Total Numbers Of Repos = ${repos.length}`
        );
        // Append Repos Number Label to Repos number
        nums.appendChild(numLabel);
        // Add class to the nums
        nums.className = "number";
        // Append nums to the container
        reposData.appendChild(nums);
        // Loop On Repos
        repos.forEach((repo) => {
          // Create the main div
          let mainDiv = document.createElement("div");
          // Create repoName
          let repoName = document.createTextNode(repo.name);
          // Append divtext to the main div
          mainDiv.appendChild(repoName);
          // Create the repo URL
          let theURL = document.createElement("a");
          // Create the repo URL Text
          let theURLText = document.createTextNode("Visit");
          // Append the repo URL text to the url
          theURL.appendChild(theURLText);
          // Add the href tho the url
          theURL.href = `http://github.com/${theInput.value}/${repo.name}`;
          // Set Attribute to open in new window
          theURL.setAttribute("target", "_blank");
          // Append the url to the main div
          mainDiv.appendChild(theURL);
          // Create Stars Span
          let starsSpan = document.createElement("span");
          // Create the stars span text
          let starsSpanText = document.createTextNode(
            `Stars ${repo.stargazers_count} ⭐`
          );
          // Append the stars span text to star span
          starsSpan.appendChild(starsSpanText);
          //Append the stars span to main div
          mainDiv.appendChild(starsSpan);
          // Add class to the main div
          mainDiv.className = "repo-box";
          // Append main div to the container
          reposData.appendChild(mainDiv);
        });
      }).catch(() => {
        reposData.innerHTML = `<span>Can't Find This Username..</span>`;
      });
  }
}
