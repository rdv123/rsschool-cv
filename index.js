function init() {
  getCommits();
  getCompleted();
}
init();

async function getCommits() {
  let commits = document.querySelector(".li-commit");
  console.log("commit", commits.textContent);
  let repositories = document.querySelector(".li-repos");

  console.log("test");
  const data = await fetch(`https://api.github.com/users/rdv123/repos`);

  let dataParse = await data.json();
  console.log("repo", dataParse.length);

  const links = dataParse.map(
    (rep) => `https://api.github.com/repos/rdv123/${rep.name}/contributors`
  );

  const request = links.map((link) => fetch(link));

  const resJson = await Promise.all(request);

  const res = await Promise.all(resJson.map((res) => res.json()));

  const surilizeRes = res.flat(1);

  count = surilizeRes.reduce((acc, item) => {
    return (acc += item.contributions);
  }, 0);
  console.log("count", count);
  commits.textContent = `Commits on GitHub - ${count}`;
  repositories.textContent = `Repositories on GitHub - ${dataParse.length}`;
}

async function getCompleted() {
  let completed = document.querySelector(".li-kata");
  let liHonor = document.querySelector(".li-honor");
  const dataKata = await fetch(`https://www.codewars.com/api/v1/users/rdv123/`);
  let dataKataParse = await dataKata.json();
  console.log("kata", dataKataParse.codeChallenges.totalCompleted);
  console.log("honor", dataKataParse.honor);
  let completedKata = dataKataParse.codeChallenges.totalCompleted;
  let honor = dataKataParse.honor;
  completed.textContent = `Completed katas on Codewars - ${completedKata}`;
  liHonor.textContent = `Honor on Codewars - ${honor}`;
}
