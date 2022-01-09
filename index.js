function init() {
  getCommits();
}
init();

async function getCommits() {
  let commits = document.querySelector(".li-commit");
  console.log("commit", commits.textContent);

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
}
